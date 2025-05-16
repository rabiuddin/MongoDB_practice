import React, { useState } from "react";
import axios from "axios";

export default function FindPage() {
  const [mode, setMode] = useState("find"); // or 'findOne'
  const [query, setQuery] = useState('{\n  "age": { "$gte": 18 }\n}');
  const [limit, setLimit] = useState("");
  const [skip, setSkip] = useState("");
  const [sort, setSort] = useState("");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setError("");
    setResponse(null);

    try {
      const body = {
        query: JSON.parse(query),
      };

      if (mode === "find") {
        if (limit) body.limit = parseInt(limit);
        if (skip) body.skip = parseInt(skip);
        if (sort) body.sort = JSON.parse(sort);
      }

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
      <div className="w-full max-w-3xl bg-white p-6 rounded-xl shadow-md space-y-6">
        <h1 className="text-2xl font-bold text-gray-800">Query Documents</h1>

        {/* Mode Selector */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Query Mode
          </label>
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="find">find()</option>
            <option value="findOne">findOne()</option>
          </select>
        </div>

        {/* Query Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Query (JSON)
          </label>
          <textarea
            rows="6"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="mt-1 w-full px-3 py-2 font-mono border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder='{ "age": { "$gte": 18 } }'
          />
        </div>

        {/* Advanced Options */}
        {mode === "find" && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Limit
                </label>
                <input
                  type="number"
                  value={limit}
                  onChange={(e) => setLimit(e.target.value)}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  placeholder="e.g. 5"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Skip
                </label>
                <input
                  type="number"
                  value={skip}
                  onChange={(e) => setSkip(e.target.value)}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  placeholder="e.g. 10"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Sort (JSON)
                </label>
                <input
                  type="text"
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="mt-1 w-full px-3 py-2 font-mono border border-gray-300 rounded-md shadow-sm"
                  placeholder='{ "age": -1 }'
                />
              </div>
            </div>
          </>
        )}

        {/* Submit */}
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 font-semibold transition"
        >
          Submit Query
        </button>

        {/* Result */}
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
