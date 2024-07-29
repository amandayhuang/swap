import { fetchExchangeRates } from "@/app/lib/data";

export const Select = async ({
  defaultValue,
  disabled,
}: {
  defaultValue: string;
  disabled: boolean;
}) => {
  const rates = await fetchExchangeRates();

  return (
    <div className="rounded-md bg-gray-50 p-4 md:p-6">
      {/* Customer Name */}
      <div className="mb-4">
        {/* {!disabled && <label htmlFor="customer" className="mb-2 block text-sm font-medium">
          Select currency
        </label>} */}
        <div className="relative">
          <select
            id="customer"
            name="customerId"
            className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            defaultValue={defaultValue}
            disabled={disabled}
          >
            <option value="" disabled>
              Select a currency
            </option>
            {rates.map((rate) => (
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
