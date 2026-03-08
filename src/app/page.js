import React from "react";
import home from "./home.module.css"
import InfoCard from "@/components/InfoCard";
import FeaturesCard from "@/components/FeatureCard";
import { Clock, CreditCard, Rabbit, ShieldCheck, TreePalm, Users } from "lucide-react";
import { HeroSection } from "@/components/HeroSection";
import { HomePageToolsSection } from "@/components/HomePageToolsSection";
import { PDFManageSection } from "@/components/PDFManageSection";
import { MostUsefullTools } from "@/components/MostUsefullTools";
import { PDFFeatures } from "@/components/PDFFeatures";
import { DownloadSoftware } from "@/components/DownloadSoftware";

export const metadata = {
  title: "Free Online PDF Tools - PDFtoolify",
  description: "Merge, split, compress, and convert PDF files online for free. PDFtoolify offers a complete set of PDF tools for all your document needs.",
  openGraph: {
    title: "PDFtoolify | Free Online PDF Tools",
    description: "Your all-in-one PDF solution. Fast, secure, and free online PDF tools.",
  },
  alternates: {
    canonical: "/",
  },
};

function Home() {
  return (
    <div className="">
      <main className="">
        <div className="">
          <HeroSection />
          <div className={""}>
            <div className="">
              <HomePageToolsSection />
            </div>
          </div>
        </div>
        <PDFManageSection />
        <MostUsefullTools/>
        <PDFFeatures />
        <DownloadSoftware />
      </main>
    </div>
  );
}

export default Home;
