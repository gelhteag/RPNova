import csv
import io
from fastapi import APIRouter, Depends, HTTPException, Response
from sqlalchemy.orm import Session
from app import models, schemas, utils
from app.database import SessionLocal, engine
from app.imap_listener import process_imap_emails

from fastapi.responses import StreamingResponse

# Create all tables (if they don't exist)
models.Base.metadata.create_all(bind=engine)

router = APIRouter()

# Dependency to get a DB session for each request.
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/calculate", response_model=schemas.OperationResponse)
def calculate_operation(operation: schemas.OperationCreate, db: Session = Depends(get_db)):
    """
    API endpoint to evaluate an RPN expression.
    It computes the result, saves the operation in the database, and returns the result.
    """
    try:
        result = utils.evaluate_rpn(operation.expression)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error in expression: {str(e)}")
    
    # Save the operation in the database.
    db_operation = models.Operation(expression=operation.expression, result=result)
    db.add(db_operation)
    db.commit()
    db.refresh(db_operation)
    
    return db_operation

@router.get("/export-csv")
def export_operations_csv(db: Session = Depends(get_db)):
    """
    API endpoint to export all operations to a CSV file.
    """
    operations = db.query(models.Operation).all()
    
    # Create a CSV in memory.
    stream = io.StringIO()
    writer = csv.writer(stream)
    writer.writerow(["id", "expression", "result"])
    for op in operations:
        writer.writerow([op.id, op.expression, op.result])
    response = StreamingResponse(iter([stream.getvalue()]),
                                 media_type="text/csv")
    response.headers["Content-Disposition"] = "attachment; filename=operations.csv"
    return response


@router.get("/check-email")
def trigger_imap():
    """
    Manually trigger IMAP email checking and return processed results.
    """
    results = process_imap_emails()
    return {
        "status": f"{len(results)} email(s) processed",
        "data": results
    }
