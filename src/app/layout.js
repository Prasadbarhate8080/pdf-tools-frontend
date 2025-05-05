import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/store/StoreProvider";
import Header from "@/components/Header";
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
  verification: {
    google: "GZyDSZ0235mXorrHf-X9v-zWGErdSVDPfJd1iuUZh-E", 
  },
};

export default function RootLayout({ children }) {
  return (
    
      <html lang="en">
       
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased `}
        >
          <StoreProvider> 
            <Header />
          {children}
          </StoreProvider>
        </body>

      </html>
  );
}
