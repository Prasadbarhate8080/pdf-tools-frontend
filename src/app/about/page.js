import React from "react";

export const metadata = {
    title: "About",
    description: "About ",
    alternates: {
    canonical: "/about",
  },
  };

const Page = () => {
  return (
    <div className="bg-white min-h-screen">
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-8 text-orange-700">About Us</h1>

      <section className="mb-8">
        <p className="text-lg text-gray-700 mb-4">
          Welcome to <strong>Your PDF Tools</strong> – your all-in-one solution for smart, fast, and secure PDF tools online.
        </p>
        <p className="text-lg text-gray-700">
          Whether you need to merge, split, convert, or compress PDFs, we’ve got you covered – no signup required, and completely free to use.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-orange-600">🔧 What We Offer</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>📎 Merge PDFs</li>
          <li>✂️ Split PDFs</li>
          <li>🖼️ JPG to PDF</li>
          <li>📄 PDF Page Extractor</li>
          <li>📝 Add Text or Watermark (coming soon!)</li>
          <li>🔄 Word to PDF, PDF to Word (coming soon!)</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-orange-600">🔐 Privacy First</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>We never save your files.</li>
          <li>Encrypted and secure HTTPS connections.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-orange-600">🚀 Why Choose Us?</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>✅ No signup needed</li>
          <li>⚡ Fast and efficient processing</li>
          <li>🔒 Safe and secure handling</li>
          <li>📱 Mobile-friendly interface</li>
          <li>🛠️ Continuously evolving tools</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-orange-600">👨‍💻 Who We Are</h2>
        <p className="text-gray-700">
          We are a team of developers passionate about building simple and efficient solutions. Our goal is to make handling PDFs easy for everyone.
        </p>
      </section>

      
    </div>
    </div>
  );
};

export default Page;
