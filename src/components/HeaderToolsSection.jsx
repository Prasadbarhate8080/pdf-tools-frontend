import React from "react";
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
  FileStack,
  FileInput,
} from "lucide-react";

function HeaderToolsSection({ setIsActiveTools, setIsActiveHamBurger }) {
  return (
    <div className="w-[750px] mx-auto p-6 bg-background rounded-2xl 
                     border border-border/50 shadow-xl
                     animate-in fade-in slide-in-from-top-4 duration-300">

      <div className="grid grid-cols-4 gap-x-6 gap-y-4">
        {/* COLUMN 1 */}
        <div className="flex flex-col gap-2">
          <h3 className="text-xs font-semibold text-muted-foreground tracking-wider uppercase mb-1">CONVERT FROM PDF</h3>
          <ToolName href="/merge_pdf" title="Merge PDF" Icon={Merge}
            setIsActiveTools={setIsActiveTools} setIsActiveHamBurger={setIsActiveHamBurger} />
          <ToolName href="/split_pdf" title="Split PDF" Icon={Split}
            setIsActiveTools={setIsActiveTools} setIsActiveHamBurger={setIsActiveHamBurger} />
          <ToolName href="/remove_pdf_pages" title="Remove Pages" Icon={Scissors}
            setIsActiveTools={setIsActiveTools} setIsActiveHamBurger={setIsActiveHamBurger} />
          <ToolName href="/extract_pdf" title="Extract Pages" Icon={FileOutput}
            setIsActiveTools={setIsActiveTools} setIsActiveHamBurger={setIsActiveHamBurger} />
        </div>

        {/* COLUMN 2 */}
        <div className="flex flex-col gap-2">
          <h3 className="text-xs font-semibold text-muted-foreground tracking-wider uppercase mb-1">CONVERT TO PDF</h3>
          <ToolName href="/pdf_to_jpg" title="PDF to JPG" Icon={FileDown}
            setIsActiveTools={setIsActiveTools} setIsActiveHamBurger={setIsActiveHamBurger} />
          <ToolName href="/jpg_to_pdf" title="JPG to PDF" Icon={FileImage}
            setIsActiveTools={setIsActiveTools} setIsActiveHamBurger={setIsActiveHamBurger} />
          <ToolName href="/compress_pdf" title="Compress PDF" Icon={Shrink}
            setIsActiveTools={setIsActiveTools} setIsActiveHamBurger={setIsActiveHamBurger} />
          <ToolName href="/word_to_pdf" title="Word to PDF" Icon={FileType}
            setIsActiveTools={setIsActiveTools} setIsActiveHamBurger={setIsActiveHamBurger} />
        </div>

        {/* COLUMN 3 */}
        <div className="flex flex-col gap-2">
          <h3 className="text-xs font-semibold text-muted-foreground tracking-wider uppercase mb-1">EDIT & ORGANIZE</h3>
          <ToolName href="/add_pages_to_pdf" title="Add Pages" Icon={FilePlus}
            setIsActiveTools={setIsActiveTools} setIsActiveHamBurger={setIsActiveHamBurger} />
          <ToolName href="/add_pdf_in_pdf" title="Insert PDF" Icon={FileStack}
            setIsActiveTools={setIsActiveTools} setIsActiveHamBurger={setIsActiveHamBurger} />
          <ToolName href="/create_pdf" title="Create PDF" Icon={FileInput}
            setIsActiveTools={setIsActiveTools} setIsActiveHamBurger={setIsActiveHamBurger} />
          <ToolName href="/pdf_to_pdfa" title="PDF to PDF/A" Icon={FileCheck}
            setIsActiveTools={setIsActiveTools} setIsActiveHamBurger={setIsActiveHamBurger} />
        </div>

        {/* COLUMN 4 */}
        <div className="flex flex-col gap-2">
          <h3 className="text-xs font-semibold text-muted-foreground tracking-wider uppercase mb-1">OPTIMIZE & SECURE</h3>
          <ToolName href="/protect_pdf" title="Protect PDF" Icon={Shield}
            setIsActiveTools={setIsActiveTools} setIsActiveHamBurger={setIsActiveHamBurger} />
          <ToolName href="/unlock_pdf" title="Unlock PDF" Icon={LockOpen}
            setIsActiveTools={setIsActiveTools} setIsActiveHamBurger={setIsActiveHamBurger} />
          <ToolName href="/add_watermark" title="Add Watermark" Icon={Brush}
            setIsActiveTools={setIsActiveTools} setIsActiveHamBurger={setIsActiveHamBurger} />
          <ToolName href="/add_page_no" title="Page Numbers" Icon={Hash}
            setIsActiveTools={setIsActiveTools} setIsActiveHamBurger={setIsActiveHamBurger} />
        </div>
      </div>
    </div>
  );
}

export default HeaderToolsSection;
