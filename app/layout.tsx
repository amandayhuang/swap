import "@/app/ui/global.css";
import { inter } from "@/app/ui/fonts";
import { Metadata } from "next";

export const metadata: Metadata = {
  icons: {
    icon: "/favicon.ico",
  },
  title: "swap travel",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          defer
          src="https://app.tinyanalytics.io/pixel/yuitnjzOmSZeJQ7u"
        ></script>
      </head>
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
