import AddWaterMarkPage from "./add_watermark"
export const metadata = {
    title: "Add watermark to pdf",
    description: "Add watermark to pdf file online,easily add watermark to pdf files online",
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
