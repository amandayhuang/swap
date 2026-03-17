import { fetchExchangeRates } from "@/app/lib/data";

export async function GET() {
  try {
    const rates = await fetchExchangeRates();
    return Response.json(rates);
  } catch (error) {
    return Response.json(
      { message: "Failed to fetch exchange rates." },
      { status: 500 }
    );
  }
}
