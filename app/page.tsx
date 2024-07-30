import AcmeLogo from "@/app/ui/acme-logo";
import { fetchExchangeRates } from "./lib/data";
// import { ExchangeRate } from "./lib/definitions";
import { Form } from "./ui/travel/form";

export default async function Page() {
  const rates = await fetchExchangeRates();
  console.log("RATES", rates);
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex h-20 shrink-0 items-end rounded-lg bg-blue-500 p-4 md:h-52">
        <AcmeLogo />
      </div>
      <Form rates={rates}></Form>
    </main>
  );
}
