from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware
from database import get_session
from models import Dish
from sqlmodel import select

app = FastAPI()
clients = []

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.get("/dishes")
def get_dishes():
    with get_session() as session:
        return session.exec(select(Dish)).all()

@app.post("/dishes/{dish_id}/toggle")
def toggle_publish(dish_id: int):
    with get_session() as session:
        dish = session.get(Dish, dish_id)
        if dish:
            dish.isPublished = not dish.isPublished
            session.add(dish)
            session.commit()
            for client in clients:
                try:
                    client.send_json({"dishId": dish.dishId, "isPublished": dish.isPublished})
                except:
                    continue
            return {"message": "Status toggled"}
        return {"error": "Dish not found"}

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    clients.append(websocket)
    try:
        while True:
            await websocket.receive_text()
    except:
        clients.remove(websocket)
