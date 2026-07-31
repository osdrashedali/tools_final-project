// src/pages/public/CropTips.jsx
import { useState } from "react";
import { FaSearch } from "react-icons/fa";

const allTips = [
  { id: 1, title: "ধানের ব্লাস্ট রোগ প্রতিরোধ", category: "ধান", author: "Dr. Karim", date: "২০ জুলাই, ২০২৬", desc: "ব্লাস্ট রোগ ধান চাষের অন্যতম ক্ষতিকর রোগ। সঠিক বীজ শোধন ও ছত্রাকনাশক ব্যবহারে এটি প্রতিরোধ সম্ভব।", readTime: "৩ মিনিট" },
  { id: 2, title: "সবজি বাগানে জৈব সার", category: "সবজি", author: "Expert Rina", date: "১৮ জুলাই, ২০২৬", desc: "রাসায়নিক সার ছেড়ে জৈব সারে মনোযোগ দিন। গোবর সার ও কম্পোস্ট ব্যবহারে মাটির স্বাস্থ্য ভালো থাকে।", readTime: "৫ মিনিট" },
  { id: 3, title: "গমের সেচ ব্যবস্থাপনা", category: "গম", author: "Ag. Hossain", date: "১৫ জুলাই, ২০২৬", desc: "গম চাষে ৪-৫টি সেচই যথেষ্ট। সঠিক সময়ে সেচ দিলে ফলন ২০-২৫% বৃদ্ধি পায়।", readTime: "৪ মিনিট" },
  { id: 4, title: "মরিচের রোগবালাই দমন", category: "সবজি", author: "Dr. Sultana", date: "১২ জুলাই, ২০২৬", desc: "মরিচের এনথ্রাকনোজ রোগ থেকে রক্ষা পেতে সঠিক কীটনাশক ব্যবহার করুন।", readTime: "৪ মিনিট" },
  { id: 5, title: "আমের মুকুল ঝরা রোধ", category: "ফল", author: "Expert Mahbub", date: "১০ জুলাই, ২০২৬", desc: "আম গাছে মুকুল ঝরা রোধে বোরন সার ও হরমোন স্প্রে কার্যকর পদক্ষেপ।", readTime: "৩ মিনিট" },
  { id: 6, title: "পেঁয়াজ সংরক্ষণ পদ্ধতি", category: "মশলা", author: "Ag. Nahar", date: "৮ জুলাই, ২০২৬", desc: "সঠিক তাপমাত্রা ও আর্দ্রতায় পেঁয়াজ সংরক্ষণ করলে দীর্ঘদিন ভালো থাকে।", readTime: "৩ মিনিট" },
];

const categories = ["সব", "ধান", "সবজি", "গম", "ফল", "মশলা"];

const CropTips = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("সব");

  const filtered = allTips.filter((tip) => {
    const matchCat = category === "সব" || tip.category === category;
    const matchSearch = tip.title.includes(search) || tip.desc.includes(search);
    return matchCat && matchSearch;
  });

  return (
    <div>
      {/* Header */}
      <section className="bg-green-700 text-white py-16 px-6 text-center">
        <h1 className="text-4xl font-bold mb-3">কৃষি টিপস ব্লগ</h1>
        <p className="text-green-200">বিশেষজ্ঞদের পরামর্শ, সকলের জন্য বিনামূল্যে</p>
      </section>

      <section className="section">
        {/* Search & Filter */}
        <div className="flex gap-4 mb-8">
          <div className="flex-1 relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
            <input
              type="text"
              placeholder="টিপস খুঁজুন..."
              className="input pl-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                  category === cat
                    ? "bg-green-600 text-white border-green-600"
                    : "border-gray-200 text-gray-600 hover:border-green-300"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Tips Grid */}
        {filtered.length === 0 ? (
          <p className="text-center text-gray-400 py-12">কোনো টিপস পাওয়া যায়নি।</p>
        ) : (
          <div className="grid grid-cols-3 gap-6">
            {filtered.map((tip) => (
              <div key={tip.id} className="card hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-center justify-between mb-3">
                  <span className="badge-green">{tip.category}</span>
                  <span className="text-xs text-gray-400">⏱ {tip.readTime}</span>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">{tip.title}</h3>
                <p className="text-gray-500 text-sm mb-4 leading-relaxed">{tip.desc}</p>
                <div className="flex justify-between text-xs text-gray-400 pt-3 border-t border-gray-50">
                  <span>✍️ {tip.author}</span>
                  <span>{tip.date}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default CropTips;
