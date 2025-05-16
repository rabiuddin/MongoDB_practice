import React, { useState } from "react";
import axios from "axios";

export default function CollectionPage() {
  const [mode, setMode] = useState("renameCollection"); // or 'drop' or 'listCollections'
  const [oldName, setOldName] = useState("oldName");
  const [newName, setNewName] = useState("newName");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setError("");
    setResponse(null);

    try {
      const body =
        mode === "renameCollection"
          ? { oldName, newName }
          : mode === "drop"
          ? { collectionName: oldName }
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
        <h1 className="text-2xl font-bold text-gray-800">Manage Collections</h1>

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
            <option value="renameCollection">Rename Collection</option>
            <option value="drop">Drop Collection</option>
            <option value="listCollections">List Collections</option>
          </select>
        </div>

        {/* Rename Collection Inputs */}
        {mode === "renameCollection" && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Old Collection Name
              </label>
              <input
                type="text"
                value={oldName}
                onChange={(e) => setOldName(e.target.value)}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g. oldName"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                New Collection Name
              </label>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g. newName"
              />
            </div>
          </>
        )}

        {/* Drop Collection Input */}
        {mode === "drop" && (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Collection Name
            </label>
            <input
              type="text"
              value={oldName}
              onChange={(e) => setOldName(e.target.value)}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g. collectionName"
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
