import {
  Merge,
  Split,
  FileImage,
  FileDown,
  Scissors,
  Shield,
  LockOpen,
  FileType,
  FilePlus,
  FileCheck,
  Brush,
  Hash,
  Shrink,
  FileOutput,
} from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function ToolList() {
  return (
    <div className="max-w-7xl mx-auto mt-10 p-10  shadow-sm rounded-2xl">
      <h2 className="text-2xl font-semibold text-gray-800 text-center mb-16">
        PDFtoolify – All PDF Tools
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-10 sm:gap-30 w-fit mx-auto text-gray-700">
        {/* Column 1 */}
        <ul className="flex flex-col gap-10">
          <li className="flex items-center gap-2 hover:text-blue-400 transition cursor-pointer">
            <Link href="/merge_pdf">
              <Merge className="text-blue-400" strokeWidth={0.7} /> Merge PDF
            </Link>
          </li>

          <li className="flex items-center gap-2 hover:text-green-400 transition cursor-pointer">
            <Link href="/split_pdf">
              <Split className="text-green-400" strokeWidth={0.7} /> Split PDF
            </Link>
          </li>

          <li className="flex items-center gap-2 hover:text-green-400 transition cursor-pointer">
            <Link href="/extract_pdf">
              <FileOutput className="text-green-400" strokeWidth={0.7} /> Extract Pages
            </Link>
          </li>

          <li className="flex items-center gap-2 hover:text-red-400 transition cursor-pointer">
            <Link href="/jpg_to_pdf">
              <FileImage className="text-red-400" strokeWidth={0.7} /> JPG to PDF
            </Link>
          </li>
        </ul>

        {/* Column 2 */}
        <ul className="flex flex-col gap-10">
          <li className="flex items-center gap-2 hover:text-red-400 transition cursor-pointer">
            <Link href="/pdf_to_jpg">
              <FileDown className="text-red-400" strokeWidth={0.7} /> PDF to JPG
            </Link>
          </li>

          <li className="flex items-center gap-2 hover:text-blue-400 transition cursor-pointer">
            <Link href="/compress_pdf">
              <Shrink className="text-blue-400" strokeWidth={0.7} /> Compress PDF
            </Link>
          </li>

            <li className="flex items-center gap-2 hover:text-blue-400 transition cursor-pointer">
          <Link href="/protect_pdf">
              <Shield className="text-blue-400" strokeWidth={0.7} /> Protect PDF
          </Link>
            </li>

            <li className="flex items-center gap-2 hover:text-green-400 transition cursor-pointer">
          <Link href="/remove_pdf_pages">
              <Scissors className="text-green-400" strokeWidth={0.7} /> Remove Pages
          </Link>
            </li>
        </ul>

        {/* Column 3 */}
        <ul className="flex flex-col gap-10">
            <li className="flex items-center gap-2 hover:text-green-400 transition cursor-pointer">
          <Link href="/add_pages_to_pdf">
              <FilePlus className="text-green-400" strokeWidth={0.7} /> Add Pages
          </Link>
            </li>

            <li className="flex items-center gap-2 hover:text-red-400 transition cursor-pointer">
          <Link href="/unlock_pdf">
              <LockOpen className="text-red-400" strokeWidth={0.7} /> Unlock PDF
          </Link>
            </li>

            <li className="flex items-center gap-2 hover:text-red-400 transition cursor-pointer">
          <Link href="/word_to_pdf">
              <FileType className="text-red-400" strokeWidth={0.7} /> Word to PDF
          </Link>
            </li>

            <li className="flex items-center gap-2 hover:text-blue-400 transition cursor-pointer">
          <Link href="/pdf_to_pdfa">
              <FileCheck className="text-blue-400" strokeWidth={0.7} /> PDF to PDFA
          </Link>
            </li>
        </ul>

        {/* Column 4 */}
        <ul className="flex flex-col gap-10">
            <li className="flex items-center gap-2 hover:text-red-400 transition cursor-pointer">
          <Link href="/add_watermark">
              <Brush className="text-red-400" strokeWidth={0.7} /> Add Watermark
          </Link>
            </li>

            <li className="flex items-center gap-2 hover:text-green-400 transition cursor-pointer">
          <Link href="/add_page_no">
              <Hash className="text-green-400" strokeWidth={0.7} /> Add Page Number
          </Link>
            </li>
        </ul>
      </div>
    </div>
  )
}

export default ToolList
