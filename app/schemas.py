from pydantic import BaseModel

# Request model for the RPN calculation
class OperationCreate(BaseModel):
    expression: str

# Response model including the operation result
class OperationResponse(BaseModel):
    id: int
    expression: str
    result: float

    class Config:
        orm_mode = True
