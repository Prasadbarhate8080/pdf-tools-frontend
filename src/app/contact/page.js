import React from 'react';

export const metadata = {
    title: "About",
    description: "About PDFtoolify fast and secure pdf tool",
    alternates: {
    canonical: "/contact",
  },
  };
  


const Contact = () => {
  return (
    <div className="bg-white min-h-screen">
    <div className="max-w-2xl mx-auto p-6 text-gray-800 text-center">
      <h1 className="text-3xl font-bold mb-4">Contact</h1>
      <p className="text-lg">
        We currently do not offer direct contact or support through this website.
      </p>
      <p className="mt-4 text-gray-600">
        If you have feedback or face any issues, please stay tuned – support options may be added in the future.
      </p>
    </div>
    </div>
  );
};

export default Contact;
