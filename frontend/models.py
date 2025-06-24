from sqlalchemy import Column, Integer, String, Float, Date, DateTime, Boolean
from sqlalchemy.orm import declarative_base

# Define the base class for declarative models
Base = declarative_base()

class Hiring(Base):
    __tablename__ = "hiring_data"
    
    id = Column(Integer, primary_key=True, index=True)
    
    # Added indexing for better query performance on these frequently filtered columns
    business_group = Column(String, index=True)
    function = Column(String, index=True)
    
    # This new column was added to support the data generator
    role_title = Column(String)
    
    hire_date = Column(Date)
    
    # Changed from Float to Integer to precisely match the integer data from the generator
    cost_per_hire = Column(Integer) 
    
    time_to_fill = Column(Integer)
    ijp_adherence = Column(Boolean)
    build_buy_ratio = Column(String)
    diversity_ratio = Column(Boolean)
    source = Column(String)

class BusinessSummary(Base):
    __tablename__ = "business_summary"
    
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    business_group = Column(String)
    function = Column(String)
    total_headcount = Column(Integer)
    available_headcount = Column(Integer)
    gap = Column(Integer)

class AlertLog(Base):
    __tablename__ = "alerts_log"
    # This table is not currently populated by the seed script, but the model is kept for future use.
    id = Column(Integer, primary_key=True, index=True)
    timestamp = Column(DateTime)
    metric_name = Column(String)
    value = Column(Float)
    threshold = Column(Float)
    severity = Column(String)
    business_group = Column(String)
    function = Column(String)
