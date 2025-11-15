import { 
  Merge, Split, FileImage, FileDown, Scissors, 
  Shield, LockOpen, FileType, FilePlus, 
  FileCheck, Brush, Hash, Shrink, FileOutput 
} from "lucide-react";
import Link from "next/link";
import React from "react";

function ToolList() {
  return (
    <div className="max-w-7xl mx-auto mt-10 p-10  shadow-sm rounded-2xl">
      <h2 className="text-2xl font-semibold text-gray-800 text-center mb-16">
        PDFtoolify – All PDF Tools
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-10 sm:gap-30 w-fit mx-auto text-gray-700">

        {/* Column 1 */}
        <ul className="flex flex-col gap-10">

          <Link href="/merge_pdf">
            <li className="flex items-center gap-2 hover:text-blue-400 transition cursor-pointer">
              <Merge className="text-blue-400" strokeWidth={0.7} /> Merge PDF
            </li>
          </Link>

          <Link href="/split_pdf">
            <li className="flex items-center gap-2 hover:text-green-400 transition cursor-pointer">
              <Split className="text-green-400" strokeWidth={0.7} /> Split PDF
            </li>
          </Link>

          <Link href="/extract_pdf">
            <li className="flex items-center gap-2 hover:text-green-400 transition cursor-pointer">
              <FileOutput className="text-green-400" strokeWidth={0.7} /> Extract Pages
            </li>
          </Link>

          <Link href="/jpg_to_pdf">
            <li className="flex items-center gap-2 hover:text-red-400 transition cursor-pointer">
              <FileImage className="text-red-400" strokeWidth={0.7} /> JPG to PDF
            </li>
          </Link>

        </ul>

        {/* Column 2 */}
        <ul className="flex flex-col gap-10">

          <Link href="/pdf_to_jpg">
            <li className="flex items-center gap-2 hover:text-red-400 transition cursor-pointer">
              <FileDown className="text-red-400" strokeWidth={0.7} /> PDF to JPG
            </li>
          </Link>

          <Link href="/compress_pdf">
            <li className="flex items-center gap-2 hover:text-blue-400 transition cursor-pointer">
              <Shrink className="text-blue-400" strokeWidth={0.7} /> Compress PDF
            </li>
          </Link>

          <Link href="/protect_pdf">
            <li className="flex items-center gap-2 hover:text-blue-400 transition cursor-pointer">
              <Shield className="text-blue-400" strokeWidth={0.7} /> Protect PDF
            </li>
          </Link>

          <Link href="/remove_pdf_pages">
            <li className="flex items-center gap-2 hover:text-green-400 transition cursor-pointer">
              <Scissors className="text-green-400" strokeWidth={0.7} /> Remove Pages
            </li>
          </Link>

        </ul>

        {/* Column 3 */}
        <ul className="flex flex-col gap-10">

          <Link href="/add_pages_to_pdf">
            <li className="flex items-center gap-2 hover:text-green-400 transition cursor-pointer">
              <FilePlus className="text-green-400" strokeWidth={0.7} /> Add Pages
            </li>
          </Link>

          <Link href="/unlock_pdf">
            <li className="flex items-center gap-2 hover:text-red-400 transition cursor-pointer">
              <LockOpen className="text-red-400" strokeWidth={0.7} /> Unlock PDF
            </li>
          </Link>

          <Link href="/word_to_pdf">
            <li className="flex items-center gap-2 hover:text-red-400 transition cursor-pointer">
              <FileType className="text-red-400" strokeWidth={0.7} /> Word to PDF
            </li>
          </Link>

          <Link href="/pdf_to_pdfa">
            <li className="flex items-center gap-2 hover:text-blue-400 transition cursor-pointer">
              <FileCheck className="text-blue-400" strokeWidth={0.7} /> PDF to PDFA
            </li>
          </Link>

        </ul>

        {/* Column 4 */}
        <ul className="flex flex-col gap-10">

          <Link href="/add_watermark">
            <li className="flex items-center gap-2 hover:text-red-400 transition cursor-pointer">
              <Brush className="text-red-400" strokeWidth={0.7} /> Add Watermark
            </li>
          </Link>

          <Link href="/add_page_no">
            <li className="flex items-center gap-2 hover:text-green-400 transition cursor-pointer">
              <Hash className="text-green-400" strokeWidth={0.7} /> Add Page Number
            </li>
          </Link>

        </ul>

      </div>
    </div>
  );
}

export default ToolList;
