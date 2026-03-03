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
