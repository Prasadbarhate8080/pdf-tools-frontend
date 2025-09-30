import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
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
  metadataBase: new URL(`https://www.pdftoolify.com`),
  title:{ 
    default:"PDFtoolify | Online PDF tools",
    template:"%s - PDFtoolify"
  },
  description: "Tools for all pdf related operations",
  alternates: {
        canonical: './',
    }
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
            <Footer />  
          </StoreProvider>
        </body>

      </html>
  );
}
