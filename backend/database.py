from sqlmodel import create_engine, Session
from models import SQLModel

DATABASE_URL = "sqlite:///dishes.db"
engine = create_engine(DATABASE_URL, echo=True)

def create_db():
    SQLModel.metadata.create_all(engine)

def get_session():
    return Session(engine)
