"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Hook() {
  const pathname = usePathname();

  const [userId, setUserId] = useState<string | null>(null);
  const [zapId, setZapId] = useState<string | null>(null);

  const [inputData, setInputData] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (pathname) {
      const pathSegments = pathname.split("/");
      setUserId(pathSegments[3] || null); // /hooks/catch/:userId/:zapId
      setZapId(pathSegments[4] || null);
    }
  }, [pathname]);

  const handleChange = (e: any) => {
    setInputData(e.target.value);
    setError("");
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!userId || !zapId) {
      setError("Missing userId or zapId in the URL.");
      return;
    }

    let parsedData = {};
    try {
      parsedData = JSON.parse(inputData);
      console.log(parsedData);
    } catch (error) {
      setError(
        "Invalid JSON format. Make sure keys and strings are wrapped in double quotes."
      );
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3002/hooks/catch/${userId}/${zapId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(parsedData),
        }
      );

      if (response.ok) {
        console.log("Data submitted successfully");
        setInputData("");
      } else {
        console.error("Error submitting data");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div className="flex justify-center items-center gap-6 pt-12 pd-12 px-4 md:px-8">
      <form
        className="flex flex-col gap-4 w-full max-w-lg bg-white p-4 rounded-lg shadow-md"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="inputData" className="text-sm font-medium">
            Input Data
          </label>
          <textarea
            id="inputData"
            name="inputData"
            value={inputData}
            onChange={handleChange}
            placeholder='e.g. {"comment": {"email": "example@gmail.com","amount": "$100"}}'
            rows={10}
            className="p-2 border border-gray-300 rounded-md resize-vertical"
          />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          className="text-sm px-4 py-2 cursor-pointer hover:shadow-lg bg-amber-700 text-white rounded-full text-center"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
