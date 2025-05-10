import React, { useState } from "react";

export default function DeletePage() {
  const [mode, setMode] = useState("deleteOne"); // or 'deleteMany'
  const [filter, setFilter] = useState('{\n  "name": "Bob"\n}');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setError("");
    setResponse(null);

    try {
      const body = {
        filter: JSON.parse(filter),
      };

      const res = await fetch(`/api/${mode}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Error deleting data");

      setResponse(data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 flex items-start justify-center">
      <div className="w-full max-w-3xl bg-white p-6 rounded-xl shadow-md space-y-6">
        <h1 className="text-2xl font-bold text-gray-800">Delete Document(s)</h1>

        {/* Mode Selector */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Delete Mode
          </label>
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="deleteOne">Delete One</option>
            <option value="deleteMany">Delete Many</option>
          </select>
        </div>

        {/* Filter Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Filter (JSON)
          </label>
          <textarea
            rows="6"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="mt-1 w-full px-3 py-2 font-mono border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder='{ "name": "Bob" }'
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 font-semibold transition"
        >
          Submit Delete
        </button>

        {/* Output */}
        {error && (
          <div className="text-red-600 font-medium border-t pt-4">{error}</div>
        )}
        {response && (
          <div className="bg-gray-100 border border-gray-300 text-gray-800 p-4 rounded mt-4">
            <pre className="whitespace-pre-wrap text-sm">
              {JSON.stringify(response, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
