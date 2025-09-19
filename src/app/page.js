import React from "react";
import Footer from "@/components/Footer";
import HomePageToolsSection from "@/components/HomePageToolsSection";
import HeroSection from "@/components/HeroSection";
import home from "./home.module.css"
import InfoCard from "@/components/InfoCard";
import FeaturesCard from "@/components/FeaturesCard";
import { Clock, CreditCard, Rabbit, ShieldCheck, TreePalm, Users } from "lucide-react";
import DownloadSoftware from "@/components/DownloadSoftware";
function Home() {
  return (
    <div className="">
      <main className="">
        <div className="bg-[url('/dotted_pattern.png')]">
          <HeroSection />
          <div className={home.toolsection_gradient}>
            <div className="bg-[url('/dotted_pattern.png')]">
              <HomePageToolsSection />
            </div>
          </div>
        </div>
        <div className="mt-16">
          <h1 className="text-3xl font-semibold text-center text-gray-800">Simplify Your PDF Tasks With PDFtoolify</h1>
          <p className="text-center">PDFtoolify is a secure and trusted PDF software. we have all the tools to work on PDF. PDFtoolify is free and <br /> easy to use PDF software</p>
        </div>
        <InfoCard 
        heading={"Manage All Your PDF Tasks In One Place"}
        paragraph={"PDFtoolify brings all essential PDF tools together merge,split,compress,convert and more every thing you need to work with pdf."}
        buttonText={"Explore more pdf tools"}
        src={"/manage_doc.jpg"}
        alt={"Manage All Your PDF Tasks In One Place"}
        />
        <h1 className="text-3xl mt-5 font-semibold text-center text-gray-800">Most Useful tools Provided By PDFtoolify</h1>
        <InfoCard 
        heading={"Create a perfect PDF Document with PDFtoolify"}
        paragraph={"Create PDF from jpg,png images and also manage your PDF document safely"}
        buttonText={"Create a PDF documnet"}
        src={"/create_doc.png"}
        alt={"Create a perfect PDF Document with PDFtoolify"}
        />
        <InfoCard 
        heading={"Add Pages in Existing PDF Document"}
        paragraph={"You can add pages in existing PDF document. And also remove pages from PDF this is simple and easy to use tool"}
        buttonText={"Add pages in pdf"}
        src={"/Add_pages.png"}
        alt={"Add Pages in Existing PDF Document"}
        flip
        />
        <InfoCard 
        heading={"Compress PDF"}
        paragraph={"Compres PDF - minimize the size  of the PDF use PDFtoolify compress tool to minimize or decrese the size of the PDF"}
        buttonText={"Compress PDF file"}
        src={"/compress.jpg"}
        alt={"Compress PDF"}
        imageHeight={550}
        imageWidth={550}
        />
        <h1 className="text-3xl font-semibold text-center text-gray-800 mt-4">Why Choose PDFtoolify</h1>
        {/* FeaturesCard section */}
        <div className="max-w-7xl flex mx-auto mt-24 flex-wrap gap-10 justify-evenly">
          <FeaturesCard Icon={Users} heading={"Userfrindely Experience"}
            paragraph={"Design to be simple and intutive to be everyone anyone can be easily use this tool and make his work simple"}
          />
          <FeaturesCard Icon={Rabbit} heading={"Fast And Easy to use"}
            paragraph={"Design to be simple and intutive to be everyone anyone can be easily use this tool and make his work simple"}
          />
          <FeaturesCard Icon={ShieldCheck} heading={"Secure And Private"}
            paragraph={"Design to be simple and intutive to be everyone anyone can be easily use this tool and make his work simple"}
          />
          <FeaturesCard Icon={TreePalm} heading={"Work Anywhere"}
            paragraph={"Design to be simple and intutive to be everyone anyone can be easily use this tool and make his work simple"}
          />
          <FeaturesCard Icon={CreditCard} heading={"Free & Affordable"}
            paragraph={"Design to be simple and intutive to be everyone anyone can be easily use this tool and make his work simple"}
          />
          <FeaturesCard Icon={Clock} heading={"Save Time, save Work"}
            paragraph={"Design to be simple and intutive to be everyone anyone can be easily use this tool and make his work simple"}
          />
        </div>
        <h1 className="text-3xl font-semibold text-center text-gray-800 mt-24">Handle With PDF Anywhere</h1>
        <div className="flex justify-center mt-16 gap-20">
          <DownloadSoftware imgSrc={"/windows_icon.png"} heading={"Windows"} 
          paragraph={"Download PDFtoolify for windows and simplify your PDF tasks. Use add pdf pages and more PDF related features for free"} 
          buttonText={"Download Now"}
          />
          <DownloadSoftware imgSrc={"/os_android.png"} heading={"Android"} 
          paragraph={"Download PDFtoolify app free for android. Use Read,merge,split and more PDF related featues for free"} 
          buttonText={"Download Now"}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Home;
