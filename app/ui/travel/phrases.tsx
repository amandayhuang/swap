import React from "react";
import { Phrase } from "@/app/lib/definitions";

export const Phrases = ({ phrases }: { phrases: Phrase[] }) => {
  return (
    <table className="min-w-full">
      <tbody className="bg-white divide-y ">
        {phrases.map((item, index) => (
          <tr key={index}>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="flex items-center">
                <div className="text-sm font-medium ">{item.english}</div>
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm ">{item.local}</div>
              <div className="text-sm ">{item.englishPronunciation}</div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
