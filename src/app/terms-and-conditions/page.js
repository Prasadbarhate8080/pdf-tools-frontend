// app/terms-and-conditions/page.js
import Link from "next/link";

export const metadata = {
  title: "Terms and Conditions | PDFToolify",
  description:
    "Read the terms and conditions for using PDFToolify's online PDF tools and services.",
  openGraph: {
    title: "Terms and Conditions | PDFToolify",
    description:
      "Read the terms and conditions for using PDFToolify's online PDF tools and services.",
    type: "website",
    url: "https://pdftoolify.com/terms-and-conditions",
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms and Conditions | PDFToolify",
    description:
      "Read the terms and conditions for using PDFToolify's online PDF tools and services.",
  },
  alternates: {
    canonical: "https://pdftoolify.com/terms-and-conditions",
  },
};

export default function TermsAndConditionsPage() {
  return (
    <main className="min-h-screen bg-white py-16 px-4 sm:px-6 lg:px-8">
      <article className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Terms and Conditions
        </h1>
        <p className="mt-4 text-sm text-gray-500">
          Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
        </p>

        <div className="mt-8 space-y-8 text-gray-700">
          <section>
            <p>
              These Terms and Conditions govern your use of{" "}
              <strong>pdftoolify.com</strong> and the online PDF tools provided
              by <strong>PDFToolify</strong>. By accessing or using the service,
              you agree to these terms. If you do not agree, please do not use
              the service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">1. Use of service</h2>
            <p className="mt-3">
              PDFToolify provides free and paid online tools for viewing,
              converting, compressing, merging, splitting, and editing PDF
              files. You may use the service only for lawful purposes and in a
              way that does not infringe the rights of others or restrict their
              use of the service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">2. User responsibilities</h2>
            <p className="mt-3">You agree that you will not:</p>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>Upload files that contain malware, viruses, or harmful code.</li>
              <li>Use the service to process illegal, infringing, or unauthorized content.</li>
              <li>Attempt to gain unauthorized access to our systems or networks.</li>
              <li>Automate access to the service in a way that places excessive load on our infrastructure.</li>
              <li>Reverse engineer, decompile, or extract source code from the service.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">3. Uploaded files</h2>
            <p className="mt-3">
              Files you upload are processed temporarily to deliver the
              requested output. We do not claim ownership of your files.
              However, you are solely responsible for the content you upload
              and for ensuring you have the right to use, modify, and process it.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">5. Intellectual property</h2>
            <p className="mt-3">
              The PDFToolify name, logo, website design, and software are owned
              by PDFToolify or its licensors. These terms do not grant you any
              right to use our trademarks or branding without prior written
              permission.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">6. Disclaimer of warranties</h2>
            <p className="mt-3">
              The service is provided &quot;as is&quot; and &quot;as available&quot; without
              warranties of any kind. We do not guarantee that the service will
              be uninterrupted, error-free, or suitable for your specific
              purpose. Use the service at your own risk.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">7. Limitation of liability</h2>
            <p className="mt-3">
              To the fullest extent permitted by law, PDFToolify shall not be
              liable for any indirect, incidental, special, consequential, or
              punitive damages arising out of or related to your use of the
              service, including loss of data or profits.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">8. Termination</h2>
            <p className="mt-3">
              We may suspend or terminate your access to the service at any
              time, with or without notice, if we believe you have violated these
              terms or engaged in harmful conduct.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">9. Changes to these terms</h2>
            <p className="mt-3">
              We may update these Terms and Conditions from time to time. The
              updated version will be posted on this page with a revised
              &quot;Last updated&quot; date. Continued use of the service after changes
              means you accept the updated terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">10. Governing law</h2>
            <p className="mt-3">
              These terms are governed by the laws of the jurisdiction where
              PDFToolify operates. Any disputes will be resolved in the courts of
              that jurisdiction.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">11. Contact us</h2>
            <p className="mt-3">
              If you have questions about these Terms and Conditions, please
              contact us at{" "}
              <a
                href="mailto:support@pdftoolify.com"
                className="font-medium text-blue-600 hover:underline"
              >
                support@pdftoolify.com
              </a>
              .
            </p>
          </section>

          <section className="rounded-md bg-gray-50 p-4 text-sm text-gray-600">
            <p>
              <strong>Legal notice:</strong> This page is provided by
              PDFToolify as a description of our current practices and is not
              a substitute for professional legal advice. If you need terms
              tailored to your business or jurisdiction, please consult a
              qualified attorney.
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
