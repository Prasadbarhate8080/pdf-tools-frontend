import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-3xl mx-auto p-6 min-h-screen   text-gray-800 ">
        <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-sm text-gray-500 mb-6">
          Last Updated: April 23, 2025
        </p>

        <p className="mb-4">We respect your privacy.</p>

        <ul className="list-disc list-inside space-y-2 mb-4">
          <li>
            We <strong>do not collect any personal information</strong>.
          </li>
          <li>
            Files you upload (PDFs, images, etc.) are{" "}
            <strong>only used to perform the selected operation</strong> (like
            merge, split, convert, etc.).
          </li>
          <li>
            <strong>All files are deleted automatically</strong> after
            processing is complete.
          </li>
          <li>
            We <strong>do not use any third-party services</strong> or APIs that
            access your files or data.
          </li>
          <li>Your data stays private and secure throughout the process.</li>
        </ul>

        <p>By using this website, you agree to this privacy policy.</p>
      </div>{" "}
    </div>
  );
};

export default PrivacyPolicy;
