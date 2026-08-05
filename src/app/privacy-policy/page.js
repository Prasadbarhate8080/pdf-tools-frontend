import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | PDFToolify",
  description:
    "Learn how PDFToolify collects, uses, and protects your information when you use our online PDF tools.",
  openGraph: {
    title: "Privacy Policy | PDFToolify",
    description:
      "Learn how PDFToolify collects, uses, and protects your information when you use our online PDF tools.",
    type: "website",
    url: "https://pdftoolify.com/privacy-policy",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | PDFToolify",
    description:
      "Learn how PDFToolify collects, uses, and protects your information when you use our online PDF tools.",
  },
  alternates: {
    canonical: "https://pdftoolify.com/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-white py-16 px-4 sm:px-6 lg:px-8">
      <article className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Privacy Policy
        </h1>
        <p className="mt-4 text-sm text-gray-500">
          Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
        </p>

        <div className="mt-8 space-y-8 text-gray-700">
          <section>
            <p>
              This page is maintained by <strong>PDFToolify</strong> to answer common privacy questions about pdftoolify.com and the online PDF tools we provide.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">1. Information we collect</h2>
            <p className="mt-3">
              We collect only the information needed to operate and improve the service:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>
                <strong>Usage data:</strong> Pages visited, features used, device type, browser, and approximate location (country/region) via standard analytics.
              </li>
              <li>
                <strong>Uploaded files:</strong> PDFs you upload are processed temporarily to perform the requested operation. They are not used for training, profiling, or marketing.
              </li>
              <li>
                <strong>Contact information:</strong> If you email us or use a contact form, we receive the information you choose to send.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">2. How we use your information</h2>
            <p className="mt-3">We use the information we collect to:</p>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>Provide, maintain, and improve the PDF tools.</li>
              <li>Diagnose technical issues and monitor service performance.</li>
              <li>Respond to support requests and questions.</li>
              <li>Understand aggregate usage patterns.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">3. File handling and retention</h2>
            <p className="mt-3">
              Files uploaded to PDFToolify are processed in memory and automatically deleted shortly after processing completes. We do not store uploaded documents.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">4. Cookies and analytics</h2>
            <p className="mt-3">
              We are not using any cookies right now.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">5. Third-party services</h2>
            <p className="mt-3">
              We may rely on trusted third-party providers for hosting, analytics, and error monitoring. These providers only receive the information necessary to perform their services and are contractually bound to handle it securely.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">6. Data security</h2>
            <p className="mt-3">
              We do not shares your data with any other and no guarantee to unauthorized access. No online service can guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">8. Your choices</h2>
            <p className="mt-3">
              You can contact us to ask about the information we hold, request corrections, or request deletion. We will respond to reasonable requests in accordance with applicable law.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">9. Changes to this policy</h2>
            <p className="mt-3">
              We may update this Privacy Policy from time to time. When we do, we will revise the &quot;Last updated&quot; date at the top of the page. Continued use of the service after changes means you accept the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">10. Contact us</h2>
            <p className="mt-3">
              If you have questions about this Privacy Policy or how we handle your data, please contact us at{" "}
              <Link
                href="mailto:support@pdftoolify.com"
                className="font-medium text-blue-600 hover:underline"
              >
                support@pdftoolify.com
              </Link>
              .
            </p>
          </section>
        </div>

        <div className="mt-12 border-t border-gray-200 pt-8">
          <Link
            href="/"
            className="text-sm font-medium text-blue-600 hover:underline"
          >
            &larr; Back to home
          </Link>
        </div>
      </article>
    </main>
  );
}
