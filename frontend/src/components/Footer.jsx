// src/components/Footer.jsx
import { Link } from "react-router-dom";
import { GiWheat } from "react-icons/gi";
import { FaFacebook, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-green-900 text-green-100 mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-4 gap-8">
        {/* Brand */}
        <div className="col-span-1">
          <div className="flex items-center gap-2 text-white font-bold text-lg mb-3">
            <GiWheat className="text-2xl text-green-300" />
            কৃষি সেবা
          </div>
          <p className="text-sm text-green-300 leading-relaxed">
            কৃষকদের সমস্যা সমাধান এবং কৃষি পণ্য কেনাবেচার সেরা প্ল্যাটফর্ম।
          </p>
          <div className="flex gap-3 mt-4">
            <FaFacebook className="text-xl hover:text-white cursor-pointer transition-colors" />
            <FaTwitter className="text-xl hover:text-white cursor-pointer transition-colors" />
            <FaYoutube className="text-xl hover:text-white cursor-pointer transition-colors" />
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold text-white mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm text-green-300">
            {[["Home", "/"], ["About", "/about"], ["Crop Tips", "/crop-tips"], ["Marketplace", "/marketplace"]].map(([label, path]) => (
              <li key={path}>
                <Link to={path} className="hover:text-white transition-colors">{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* For Users */}
        <div>
          <h4 className="font-semibold text-white mb-3">For Users</h4>
          <ul className="space-y-2 text-sm text-green-300">
            {[["Register as Farmer", "/register"], ["Register as Expert", "/register"], ["Login", "/login"], ["Contact Us", "/contact"]].map(([label, path]) => (
              <li key={label}>
                <Link to={path} className="hover:text-white transition-colors">{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-semibold text-white mb-3">Contact</h4>
          <ul className="space-y-2 text-sm text-green-300">
            <li>emamsaimon23@gmail.com</li>
            <li> +880 1866369984</li>
            <li> Chittagong, Bangladesh</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-green-800 text-center py-4 text-xs text-green-400">
        © {new Date().getFullYear()} কৃষি সেবা — All rights reserved [Emam, Shagor , Mashrafi, Rashed].
      </div>
    </footer>
  );
};

export default Footer;
