"use client";

import AcmeLogo from "@/app/ui/acme-logo";
import { useEffect, useState } from "react";
import { Select } from "../../ui/travel/select";
import { ExchangeRate } from "@/app/lib/definitions";
import {
  BanknotesIcon,
  ArrowsRightLeftIcon,
} from "@heroicons/react/24/outline";
import { EmergencyNumbers } from "./emergency-numbers";
import { Button } from "../button";
import { phrases } from "@/app/lib/phrases";
import Modal from "./modal";

type Props = {
  rates: ExchangeRate[];
};

type Format = {
  maxDigits: number;
  amount: string;
  currency: string;
  rate: number | undefined;
  isSwapped: boolean;
};

const formatCurrency = ({
  maxDigits,
  amount,
  currency,
  rate,
  isSwapped,
}: Format) => {
  if (rate) {
    // should convert and return
    return amount
      ? `${(isSwapped
          ? parseFloat(amount) * rate
          : parseFloat(amount) / rate
        ).toLocaleString("en-US", {
          style: "currency",
          currency: currency || "USD",
          minimumFractionDigits: 2,
          maximumFractionDigits: maxDigits,
        })}`
      : "";
  } else if (amount) {
    // should just format
    return `${parseFloat(amount).toLocaleString("en-US", {
      style: "currency",
      currency: currency || "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  }

  return "";
};

export const Form = ({ rates }: Props) => {
  const DEFAULT_CURRENCY = "JPY";
  const [modalOpen, setModalOpen] = useState(false);
  const [isSwapped, setIsSwapped] = useState(false);
  const [currency, setCurrency] = useState("");
  const [input, setInput] = useState("");
  const [savedRates, setSavedRates] = useState<ExchangeRate[]>(rates);
  const rate = savedRates.find((val) => val.currency === currency);
  const outputFormatted = !isSwapped
    ? formatCurrency({
        maxDigits: 2,
        amount: input || "1",
        currency: "USD",
        rate: rate?.rate,
        isSwapped,
      })
    : formatCurrency({
        maxDigits: 2,
        amount: input || "1",
        currency,
        rate: rate?.rate,
        isSwapped,
      });
  const inputFormatted = !isSwapped
    ? formatCurrency({
        maxDigits: 2,
        amount: input || "1",
        currency,
        rate: undefined,
        isSwapped,
      })
    : formatCurrency({
        maxDigits: 2,
        amount: input || "1",
        currency: "USD",
        rate: undefined,
        isSwapped,
      });

  const outputExampleFormatted = !isSwapped
    ? formatCurrency({
        maxDigits: 4,
        amount: "1",
        currency: "USD",
        rate: rate?.rate,
        isSwapped,
      })
    : formatCurrency({
        maxDigits: 4,
        amount: "1",
        currency,
        rate: rate?.rate,
        isSwapped,
      });
  const inputExampleFormatted = !isSwapped
    ? formatCurrency({
        maxDigits: 4,
        amount: "1",
        currency,
        rate: undefined,
        isSwapped,
      })
    : formatCurrency({
        maxDigits: 4,
        amount: "1",
        currency: "USD",
        rate: undefined,
        isSwapped,
      });

  const handleSetCurrency = (curr: string) => {
    setCurrency(curr);

    if (typeof window !== "undefined") {
      localStorage.setItem("last_currency", curr);
    }
  };

  const handleClear = () => {
    setInput("");
  };

  const handleSwap = () => {
    setIsSwapped(!isSwapped);
    handleClear();
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("last_currency");
      if (saved) {
        setCurrency(saved);
      } else {
        setCurrency(DEFAULT_CURRENCY);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (rates.length > 0) {
        localStorage.setItem("rates", JSON.stringify(rates));
      } else {
        const savedRates = localStorage.getItem("rates");
        const savedRatesParsed = savedRates ? JSON.parse(savedRates) : null;
        if (rates.length === 0 && savedRatesParsed.length > 0) {
          setSavedRates(savedRatesParsed);
        }
      }
    }
  }, [rates]);

  if (!currency || !rate) {
    return <></>;
  }

  return (
    <main className="flex flex-col p-6">
      <div className="flex flex-row justify-between h-20 shrink-0 rounded-lg bg-blue-500 p-4 ">
        <AcmeLogo text={`hi`} />
        <button
          onClick={() => setModalOpen(true)}
          className="flex h-10 items-center rounded-lg bg-green-300 px-4 text-sm font-medium text-black aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
        >
          view phrases
        </button>
        {phrases[currency] && (
          <Modal
            open={modalOpen}
            setOpen={setModalOpen}
            phrases={phrases[currency]}
          />
        )}
      </div>
      <div className="mt-4 flex grow flex-col gap-4 items-center">
        <div className="text-sm text-gray-500">{`${inputExampleFormatted} = ${outputExampleFormatted} as of ${rate?.dt_created.toDateString()}`}</div>
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-white px-6 py-10 md:w-2/5 md:px-10">
          <div className="flex flex-col items-center">
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="amount"
                  name="amount"
                  type="number"
                  step="1"
                  placeholder={`Enter ${isSwapped ? "USD" : currency} amount`}
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-base outline-2 placeholder:text-gray-500"
                  style={{ width: "260px" }}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  inputMode="numeric"
                />
                {input && (
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-gray-700"
                    onClick={handleClear}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                )}
                <BanknotesIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>
            <Select
              defaultValue={currency}
              disabled={false}
              onSetCurrency={handleSetCurrency}
              rates={savedRates}
            />
            <div className="flex flex-row items-center justify-center">
              <div className=" bg-green-300 font-bold font-medium p-4 rounded-lg">
                {`${inputFormatted} = ${outputFormatted}`}{" "}
              </div>
              <Button className={"ml-2"} onClick={handleSwap}>
                <ArrowsRightLeftIcon className="h-[25px] w-[25px]" />
              </Button>
            </div>
          </div>
        </div>
        {rate && <EmergencyNumbers rate={rate} />}
        <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12"></div>
      </div>
    </main>
  );
};
