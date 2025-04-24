"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

function Footer() {
  return (
    <footer className="bg-[#E2E8F0] text-[#374151] w-full mt-5">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between gap-10">
        {/* Logo & About */}
        <div className="flex flex-col flex-1 min-w-[200px]">
          <Image
            src="/footer_logo.png"
            height={50}
            width={180}
            alt="All in One PDF Logo"
            className="mb-4"
          />
          <p className="text-sm">
            Your all-in-one solution for working with PDFs. Simple, Fast, and Free.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col flex-1 w-fit">
          <h3 className="text-lg font-semibold text-[#1E293B] mb-3 w-fit">Quick Links</h3>
          <Link href="/privacy" className="hover:text-[#3B82F6] w-fit mb-1 transition">Privacy Policy</Link>
          <Link href="/contact" className="hover:text-[#3B82F6] w-fit mb-1 transition">Contact</Link>
          <Link href="/about" className="hover:text-[#3B82F6] w-fit mb-1 transition">About Us</Link>
        </div>

        {/* Contact Info / Socials */}
        <div className="flex flex-col  flex-1 min-w-[200px]">
          <h3 className="text-lg font-semibold text-[#1E293B] mb-3">Get in Touch</h3>
          {/* <p className="text-sm mb-2">📧 support@yourdomain.com</p> */}
          <div className="flex gap-4">
            <a href="#" className="hover:text-[#3B82F6] transition">Twitter</a>
            <a href="#" className="hover:text-[#6366F1] transition">LinkedIn</a>
          </div>
        </div>
      </div>

      {/* Bottom Strip */}
      <div className="bg-[#CBD5E1] text-center py-3 text-sm border-t border-gray-300 text-[#374151]">
        © {new Date().getFullYear()} All in One PDF ® — Built with ❤️ to simplify your PDFs
      </div>
    </footer>
  );
}

export default Footer;
