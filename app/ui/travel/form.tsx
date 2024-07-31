"use client";

import { useEffect, useState } from "react";
import { Select } from "../../ui/travel/select";
import { ExchangeRate } from "@/app/lib/definitions";
import {
  BanknotesIcon,
  ArrowsRightLeftIcon,
} from "@heroicons/react/24/outline";
import { EmergencyNumbers } from "./emergency-numbers";

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
  const [isSwapped, setIsSwapped] = useState(false);

  const [currency, setCurrency] = useState("");
  const [input, setInput] = useState("");
  const rate = rates.find((val) => val.currency === currency);
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
        maxDigits: 2,
        amount: "1",
        currency: "USD",
        rate: rate?.rate,
        isSwapped,
      })
    : formatCurrency({
        maxDigits: 2,
        amount: "1",
        currency,
        rate: rate?.rate,
        isSwapped,
      });
  const inputExampleFormatted = !isSwapped
    ? formatCurrency({
        maxDigits: 2,
        amount: "1",
        currency,
        rate: undefined,
        isSwapped,
      })
    : formatCurrency({
        maxDigits: 2,
        amount: "1",
        currency: "USD",
        rate: undefined,
        isSwapped,
      });

  const handleSetCurrency = (curr: string) => {
    setCurrency(curr);
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

  if (!currency) {
    return <></>;
  }

  return (
    <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
      <div className="text-sm text-gray-500">{`${inputExampleFormatted} = ${outputExampleFormatted} as of ${rate?.dt_created.toDateString()}`}</div>

      {/* {isSwapped && (
        <div className="text-sm text-gray-500">{`${formatCurrency({
          maxDigits: 4,
          amount: "1",
          currency: "USD",
          rate: rate?.rate,
          isSwapped,
        })} = ${formatCurrency({
          maxDigits: 2,
          amount: "1",
          currency,
          rate: undefined,
          isSwapped,
        })} as of ${rate?.dt_created.toDateString()}`}</div>
      )} */}
      <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
        <div className="flex flex-col items-center">
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="amount"
                name="amount"
                type="number"
                step="1"
                placeholder={`Enter ${isSwapped ? "USD" : currency} amount`}
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                style={{ width: "260px" }}
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              {input && (
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-gray-700"
                  onClick={handleClear}
                >
                  <svg
                    className="w-4 h-4"
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
            rates={rates}
          />

          <div className="flex flex-row bg-green-300 font-bold font-medium p-4 rounded-lg">
            {`${inputFormatted} = ${outputFormatted}`}{" "}
            <ArrowsRightLeftIcon
              className="h-[25px] w-[25px] ml-2 cursor-pointer"
              onClick={handleSwap}
            />
          </div>
        </div>
        {/* <Link
            href="/login"
            className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
          >
            <span>Log in</span> <ArrowRightIcon className="w-5 md:w-6" />
          </Link> */}
      </div>
      {rate && <EmergencyNumbers rate={rate} />}
      <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12"></div>
    </div>
  );
};
