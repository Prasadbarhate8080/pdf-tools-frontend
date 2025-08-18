import PageNO from "./add_page_no";

export const metadata = {
    title: "Add page number to pdf",
    description: "Add page number to pdf files online,easily add watermark to pdf file online",
    alternates: {
    canonical: "/add_page_no",
  },
  };

  
  function page() {
    return (
      <div>
        <PageNO />
      </div>
    )
  }
  
  export default page
  

