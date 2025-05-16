import React, { useState } from "react";
import axios from "axios";

export default function InsertPage() {
  const [mode, setMode] = useState("insertOne");
  const [jsonInput, setJsonInput] = useState('{\n  "name": "Alice"\n}');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setError("");
    setResponse(null);

    try {
      const body = {
        ...(mode === "insertOne"
          ? { document: JSON.parse(jsonInput) }
          : { documents: JSON.parse(jsonInput) }),
      };

      const res = await axios.post(`http://localhost:8000/api/${mode}`, body, {
        headers: { "Content-Type": "application/json" },
      });

      setResponse(res.data);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 flex items-start justify-center">
      <div className="w-full max-w-2xl bg-white p-6 rounded-xl shadow-md space-y-6">
        <h1 className="text-2xl font-bold text-gray-800">Insert Document(s)</h1>

        {/* Mode Selector */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Insert Mode
          </label>
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="insertOne">Insert One</option>
            <option value="insertMany">Insert Many</option>
          </select>
        </div>

        {/* JSON Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            JSON Document{mode === "insertMany" ? "s" : ""}
          </label>
          <textarea
            rows="8"
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            className="mt-1 block w-full px-3 py-2 font-mono border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder={
              mode === "insertOne"
                ? '{ "name": "Alice" }'
                : '[{ "name": "Bob" }, { "name": "Charlie" }]'
            }
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 font-semibold transition"
        >
          Submit
        </button>

        {/* Output */}
        {error && (
          <div className="text-red-600 font-medium border-t pt-4">{error}</div>
        )}
        {response && (
          <div className="bg-green-100 border border-green-400 text-green-800 p-4 rounded mt-4">
            <pre className="whitespace-pre-wrap text-sm">
              {JSON.stringify(response, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
