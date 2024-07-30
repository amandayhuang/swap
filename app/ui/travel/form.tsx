"use client";

import { useEffect, useState } from "react";
import AcmeLogo from "@/app/ui/acme-logo";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import styles from "@/app/ui/home.module.css";
import { lusitana } from "../../ui/fonts";
import Image from "next/image";
import { Select } from "../../ui/travel/select";
// import { fetchExchangeRates } from "./lib/data";
import { ExchangeRate } from "@/app/lib/definitions";
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { formatCurrency } from "@/app/lib/utils";

type Props = {
  rates: ExchangeRate[];
};

export const Form = ({ rates }: Props) => {
  const DEFAULT_CURRENCY = "JPY";

  const [currency, setCurrency] = useState("");
  const [input, setInput] = useState("");
  const rate = rates.find((val) => val.currency === currency);
  console.log("rate", rate);

  const handleSetCurrency = (curr: string) => {
    setCurrency(curr);
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
      <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
        {/* <div className={styles.shape} />
        <p
          className={`text-xl text-gray-800 md:text-3xl md:leading-normal ${lusitana.className} antialiased`}
        >
          {" "}
          <strong>Welcome to Acme.</strong> This is the example for the{" "}
          <a href="https://nextjs.org/learn/" className="text-blue-500">
            Next.js Learn Course
          </a>
          , brought to you by Vercel.
        </p> */}
        <div className="flex flex-col items-center">
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="amount"
                name="amount"
                type="number"
                step="1"
                placeholder={`Enter ${currency} amount`}
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                width="260"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <Select
            defaultValue={currency}
            disabled={false}
            onSetCurrency={handleSetCurrency}
            rates={rates}
          />
          <div>=</div>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="amount"
                name="amount"
                type="number"
                step="1"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                disabled
                width="260"
                value={rate && input ? parseFloat(input) / rate?.rate : ""}
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <Select
            defaultValue={"USD"}
            disabled={true}
            onSetCurrency={handleSetCurrency}
            rates={rates}
          />
        </div>
        {/* <Link
            href="/login"
            className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
          >
            <span>Log in</span> <ArrowRightIcon className="w-5 md:w-6" />
          </Link> */}
      </div>
      <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
        {/* Add Hero Images Here */}
        {/* <Image
            src="/hero-desktop.png"
            width={1000}
            height={760}
            className="hidden md:block"
            alt="Screenshots of the dashboard project showing desktop version"
          />
          <Image
            src="/hero-mobile.png"
            width={560}
            height={620}
            className="block md:hidden"
            alt="Screenshots of the dashboard project showing mobile version"
          /> */}
      </div>
    </div>
  );
};
