import AddWaterMarkPage from "./add_watermark"
import { Posts } from '../blogs/posts'
import ToolBlog from './ToolBlog'
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
      <div className="container py-20 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3">
            Add Watermark Blog Articles
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Learn more about watermarking and protecting PDFs
          </p>
        </div>
        <Posts toolName={"ADD_WATERMARK"} />
      </div>
      <ToolBlog />
    </div>
  )
}

export default page
