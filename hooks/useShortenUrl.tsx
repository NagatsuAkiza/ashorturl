"use client";

import axios from "axios";
import { useState } from "react";

const useShortenUrl = () => {
  const [shortUrl, setShortUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const shortenUrl = async (originalUrl: string) => {
    if (!isValidUrl(originalUrl)) {
      setError("Invalid URL format");
      return;
    }

    setLoading(true);
    try {
      setError(null);
      const response = await axios.post("/api/shorten/", { originalUrl });
      setShortUrl(response.data.shortUrl);
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return { shortUrl, error, loading, shortenUrl };
};

export default useShortenUrl;
