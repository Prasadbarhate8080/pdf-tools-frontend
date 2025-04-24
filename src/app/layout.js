import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Head from "next/head";
import StoreProvider from "@/store/StoreProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Allinone PDF",
  description: "tool for all pdf related operations",
};

export default function RootLayout({ children }) {
  return (
    
      <html lang="en">
        <Head>
        <meta name="google-site-verification" content="GZyDSZ0235mXorrHf-X9v-zWGErdSVDPfJd1iuUZh-E" />
        </Head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <StoreProvider>
            <Header />
          {children}
          </StoreProvider>
        </body>

      </html>
  );
}
