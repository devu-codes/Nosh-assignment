import React, { useEffect, useState } from "react";
import axios from "axios";
import ToggleStatusButton from "./ToggleStatusButton";

function App() {
  const [dishes, setDishes] = useState([]);

  const fetchDishes = async () => {
    const res = await axios.get("http://localhost:8000/dishes");
    setDishes(res.data);
  };

  useEffect(() => {
    fetchDishes();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <h2 className="text-3xl font-bold mb-8 text-blue-700">Dish Dashboard</h2>
      <div className="w-full max-w-5xl flex flex-wrap gap-8 justify-center">
        {dishes.map((dish) => (
          <div
            key={dish.id}
            className="flex flex-col items-center bg-white shadow rounded-lg px-6 py-4"
          >
            {/* <div key={dish.dishId}> */}
            {dish.imageUrl && (
              <img
                src={dish.imageUrl}
                alt={dish.dishName}
                height={200}
                width={200}
              />
            )}
            <div className="text-lg font-semibold">{dish.dishName}</div>
            <ToggleStatusButton
              initialStatus={dish.isPublished}
              id={dish.dishId}
            />
            {/* </div> */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
