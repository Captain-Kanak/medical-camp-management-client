import React from "react";
import Logo from "./Logo";
import { FaTwitter, FaYoutube, FaFacebook } from "react-icons/fa";

const Footer = () => {
  return (
    <section className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white mt-8 lg:mt-16 py-10">
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0 flex flex-col sm:flex-row justify-between gap-12">
        {/* Logo & Description */}
        <aside className="sm:w-1/3">
          <Logo />
          <p className="mt-4 text-gray-200 leading-relaxed">
            Welcome to <span className="font-semibold">MediCamp</span>, where
            healthcare meets compassion. Our mission is to provide accessible
            and quality medical services to all. Together, let’s create a
            healthier tomorrow.
          </p>
        </aside>

        {/* Social Links */}
        <nav className="sm:w-1/3 flex flex-col items-start sm:items-center gap-4">
          <h6 className="text-lg font-semibold mb-2 border-b border-white/30 pb-1">
            Find Us On
          </h6>
          <div className="flex gap-4">
            <a
              href="#"
              className="p-3 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-300"
              aria-label="Twitter"
            >
              <FaTwitter className="text-blue-100 text-xl" />
            </a>
            <a
              href="#"
              className="p-3 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-300"
              aria-label="YouTube"
            >
              <FaYoutube className="text-red-100 text-xl" />
            </a>
            <a
              href="#"
              className="p-3 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-300"
              aria-label="Facebook"
            >
              <FaFacebook className="text-indigo-100 text-xl" />
            </a>
          </div>
        </nav>

        {/* Quick Links */}
        <div className="sm:w-1/3 flex flex-col items-start sm:items-end gap-4">
          <h6 className="text-lg font-semibold mb-2 border-b border-white/30 pb-1">
            Quick Links
          </h6>
          <ul className="space-y-2">
            {["Home", "Available Camps", "About Us", "Contact"].map(
              (link, i) => (
                <li key={i}>
                  <a
                    href="#"
                    className="hover:text-gray-100 transition-colors duration-300"
                  >
                    {link}
                  </a>
                </li>
              )
            )}
          </ul>
        </div>
      </footer>

      {/* Bottom Copyright */}
      <div className="mt-12 text-center text-gray-200/80 text-sm">
        &copy; {new Date().getFullYear()}{" "}
        <span className="font-semibold">MediCamp</span>. All rights reserved.
      </div>
    </section>
  );
};

export default Footer;
