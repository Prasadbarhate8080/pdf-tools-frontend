import { Posts } from "./posts";

export const metadata = {
  title: "Blog Articles — PDFtoolify | Free Online PDF Tools",
  description:
    "PDFtoolify blogs for guide and more information about the tools.",
  alternates: { canonical: "https://www.pdftoolify.com/blogs" },
  openGraph: {
    title: "Blog Articles — PDFtoolify | Free Online PDF Tools",
    description:
      "PDFtoolify blogs for guide and more information about the tools",
    url: "https://www.pdftoolify.com/blogs",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

function page() {
  return (
    <div className="mt-24">
      <h1 className="text-3xl font-bold mx-auto container  text-foreground ">Blogs Posts</h1>
      <Posts />
    </div>
  );
}

export default page;  