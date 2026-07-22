import {
  Download,
  GitMerge,
  Infinity as InfinityIcon,
  Upload,
  Workflow,
  FilePlus,
  MousePointerClick,
  Zap,
  Droplet,
  Sparkles,
  SplitSquareHorizontal,
  FileCheck2,
  Scissors,
  FileType2,
  KeyRound,
} from "lucide-react"
export const mergePDFHowTosteps = [
  {
    icon: Upload,
    step: '1',
    title: 'Select PDF Files',
    description: 'Select files or drag and drop your PDF files into the upload area.',
  },
  {
    icon: GitMerge,
    step: '2',
    title: 'Merge PDF Files',
    description: 'Arrange them in order and click the Merge PDF button to combine.',
  },
  {
    icon: Download,
    step: '3',
    title: 'Download Merged PDF',
    description: 'Download your merged PDF file instantly — fast and free.',
  },
]

export const addPageNumbersHowToSteps = [
  {
    icon: Upload,
    step: "1",
    title: "Upload your PDF",
    description:
      "Select a PDF from your device or drag and drop it into the upload area.",
  },
  {
    icon:Workflow,
    step: "2",
    title: "Choose page number position",
    description:
      "Select where you want the page numbers to appear (top or bottom, left, center, or right).",
  },
  {
    icon: Download,
    step: "3",
    title: "Apply and download",
    description:
      "Click on “Add Page Numbers” and download your updated PDF instantly.",
  },
]

export const addPagesHowToSteps = [
  {
    icon: Upload,
    step: "1",
    title: "Upload your PDF",
    description:
      "Select a PDF from your device or drag and drop it into the upload area.",
  },
  {
    icon:Workflow,
    step: "2",
    title: "Insert new pages",
    description:
      "Use the plus buttons to insert blank pages or image pages exactly where you need them.",
  },
  {
    icon: Download,
    step: "3",
    title: "Export and download",
    description:
      "Click on “Export PDF” to generate your updated file and download it instantly.",
  },
]

export const addPdfInPdfHowToSteps = [
  {
    icon: FilePlus,
    step: "1",
    title: "Upload your main PDF",
    description:
      "Select the primary PDF where you want to insert additional pages.",
  },
  {
    icon: MousePointerClick,
    step: "2",
    title: "Choose insert position",
    description:
      "Pick the page number where the new PDF should be inserted.",
  },
  {
    icon: Zap,
    step: "3",
    title: "Select and insert PDF",
    description:
      "Upload the second PDF, insert it, and download your final merged document.",
  },
]

export const addWatermarkHowToSteps = [
  {
    icon: Upload,
    step: "1",
    title: "Upload PDF",
    description: "Select a PDF file or drag and drop it into the upload area.",
  },
  {
    icon: Droplet,
    step: "2",
    title: "Customize Watermark",
    description: "Set text, opacity, rotation, and position to fit your style.",
  },
  {
    icon: Download,
    step: "3",
    title: "Download PDF",
    description: "Get your watermark-added PDF instantly — fast and free.",
  },
]

export const compressPdfHowToSteps = [
  {
    icon: Sparkles,
    step: "1",
    title: "Upload PDF",
    description: "Select a PDF file or drag and drop it into the upload area.",
  },
  {
    icon: Sparkles,
    step: "2",
    title: "Compress File",
    description: "Click the compress button to reduce file size instantly.",
  },
  {
    icon: Sparkles,
    step: "3",
    title: "Download PDF",
    description: "Download the compressed PDF right away — fast and free.",
  },
]

export const createPdfHowToSteps = [
  {
    icon: Sparkles,
    step: "1",
    title: "Upload your images",
    description:
      "Select JPG, PNG, or WEBP images from your device or drag and drop them into the upload area.",
  },
  {
    icon: Sparkles,
    step: "2",
    title: "Create your PDF",
    description:
      "Click on “Create PDF” to convert your selected images into a single PDF file.",
  },
  {
    icon: Sparkles,
    step: "3",
    title: "Download created PDF",
    description:
      "Download your new PDF instantly and use it for sharing, printing, or archiving.",
  },
]

export const extractPdfHowToSteps = [
  {
    icon: Sparkles,
    step: "1",
    title: "Upload your PDF file",
    description: "Select a PDF from your device or drag and drop it into the upload area.",
  },
  {
    icon: Sparkles,
    step: "2",
    title: "Select pages to extract",
    description: "Click on the pages you want to extract. You can choose one or multiple pages.",
  },
  {
    icon: Sparkles,
    step: "3",
    title: "Extract & download pages",
    description: "Click on “Extract pages” and instantly download your new PDF with selected pages.",
  },
]

export const jpgToPdfHowToSteps = [
  {
    icon: Sparkles,
    step: "1",
    title: "Upload your images",
    description:
      "Select JPG, PNG, or JPEG images from your device or drag and drop them into the upload area.",
  },
  {
    icon: Sparkles,
    step: "2",
    title: "Arrange & create PDF",
    description:
      "Review your images, then click on the Create PDF button to convert them into a single PDF file.",
  },
  {
    icon: Sparkles,
    step: "3",
    title: "Download your PDF",
    description:
      "Download the generated PDF instantly and share or store it anywhere you like.",
  },
]

export const pdfToJpgHowToSteps = [
  {
    icon: Upload,
    step: "1",
    title: "Upload PDF",
    description: "Select a PDF file or drag and drop it into the upload area.",
  },
  {
    icon: SplitSquareHorizontal,
    step: "2",
    title: "Convert Pages",
    description: "Click convert to turn each PDF page into a JPG image.",
  },
  {
    icon: Download,
    step: "3",
    title: "Download JPGs",
    description: "Download a ZIP file containing all your JPG images.",
  },
]

export const pdfToPdfaHowToSteps = [
  {
    icon: Upload,
    step: "1",
    title: "Upload PDF",
    description: "Select the PDF file you want to convert to PDF/A.",
  },
  {
    icon: FileCheck2,
    step: "2",
    title: "Convert to PDF/A",
    description: "Click convert to generate a compliant PDF/A document.",
  },
  {
    icon: Download,
    step: "3",
    title: "Download File",
    description: "Download your PDF/A file instantly — fast and free.",
  },
]

export const protectPdfHowToSteps = [
  {
    icon: Sparkles,
    step: "1",
    title: "Upload your PDF file",
    description:
      "Select a PDF from your device or drag and drop it into the upload area.",
  },
  {
    icon: Sparkles,
    step: "2",
    title: "Set a strong password",
    description:
      "Enter a secure password to lock your PDF and prevent unauthorized access.",
  },
  {
    icon: Sparkles,
    step: "3",
    title: "Protect & download PDF",
    description:
      "Click on “Protect PDF” and download your newly encrypted, password-protected file.",
  },
]

export const removePdfPagesHowToSteps = [
  {
    icon: Upload,
    step: '1',
    title: 'Upload PDF',
    description: 'Select a PDF file or drag and drop it into the upload area.',
  },
  {
    icon: Scissors,
    step: '2',
    title: 'Select Pages',
    description: 'Click the pages you want to remove from the document.',
  },
  {
    icon: Download,
    step: '3',
    title: 'Download PDF',
    description: 'Get your cleaned PDF instantly — fast and free.',
  },
]

export const splitPdfHowToSteps = [
  {
    icon: Upload,
    step: '1',
    title: 'Upload your PDF',
    description: 'Select or drag and drop the PDF file you want to split.',
  },
  {
    icon: Scissors,
    step: '2',
    title: 'Choose pages to split',
    description: 'Select specific pages or page ranges that you want to extract.',
  },
  {
    icon: Download,
    step: '3',
    title: 'Download split files',
    description: 'Download the extracted pages or separated PDF files instantly.',
  },
]

export const pngToPdfHowToSteps = [
  {
    icon: Sparkles,
    step: '1',
    title: 'Upload your PNG images',
    description: 'Select PNG images from your device or drag and drop them into the upload area.',
  },
  {
    icon: Sparkles,
    step: '2',
    title: 'Convert to PDF',
    description: 'Click on the Create PDF button to convert your PNG images into a single PDF file.',
  },
  {
    icon: Sparkles,
    step: '3',
    title: 'Download your PDF',
    description: 'Download the created PDF instantly and use it for sharing, printing, or storing.',
  },
]

export const wordToPdfHowToSteps = [
  {
    icon: Upload,
    step: '1',
    title: 'Upload Word File',
    description: 'Select a DOC or DOCX file from your device.',
  },
  {
    icon: FileType2,
    step: '2',
    title: 'Convert to PDF',
    description: 'Click convert to generate a high-quality PDF.',
  },
  {
    icon: Download,
    step: '3',
    title: 'Download PDF',
    description: 'Get your converted PDF instantly — fast and free.',
  },
]

export const unlockPdfHowToSteps = [
  {
    icon: Upload,
    step: '1',
    title: 'Upload Locked PDF',
    description: 'Select the password-protected PDF or drag and drop it here.',
  },
  {
    icon: KeyRound,
    step: '2',
    title: 'Unlock the File',
    description: 'Click unlock to remove password protection instantly.',
  },
  {
    icon: Download,
    step: '3',
    title: 'Download PDF',
    description: 'Get your unlocked PDF file right away — fast and free.',
  },
];