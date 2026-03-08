import AddWaterMarkPage from "./add_watermark"
export const metadata = {
  title: "Add Watermark to PDF Online - Protect Your Documents",
  description: "Add custom text or image watermarks to your PDF files online. Secure your documents and prevent unauthorized use.",
  openGraph: {
    title: "Add Watermark to PDF - PDFtoolify",
    description: "Protect your PDFs with custom watermarks in seconds.",
  },
  alternates: {
    canonical: "/add_watermark",
  },
};

function page() {
  return (
    <div>
      <AddWaterMarkPage />
    </div>
  )
}

export default page
