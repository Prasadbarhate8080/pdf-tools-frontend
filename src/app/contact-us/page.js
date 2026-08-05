import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: "Contact Us — PDFtoolify | Free Online PDF Tools",
  description:
    "Get in touch with the PDFtoolify team. Ask a question, report a bug, request a new PDF tool or send us feedback — we reply within 24-48 hours.",
  alternates: { canonical: "https://www.pdftoolify.com/contact" },
  openGraph: {
    title: "Contact Us — PDFtoolify | Free Online PDF Tools",
    description:
      "Get in touch with the PDFtoolify team. Questions, bug reports, tool requests and feedback are all welcome.",
    type: "website",
    url: "https://www.pdftoolify.com/contact",
  },
  twitter: { card: "summary_large_image" },
};

const reasons = [
  {
    title: "Report a Problem",
    body: "A tool did not work as expected? Tell us what happened and we will look into it right away.",
  },
  {
    title: "Request a Tool",
    body: "Need a PDF feature we do not offer yet? Many of our tools started as a user suggestion.",
  },
  {
    title: "Business & Partnerships",
    body: "Advertising, integrations or collaboration ideas — we are happy to talk.",
  },
  {
    title: "General Feedback",
    body: "Ideas on how to make PDFtoolify faster, clearer or more useful are always welcome.",
  },
];

const faqs = [
  {
    q: "Are the tools really free?",
    a: "Yes. Every tool on PDFtoolify is free, with no sign-up and no watermarks on your files.",
  },
  {
    q: "Do you store my documents?",
    a: "No. Files are processed and removed automatically from the servers",
  },
  {
    q: "How fast do you reply?",
    a: "We usually respond within 24-48 hours on business days.",
  },
];

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <section className="mx-auto max-w-5xl px-6 pt-20 pb-14 text-center sm:pt-28">
        <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-1.5 text-sm font-medium text-blue-600 shadow-sm">
          Contact PDFtoolify
        </span>
        <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl">
          We would love to{" "}
          <span className="bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent">
            hear from you.
          </span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
          Questions, bug reports, tool requests or partnership ideas — send us a
          message and a real person will connect with you.
        </p>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-20">
        <div className="grid gap-10 md:grid-cols-5">
          <div className="md:col-span-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                Send a Message
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Fill in the form below and we will reply to your email address.
              </p>
              <ContactForm />
            </div>
          </div>

          <div className="md:col-span-2 space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900">Email Us</h3>
              <p className="mt-2 text-sm text-slate-600">
                Prefer email? Write to us directly:
              </p>
              <a
                href="mailto:support@pdftoolify.com"
                className="mt-3 inline-block text-sm font-semibold text-blue-600 hover:underline"
              >
                support@pdftoolify.com
              </a>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900">
                Response Time
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                We typically reply within 24-48 hours on business days.
              </p>
            </div>

            <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-sky-500 p-7 shadow-sm">
              <h3 className="text-lg font-semibold text-white">
                Looking for a tool?
              </h3>
              <p className="mt-2 text-sm text-white/80">
                Browse all 17+ free PDF tools before you write in.
              </p>
              <a
                href="/#tools"
                className="mt-4 inline-block rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-blue-600 transition-colors hover:bg-slate-100"
              >
                Explore Tools
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <h2 className="text-center text-3xl font-bold tracking-tight text-slate-900">
            What Can We Help With?
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {reasons.map((r) => (
              <article
                key={r.title}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-7 transition-shadow hover:shadow-md"
              >
                <h3 className="text-lg font-semibold text-slate-900">{r.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{r.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-20">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900">
          Quick Answers
        </h2>
        <div className="mt-8 space-y-4">
          {faqs.map((f) => (
            <div
              key={f.q}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <h3 className="font-semibold text-slate-900">{f.q}</h3>
              <p className="mt-2 text-sm text-slate-600">{f.a}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
