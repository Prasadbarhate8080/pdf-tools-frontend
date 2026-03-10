import PageNO from "./add_page_no";
import { Posts } from '../blogs/posts'
import ToolBlog from './ToolBlog'

export const metadata = {
  title: "Add Page Numbers to PDF Online - Free Page Numbering",
  description: "Easily add page numbers to your PDF documents online. Choose position, font, and style with PDFtoolify.",
  openGraph: {
    title: "Add Page Numbers to PDF Online - PDFtoolify",
    description: "Number your PDF pages easily for better organization.",
  },
  alternates: {
    canonical: "/add_page_no",
  },
};

  
  function page() {
    return (
      <div>
        <PageNO />
        <div className="container py-20 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3">
              Add Page Numbers Blog Articles
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Learn more about organizing and numbering PDF pages
            </p>
          </div>
          <Posts toolName={"ADD_PAGE_NO"} />
        </div>
        <ToolBlog />
      </div>
    )
  }
  
  export default page
  

