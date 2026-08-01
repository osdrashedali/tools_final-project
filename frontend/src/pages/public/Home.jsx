// src/pages/public/Home.jsx
import { Link } from "react-router-dom";
import { GiWheat, GiPlantSeed, GiFarmer } from "react-icons/gi";
import { FaLeaf, FaShoppingCart, FaUserTie, FaStar } from "react-icons/fa";

// ─── Static demo data ──────────────────────────────────────────────
const stats = [
  { label: "Farmers", value: "1,200+", icon: <GiFarmer /> },
  { label: "Experts", value: "85+", icon: <FaUserTie /> },
  { label: "Problems Solved", value: "3,400+", icon: <FaLeaf /> },
  { label: "Products Listed", value: "500+", icon: <FaShoppingCart /> },
];

const tips = [
  { id: 1, title: "ধানের রোগ প্রতিরোধ", category: "ধান", desc: "ধান চাষে ব্লাস্ট রোগ থেকে বাঁচতে সঠিক সার ও কীটনাশক ব্যবহার করুন।", author: "Dr. Karim" },
  { id: 2, title: "সবজি চাষে জৈব সার", category: "সবজি", desc: "রাসায়নিক সারের পরিবর্তে জৈব সার ব্যবহার করলে মাটির উর্বরতা বাড়ে।", author: "Expert Rina" },
  { id: 3, title: "গমের সঠিক সেচ পদ্ধতি", category: "গম", desc: "গম চাষে সেচের সঠিক সময় নির্ধারণ ফলন ২০% পর্যন্ত বাড়াতে পারে।", author: "Ag. Hossain" },
];

const products = [
  { id: 1, name: "ইউরিয়া সার", price: 320, unit: "প্রতি কেজি", category: "সার", rating: 4.5 },
  { id: 2, name: "উফশী ধানের বীজ", price: 180, unit: "প্রতি কেজি", category: "বীজ", rating: 4.8 },
  { id: 3, name: "পাওয়ার টিলার", price: 45000, unit: "প্রতিটি", category: "যন্ত্রপাতি", rating: 4.3 },
];

// ─── Component ─────────────────────────────────────────────────────
const Home = () => {
  return (
    <div>
      {/* ── Hero ── */}
      <section className="bg-gradient-to-br from-green-700 via-green-600 to-green-500 text-white py-24 px-6">
        <div className="max-w-6xl mx-auto flex items-center gap-12">
          <div className="flex-1">
            <span className="badge-green bg-green-500 text-white text-xs mb-4 inline-block">
              কৃষকের বিশ্বস্ত সঙ্গী
            </span>
            <h1 className="text-5xl font-bold leading-tight mb-4">
              স্মার্ট কৃষির<br />
              <span className="text-green-200">নতুন দিগন্ত</span>
            </h1>
            <p className="text-green-100 text-lg mb-8 leading-relaxed">
              সমস্যা পোস্ট করুন, বিশেষজ্ঞের পরামর্শ নিন এবং কৃষি পণ্য কিনুন
              — সব এক জায়গায়।
            </p>
            <div className="flex gap-4">
              <Link to="/register" className="bg-white text-green-700 font-bold py-3 px-7 rounded-lg hover:bg-green-50 transition-colors">
                শুরু করুন
              </Link>
              <Link to="/marketplace" className="border border-white text-white font-semibold py-3 px-7 rounded-lg hover:bg-green-600 transition-colors">
                Marketplace →
              </Link>
            </div>
          </div>
          {/* Illustration placeholder */}
          <div className="flex-1 flex justify-center">
            <div className="w-64 h-64 bg-green-500 bg-opacity-40 rounded-full flex items-center justify-center">
              <GiWheat className="text-9xl text-green-200" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-4 gap-6">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-green-600 text-3xl flex justify-center mb-2">{s.icon}</div>
              <div className="text-2xl font-bold text-gray-800">{s.value}</div>
              <div className="text-sm text-gray-500">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="section">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">কিভাবে কাজ করে?</h2>
        <p className="text-center text-gray-500 mb-10">মাত্র তিনটি সহজ ধাপে শুরু করুন</p>
        <div className="grid grid-cols-3 gap-8">
          {[
            { step: "১", title: "Register করুন", desc: "Farmer বা Expert হিসেবে নিবন্ধন করুন — মাত্র ১ মিনিটে।", icon: <GiFarmer /> },
            { step: "২", title: "সমস্যা পোস্ট করুন", desc: "আপনার ফসলের সমস্যার ছবি ও বিবরণ পোস্ট করুন।", icon: <GiPlantSeed /> },
            { step: "৩", title: "সমাধান পান", desc: "বিশেষজ্ঞরা আপনার সমস্যার সমাধান দেবেন দ্রুত।", icon: <FaLeaf /> },
          ].map((item) => (
            <div key={item.step} className="card text-center hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-xl mx-auto mb-4">
                {item.icon}
              </div>
              <div className="text-green-600 font-bold text-sm mb-1">ধাপ {item.step}</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{item.title}</h3>
              <p className="text-gray-500 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Latest Tips ── */}
      <section className="bg-green-50 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-800">সর্বশেষ কৃষি টিপস</h2>
              <p className="text-gray-500 mt-1">বিশেষজ্ঞদের পরামর্শ সরাসরি আপনার কাছে</p>
            </div>
            <Link to="/crop-tips" className="btn-outline text-sm">সব দেখুন →</Link>
          </div>
          <div className="grid grid-cols-3 gap-6">
            {tips.map((tip) => (
              <div key={tip.id} className="card hover:shadow-md transition-shadow">
                <span className="badge-green mb-3 inline-block">{tip.category}</span>
                <h3 className="font-semibold text-gray-800 mb-2">{tip.title}</h3>
                <p className="text-gray-500 text-sm mb-4 leading-relaxed">{tip.desc}</p>
                <div className="text-xs text-gray-400"> {tip.author}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Products ── */}
      <section className="section">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">Featured Products</h2>
            <p className="text-gray-500 mt-1">সেরা কৃষি পণ্যের তালিকা</p>
          </div>
          <Link to="/marketplace" className="btn-outline text-sm">Marketplace →</Link>
        </div>
        <div className="grid grid-cols-3 gap-6">
          {products.map((p) => (
            <div key={p.id} className="card hover:shadow-md transition-shadow">
              {/* Product image placeholder */}
              <div className="h-40 bg-green-50 rounded-lg flex items-center justify-center mb-4">
                <GiPlantSeed className="text-5xl text-green-300" />
              </div>
              <span className="badge-earth mb-2 inline-block">{p.category}</span>
              <h3 className="font-semibold text-gray-800 mb-1">{p.name}</h3>
              <div className="flex items-center justify-between mt-3">
                <span className="text-green-600 font-bold">৳{p.price} <span className="text-xs text-gray-400 font-normal">/ {p.unit}</span></span>
                <div className="flex items-center gap-1 text-xs text-amber-500">
                  <FaStar /> {p.rating}
                </div>
              </div>
              <Link to="/login" className="btn-primary w-full text-center text-sm mt-3 block">
                অর্ডার করুন
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="bg-green-700 py-14 px-6 text-center text-white">
        <h2 className="text-3xl font-bold mb-3">আজই যোগ দিন</h2>
        <p className="text-green-200 mb-6">হাজারো কৃষক ও বিশেষজ্ঞের সাথে সংযুক্ত হন</p>
        <Link to="/register" className="bg-white text-green-700 font-bold py-3 px-8 rounded-lg hover:bg-green-50 transition-colors">
          Free Register করুন
        </Link>
      </section>
    </div>
  );
};

export default Home;
