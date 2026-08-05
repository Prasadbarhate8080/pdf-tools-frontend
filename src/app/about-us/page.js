export const metadata = {
  title: "About Us — PDFtoolify | Free Online PDF Tools",
  description:
    "Learn about PDFtoolify: 17+ free online PDF tools to merge, split, compress and convert PDFs. No sign-up, secure by design, files deleted automatically.",
  alternates: { canonical: "https://www.pdftoolify.com/about" },
  openGraph: {
    title: "About Us — PDFtoolify | Free Online PDF Tools",
    description:
      "17+ free online PDF tools to merge, split, compress and convert PDFs. No sign-up, secure by design.",
    url: "https://www.pdftoolify.com/about",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

const stats = [
  { value: "17+", label: "PDF Tools" },
  { value: "100%", label: "Free to Use" },
  { value: "0", label: "Files Stored" },
  { value: "No", label: "Sign-up Needed" },
];

const values = [
  {
    title: "Privacy First",
    body: "We never store your documents. Files are removed automatically once your task is complete, so nothing lingers on our servers.",
  },
  {
    title: "Genuinely Free",
    body: "Every essential tool is free to use. No trials, no watermarks on your work, no locked features hiding behind a paywall.",
  },
  {
    title: "Simple by Design",
    body: "Upload, click, download. Each tool does one job clearly, so anyone can finish a PDF task in seconds without a manual.",
  },
  {
    title: "Works Everywhere",
    body: "Everything runs in your browser on desktop, tablet or mobile — plus apps for Windows and Android are comming.",
  },
];

const missionPoints = [
  "Keep every essential tool free and accessible",
  "Protect user privacy by never keeping files",
  "Deliver results in seconds, not minutes",
  "Keep adding the tools our users ask for",
];

const tools = [
  "Merge PDF",
  "Split PDF",
  "Compress PDF",
  "Extract Pages",
  "JPG to PDF",
  "PDF to JPG",
  "Word to PDF",
  "PNG to PDF",
  "Protect PDF",
  "Unlock PDF",
  "Add Watermark",
  "Add Page Numbers",
  "Add Pages to PDF",
  "Remove Pages",
  "PDF to PDF/A",
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-white text-slate-900">
      {/* Hero */}
      <section className="mx-auto max-w-5xl px-6 pt-20 pb-14 text-center sm:pt-28">
        <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-1.5 text-sm font-medium text-blue-600 shadow-sm">
          About PDFtoolify
        </span>
        <h1 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-6xl">
          PDF work should be{" "}
          <span className="bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent">
            simple and free.
          </span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
          PDFtoolify is a free online PDF tools software that brings every PDF task at  one Place
          like merge, split, compress, convert, protect, and more.
          No accounts, no install, np cost
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <a
            href="/#tools"
            className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-90"
          >
            Explore All PDF Tools
          </a>
          <a
            href="/"
            className="rounded-lg border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-50"
          >
            Back to Home
          </a>
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto max-w-5xl px-6">
        <dl className="grid grid-cols-2 gap-4 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <dt className="text-3xl font-extrabold text-blue-600">{s.value}</dt>
              <dd className="mt-1 text-sm text-slate-600">{s.label}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Story + Mission */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <div className="grid gap-10 md:grid-cols-2 md:items-start">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Our Story</h2>
            <p className="mt-4 text-slate-600">
              PDFtoolify started with a small problem: There are lots of PDF editors are online
              but everyone is trying to give there best but still we found the problem related to 
              pdf operations like add pages to pdf and some more features and thats how we started.
            </p>
            <p className="mt-4 text-slate-600">
              Today PDFtoolify offers more than seventeen focused tools used by students,
              freelancers, teachers and office teams around the world. Each one is built to
              be fast, dependable and safe with the documents you trust us with.
            </p>
          </div>
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Our Mission</h2>
            <p className="mt-4 text-slate-600">
              To make working with PDF documents effortless for everyone, regardless of
              budget, device or technical skill.
            </p>
            <ul className="mt-6 space-y-3">
              {missionPoints.map((item) => (
                <li key={item} className="flex gap-3 text-sm text-slate-800">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-blue-600" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <h2 className="text-center text-3xl font-bold tracking-tight">
            What We Stand For
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-slate-600">
            The principles behind every tool we ship.
          </p>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {values.map((v) => (
              <article
                key={v.title}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-7 transition-shadow hover:shadow-md"
              >
                <h3 className="text-lg font-semibold">{v.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{v.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Tools */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <h2 className="text-3xl font-bold tracking-tight">Everything In One Place</h2>
        <p className="mt-3 max-w-2xl text-slate-600">
          A growing collection of tools that cover the full life of a PDF document.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          {tools.map((t) => (
            <span
              key={t}
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700"
            >
              {t}
            </span>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-5xl px-6 pb-24">
        <div className="rounded-3xl bg-blue-600 px-8 py-14 text-center shadow-sm">
          <h2 className="text-3xl font-bold tracking-tight text-white">
            Ready to simplify your PDFs?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-blue-100">
            Pick a tool and get your document sorted in seconds — free, secure and with no
            sign-up.
          </p>
          <a
            href="/#tools"
            className="mt-8 inline-block rounded-lg bg-white px-6 py-3 text-sm font-semibold text-blue-600 transition-colors hover:bg-slate-100"
          >
            Start Using PDFtoolify
          </a>
        </div>
      </section>
    </main>
  );
}
