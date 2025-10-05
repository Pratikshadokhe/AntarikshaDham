import React from "react";
import { FaTwitter, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#020214] text-gray-400 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8">

        {/* About Section */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-3">Space Explorer</h3>
          <p className="text-gray-400 text-sm">
            A project inspired by NASA challenges to showcase space missions, habitat research, and astronaut life. Explore the universe from your screen.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-3">Quick Links</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li><a href="#" className="hover:text-white transition">Home</a></li>
            <li><a href="#" className="hover:text-white transition">Experiments</a></li>
            <li><a href="#" className="hover:text-white transition">News</a></li>
            <li><a href="#" className="hover:text-white transition">About</a></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-3">Resources</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li><a href="#" className="hover:text-white transition">NASA Official</a></li>
            <li><a href="#" className="hover:text-white transition">ESA Space Portal</a></li>
            <li><a href="#" className="hover:text-white transition">SpaceX Missions</a></li>
            <li><a href="#" className="hover:text-white transition">Space News</a></li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-3">Follow Us</h3>
          <div className="flex space-x-4 mt-2">
            <a href="https://twitter.com" target="_blank" className="hover:text-cyan-400 transition">
              <FaTwitter size={20} />
            </a>
            <a href="https://github.com" target="_blank" className="hover:text-cyan-400 transition">
              <FaGithub size={20} />
            </a>
            <a href="https://instagram.com" target="_blank" className="hover:text-cyan-400 transition">
              <FaInstagram size={20} />
            </a>
            <a href="https://linkedin.com" target="_blank" className="hover:text-cyan-400 transition">
              <FaLinkedin size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="mt-12 border-t border-gray-700 pt-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Space Explorer — NASA Challenge. All rights reserved.
      </div>
    </footer>
  );
}
