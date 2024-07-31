import React from "react";
import { ExchangeRate } from "@/app/lib/definitions";
import { emergency } from "@/app/lib/emergency";

export const EmergencyNumbers = ({ rate }: { rate: ExchangeRate }) => {
  const numbers = emergency[rate.currency];
  return (
    <div className="max-w-md mx-auto bg-red-50 rounded-xl shadow-md overflow-hidden md:max-w-2xl m-4">
      <div className="p-8">
        <h2 className="block mt-1 text-md leading-tight font-medium text-red-900 mb-4">
          {`Emergency number for ${rate.area_name}`}
        </h2>
        <table className="min-w-full">
          <tbody className="bg-white divide-y divide-red-200">
            {numbers.map((item, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <svg
                      className="h-5 w-5 text-red-600 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    <div className="text-sm font-medium text-red-900">
                      {item.number}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-red-700">{item.description}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
