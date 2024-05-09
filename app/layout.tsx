import { Header } from "@/components/layout/Header";
import { ApolloProvider } from "@/components/providers/ApolloProvider";
import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "./globals.css";

const jost = Jost({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Showpo Store Next App",
  description: "Showpo storefront made with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${jost.className} antialiased`}>
        <ApolloProvider>
          <Header />
          <main>{children}</main>
        </ApolloProvider>
      </body>
    </html>
  );
}
