from sqlmodel import SQLModel, Field

class Dish(SQLModel, table=True):
    dishId: int = Field(default=None, primary_key=True)
    dishName: str
    imageUrl: str
    isPublished: bool