import { MapIcon } from "@heroicons/react/24/outline";

import { lusitana } from "./fonts";

export default function AcmeLogo({ text }: { text: string }) {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      <MapIcon className="h-12 w-12 rotate-[15deg]" />
      <p className="text-[40px] ml-3">{text}</p>
    </div>
  );
}
