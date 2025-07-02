import json

from database import get_session, create_db
from models import Dish

with open('dish-assignment.json', 'r') as file:
    data = json.load(file)

create_db()

with get_session() as session:
    for item in data:
        session.add(Dish(**item))
    session.commit()
