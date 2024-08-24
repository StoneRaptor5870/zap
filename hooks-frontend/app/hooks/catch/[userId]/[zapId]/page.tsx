"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";

export default function Hook() {
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");
  const zapId = searchParams.get("zapId");

  const [inputData, setInputData] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e: any) => {
    setInputData(e.target.value);
    setError("");
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    let parsedData = {};
    try {
      parsedData = JSON.parse(inputData);
      console.log(parsedData);
    } catch (error) {
      setError("Invalid JSON format. Make sure keys and strings are wrapped in double quotes.");
      return;
    }

    try {
      const response = await fetch(`localhost:3002/hooks/catch/:${userId}/:${zapId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(parsedData),
      });

      if (response.ok) {
        console.log("Data submitted successfully");
      } else {
        console.error("Error submitting data");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div>
      <h1>Hello from hooks/catch/{userId}/{zapId}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="inputData">Input Data:</label>
          <textarea
            id="inputData"
            name="inputData"
            value={inputData}
            onChange={handleChange}
            placeholder='e.g. {"email": "anuj@gmail.com", "amount": 100}'
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
