import { fetchExchangeRates } from "./lib/data";
import { Form } from "./ui/travel/form";
import { ExchangeRate } from "./lib/definitions";

export default async function Page() {
  try {
    const rates: ExchangeRate[] = await fetchExchangeRates();
    return <Form rates={rates}></Form>;
  } catch (error) {
    return <Form rates={[]}></Form>;
  }
}
