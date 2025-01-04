"use client";

import React, { useState } from "react";
import useShortenUrl from "@/hooks/useShortenUrl";

const UrlInputForm = () => {
  const { shortUrl, error, loading, shortenUrl } = useShortenUrl();
  const [originalUrl, setOriginalUrl] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    shortenUrl(originalUrl);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col space-y-2">
          <label htmlFor="url" className="text-sm font-medium text-gray-700">
            Enter your URL
          </label>
          <input
            id="url"
            type="text"
            placeholder="https://example.com"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 text-white font-medium rounded-md transition ${
            loading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          }`}>
          {loading ? "Shortening..." : "Shorten URL"}
        </button>
      </form>
      {shortUrl && (
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 text-center">
          <p className="text-sm text-gray-600 mb-2">Your shortened URL:</p>
          <a
            href={shortUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline hover:text-blue-800">
            {shortUrl}
          </a>
        </div>
      )}
      {error && (
        <div className="bg-red-50 border border-red-100 rounded-lg p-4 text-center text-red-600">
          {error}
        </div>
      )}
    </div>
  );
};

export default UrlInputForm;
