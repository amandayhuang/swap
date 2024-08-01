"use client";

import { ExchangeRate } from "@/app/lib/definitions";

export const Select = ({
  defaultValue,
  disabled,
  rates,
  onSetCurrency,
}: {
  defaultValue: string;
  disabled: boolean;
  rates: ExchangeRate[];
  onSetCurrency: (val: string) => void;
}) => {
  return (
    <div className="rounded-md p-4 md:p-6">
      <div className="mb-4">
        <div className="relative" style={{ width: 260 }}>
          <select
            id="customer"
            name="customerId"
            className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            defaultValue={defaultValue}
            disabled={disabled}
            onChange={(e) => onSetCurrency(e.target.value)}
          >
            <option value="" disabled>
              Select a currency
            </option>
            {rates
              .filter((r) => r.currency !== "USD")
              .map((rate) => (
                <option key={rate.id} value={rate.currency}>
                  {`${rate.name} (${rate.currency})`}
                </option>
              ))}
          </select>
        </div>
      </div>
    </div>
  );
};
