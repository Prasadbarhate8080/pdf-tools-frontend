import React from "react";
import Link from "next/link";
import Image from "next/image";
import ToolName from "./ToolName";
import {
  Merge,
  Split,
  FileOutput,
  FileImage,
  FileDown,
  Shrink,
  Shield,
  Scissors,
  FilePlus,
  LockOpen,
  FileType,
  FileCheck,
  Brush,
  Hash,
} from "lucide-react";
function MobileToolsSection({
  isActiveTools,
  setIsActiveTools,
  setIsActiveHamBurger,
}) {
  return (
    <div
      className={`fixed min-h-screen ${
        isActiveTools ? "block" : "hidden"
      } p-10 bg-white w-full overflow-auto h-screen  top-0 left-[50%] md:hidden! translate-x-[-50%] z-10`}
    >
      <div
      onClick={() => {setIsActiveTools(false); setIsActiveHamBurger(false) }}
      className="absolute top-4 right-4">
        <Image
          src={"/close.png"}
          width={20}
          height={20}
          alt="close"
        />
      </div>
      <ul className="list-none flex flex-col text-md text-gray-700 gap-5">
        <ToolName href="/merge_pdf" title="Merge PDF" iconClassName="text-blue-500" Icon={Merge}
          setIsActiveTools={setIsActiveTools} setIsActiveHamBurger={setIsActiveHamBurger} />

        <ToolName href="/split_pdf" title="Split PDF" iconClassName="text-blue-500" Icon={Split}
          setIsActiveTools={setIsActiveTools} setIsActiveHamBurger={setIsActiveHamBurger} />

        <ToolName href="/extract_pdf" title="Extract Pages" iconClassName="text-blue-500" Icon={FileOutput}
          setIsActiveTools={setIsActiveTools} setIsActiveHamBurger={setIsActiveHamBurger} />

        <ToolName href="/jpg_to_pdf" title="JPG to PDF" iconClassName="text-blue-500" Icon={FileImage}
          setIsActiveTools={setIsActiveTools} setIsActiveHamBurger={setIsActiveHamBurger} />
        <ToolName href="/pdf_to_jpg" title="PDF to JPG" iconClassName="text-blue-500" Icon={FileDown}
          setIsActiveTools={setIsActiveTools} setIsActiveHamBurger={setIsActiveHamBurger} />

        <ToolName href="/compress_pdf" title="Compress PDF" iconClassName="text-blue-500" Icon={Shrink}
          setIsActiveTools={setIsActiveTools} setIsActiveHamBurger={setIsActiveHamBurger} />

        <ToolName href="/protect_pdf" title="Protect PDF" iconClassName="text-blue-500" Icon={Shield}
          setIsActiveTools={setIsActiveTools} setIsActiveHamBurger={setIsActiveHamBurger} />

        <ToolName href="/remove_pdf_pages" title="Remove Pages" iconClassName="text-blue-500" Icon={Scissors}
          setIsActiveTools={setIsActiveTools} setIsActiveHamBurger={setIsActiveHamBurger} />
        <ToolName href="/add_pages_to_pdf" title="Add Pages to PDF" iconClassName="text-blue-500" Icon={FilePlus}
          setIsActiveTools={setIsActiveTools} setIsActiveHamBurger={setIsActiveHamBurger} />

        <ToolName href="/unlock_pdf" title="Unlock PDF" iconClassName="text-blue-500" Icon={LockOpen}
          setIsActiveTools={setIsActiveTools} setIsActiveHamBurger={setIsActiveHamBurger} />

        <ToolName href="/word_to_pdf" title="Word to PDF" iconClassName="text-blue-500" Icon={FileType}
          setIsActiveTools={setIsActiveTools} setIsActiveHamBurger={setIsActiveHamBurger} />

        <ToolName href="/pdf_to_pdfa" title="PDF to PDFA" iconClassName="text-blue-500" Icon={FileCheck}
          setIsActiveTools={setIsActiveTools} setIsActiveHamBurger={setIsActiveHamBurger} />
        <ToolName href="/add_watermark" title="Add Watermark" iconClassName="text-blue-500" Icon={Brush}
          setIsActiveTools={setIsActiveTools} setIsActiveHamBurger={setIsActiveHamBurger} />

        <ToolName href="/add_page_no" title="Add Page Numbers" iconClassName="text-blue-500" Icon={Hash}
          setIsActiveTools={setIsActiveTools} setIsActiveHamBurger={setIsActiveHamBurger} />
      </ul>
    </div>
  );
}

export default MobileToolsSection;
