import React, { useState } from "react";
import axios from "axios";

export default function IndexPage() {
  const [mode, setMode] = useState("createIndex"); // or 'dropIndex' or 'getIndexes'
  const [indexSpec, setIndexSpec] = useState('{\n  "email": 1\n}');
  const [options, setOptions] = useState('{\n  "unique": true\n}');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [indexName, setIndexName] = useState("email_1");

  const handleSubmit = async () => {
    setError("");
    setResponse(null);

    try {
      const body =
        mode === "createIndex"
          ? {
              indexSpec: JSON.parse(indexSpec),
              options: JSON.parse(options),
            }
          : mode === "dropIndex"
          ? { indexName }
          : {};

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
        <h1 className="text-2xl font-bold text-gray-800">Manage Indexes</h1>

        {/* Mode Selector */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Operation Mode
          </label>
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="createIndex">Create Index</option>
            <option value="dropIndex">Drop Index</option>
            <option value="getIndexes">List Indexes</option>
          </select>
        </div>

        {/* Create Index Inputs */}
        {mode === "createIndex" && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Index Specification (JSON)
              </label>
              <textarea
                rows="4"
                value={indexSpec}
                onChange={(e) => setIndexSpec(e.target.value)}
                className="mt-1 w-full px-3 py-2 font-mono border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder='{ "email": 1 }'
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Options (JSON)
              </label>
              <textarea
                rows="4"
                value={options}
                onChange={(e) => setOptions(e.target.value)}
                className="mt-1 w-full px-3 py-2 font-mono border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder='{ "unique": true }'
              />
            </div>
          </>
        )}

        {/* Drop Index Input */}
        {mode === "dropIndex" && (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Index Name
            </label>
            <input
              type="text"
              value={indexName}
              onChange={(e) => setIndexName(e.target.value)}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g. email_1"
            />
          </div>
        )}

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
