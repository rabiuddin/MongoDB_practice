import React, { useState } from "react";

export default function UpdatePage() {
  const [mode, setMode] = useState("updateOne"); // or 'updateMany' or 'replaceOne'
  const [filter, setFilter] = useState('{\n  "name": "Alice"\n}');
  const [update, setUpdate] = useState('{\n  "$set": { "age": 30 }\n}');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setError("");
    setResponse(null);

    try {
      const body = {
        filter: JSON.parse(filter),
        ...(mode === "replaceOne"
          ? { replacement: JSON.parse(update) }
          : { update: JSON.parse(update) }),
      };

      const res = await fetch(`/api/${mode}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Error updating data");

      setResponse(data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 flex items-start justify-center">
      <div className="w-full max-w-3xl bg-white p-6 rounded-xl shadow-md space-y-6">
        <h1 className="text-2xl font-bold text-gray-800">Update Document(s)</h1>

        {/* Mode Selector */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Update Mode
          </label>
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="updateOne">Update One</option>
            <option value="updateMany">Update Many</option>
            <option value="replaceOne">Replace One</option>
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
            placeholder='{ "name": "Alice" }'
          />
        </div>

        {/* Update/Replacement Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            {mode === "replaceOne"
              ? "Replacement Document (JSON)"
              : "Update (JSON)"}
          </label>
          <textarea
            rows="6"
            value={update}
            onChange={(e) => setUpdate(e.target.value)}
            className="mt-1 w-full px-3 py-2 font-mono border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder={
              mode === "replaceOne"
                ? '{ "name": "Alice", "age": 31 }'
                : '{ "$set": { "age": 30 } }'
            }
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 font-semibold transition"
        >
          Submit Update
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
