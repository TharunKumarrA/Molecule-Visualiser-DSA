import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";

export default function AiSection({ compoundFormula }) {
  const [res, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGetData = () => {
    setIsLoading(true);
    axios
      .get(`http://localhost:8080/getinfo/${compoundFormula}`)
      .then((response) => {
        console.log(response.data);
        setResponse(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });
  };

  return (
    <div className="overflow-y-scroll p-4 no-scrollbar w-full">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          {!res && (
            <button
              onClick={handleGetData}
              className="flex justify-center items-center border-2 border-[#2ABD91] px-4 py-2 rounded-full mx-32"
            >
              GET DATA
            </button>
          )}
          {res && <ReactMarkdown>{res}</ReactMarkdown>}
        </>
      )}
    </div>
  );
}
