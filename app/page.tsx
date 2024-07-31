import AcmeLogo from "@/app/ui/acme-logo";
import { fetchExchangeRates } from "./lib/data";
import { Form } from "./ui/travel/form";

export default async function Page() {
  try {
    const rates = await fetchExchangeRates();
    return (
      <main className="flex min-h-screen flex-col p-6">
        <div className="flex h-20 shrink-0 items-end rounded-lg bg-blue-500 p-4 md:h-52">
          <AcmeLogo />
        </div>
        <Form rates={rates}></Form>
      </main>
    );
  } catch (error) {
    return (
      <main className="flex min-h-screen flex-col p-6">
        <div className="flex h-20 shrink-0 items-end rounded-lg bg-blue-500 p-4 md:h-52">
          <AcmeLogo />
        </div>
        <Form rates={[]}></Form>
      </main>
    );
  }
}
