// ToggleStatusButton.jsx
import React, { useState } from "react";

function ToggleStatusButton({ initialStatus, id }) {
  const [status, setStatus] = useState(initialStatus);
  const [loading, setLoading] = useState(false);

  const handleToggle = async () => {
    setLoading(true);
    const newStatus = !status;
    try {
      await fetch(`http://localhost:8000/dishes/${id}/toggle`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      console.log(`Status updated to: ${newStatus}`);
      setStatus(newStatus);
    } catch (err) {
      alert("Failed to update status");
    }
    setLoading(false);
  };

  return (
    <button onClick={handleToggle}>
      {status ? "published" : "Unpublished"}
    </button>
  );
}

export default ToggleStatusButton;
