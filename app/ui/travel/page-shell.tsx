"use client";

import { useEffect, useState } from "react";
import { ExchangeRate } from "@/app/lib/definitions";
import { Form } from "@/app/ui/travel/form";

const SAVED_RATES_KEY = "rates";

type LoadState = "loading" | "ready" | "offline" | "error";

function readSavedRates() {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const saved = localStorage.getItem(SAVED_RATES_KEY);
    return saved ? (JSON.parse(saved) as ExchangeRate[]) : [];
  } catch (error) {
    console.error("Failed to read saved rates:", error);
    return [];
  }
}

export default function TravelPageShell() {
  const [rates, setRates] = useState<ExchangeRate[]>([]);
  const [state, setState] = useState<LoadState>("loading");
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    setIsOnline(navigator.onLine);
    const savedRates = readSavedRates();
    if (savedRates.length > 0) {
      setRates(savedRates);
      setState(navigator.onLine ? "ready" : "offline");
    } else if (!navigator.onLine) {
      setState("offline");
    }

    async function loadRates() {
      try {
        const response = await fetch("/api/exchange-rates", {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error(`Request failed with ${response.status}`);
        }

        const freshRates = (await response.json()) as ExchangeRate[];
        setRates(freshRates);
        localStorage.setItem(SAVED_RATES_KEY, JSON.stringify(freshRates));
        setState("ready");
      } catch (error) {
        console.error("Failed to refresh rates:", error);
        setState(savedRates.length > 0 ? "offline" : "error");
      }
    }

    if (navigator.onLine) {
      void loadRates();
    }

    function handleOnline() {
      setIsOnline(true);
      void loadRates();
    }

    function handleOffline() {
      setIsOnline(false);
      setState((current) => (rates.length > 0 ? "offline" : current));
    }

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const statusMessage =
    state === "loading"
      ? "Loading rates..."
      : state === "offline"
        ? ""
        : state === "error"
          ? "No connection and no saved rates are available yet."
          : "";

  return (
    <Form
      rates={rates}
      statusMessage={statusMessage}
      isOnline={isOnline}
    />
  );
}
