from sqlalchemy import Column, Integer, String, Float
from app.database import Base

# SQLAlchemy model for storing operations and results.
class Operation(Base):
    __tablename__ = "operations"

    id = Column(Integer, primary_key=True, index=True)
    expression = Column(String, index=True)
    result = Column(Float)
