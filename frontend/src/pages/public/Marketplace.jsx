// src/pages/public/Marketplace.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { FaSearch, FaStar, FaLock } from "react-icons/fa";
import { GiPlantSeed } from "react-icons/gi";

const products = [
  { id: 1, name: "ইউরিয়া সার", price: 320, category: "সার", rating: 4.5, reviews: 28, seller: "AgroShop BD" },
  { id: 2, name: "উফশী ধানের বীজ", price: 180, category: "বীজ", rating: 4.8, reviews: 52, seller: "BRRI Seeds" },
  { id: 3, name: "পাওয়ার টিলার", price: 45000, category: "যন্ত্রপাতি", rating: 4.3, reviews: 14, seller: "Farm Tools BD" },
  { id: 4, name: "টিএসপি সার", price: 280, category: "সার", rating: 4.4, reviews: 31, seller: "AgroShop BD" },
  { id: 5, name: "হাইব্রিড মরিচ বীজ", price: 250, category: "বীজ", rating: 4.6, reviews: 19, seller: "Green Seeds" },
  { id: 6, name: "স্প্রে মেশিন", price: 1200, category: "যন্ত্রপাতি", rating: 4.2, reviews: 23, seller: "Farm Tools BD" },
  { id: 7, name: "জৈব কম্পোস্ট", price: 150, category: "সার", rating: 4.7, reviews: 44, seller: "OrganicFarm" },
  { id: 8, name: "পেঁয়াজ বীজ", price: 320, category: "বীজ", rating: 4.5, reviews: 16, seller: "Green Seeds" },
  { id: 9, name: "সেচ পাম্প", price: 8500, category: "যন্ত্রপাতি", rating: 4.1, reviews: 9, seller: "Farm Tools BD" },
];

const categories = ["সব", "সার", "বীজ", "যন্ত্রপাতি"];

const Marketplace = () => {
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("সব");
  const [sortBy, setSortBy] = useState("default");

  let filtered = products.filter((p) => {
    const matchCat = category === "সব" || p.category === category;
    const matchSearch = p.name.includes(search) || p.seller.includes(search);
    return matchCat && matchSearch;
  });

  if (sortBy === "price-low") filtered = [...filtered].sort((a, b) => a.price - b.price);
  if (sortBy === "price-high") filtered = [...filtered].sort((a, b) => b.price - a.price);
  if (sortBy === "rating") filtered = [...filtered].sort((a, b) => b.rating - a.rating);

  return (
    <div>
      {/* Header */}
      <section className="bg-green-700 text-white py-16 px-6 text-center">
        <h1 className="text-4xl font-bold mb-3">Agri Marketplace</h1>
        <p className="text-green-200">সার, বীজ ও যন্ত্রপাতি — সব এক জায়গায়</p>
      </section>

      <section className="section">
        {/* Search + Filter + Sort */}
        <div className="flex gap-4 mb-8">
          <div className="flex-1 relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
            <input
              type="text"
              placeholder="পণ্য বা বিক্রেতা খুঁজুন..."
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
          <select
            className="input w-auto px-3"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="default">Sort by</option>
            <option value="price-low">দাম: কম থেকে বেশি</option>
            <option value="price-high">দাম: বেশি থেকে কম</option>
            <option value="rating">রেটিং</option>
          </select>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-3 gap-6">
          {filtered.map((p) => (
            <div key={p.id} className="card hover:shadow-md transition-shadow">
              {/* Product image */}
              <div className="h-36 bg-green-50 rounded-lg flex items-center justify-center mb-4 relative">
                <GiPlantSeed className="text-5xl text-green-200" />
                <span className="absolute top-2 right-2 badge-earth">{p.category}</span>
              </div>

              <h3 className="font-semibold text-gray-800 mb-1">{p.name}</h3>
              <p className="text-xs text-gray-400 mb-3">🏪 {p.seller}</p>

              <div className="flex items-center gap-1 text-xs text-amber-500 mb-3">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className={i < Math.floor(p.rating) ? "" : "text-gray-200"} />
                ))}
                <span className="text-gray-400 ml-1">({p.reviews})</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-green-600 font-bold text-lg">৳{p.price.toLocaleString()}</span>
              </div>

              {/* Show button only if logged in */}
              {user ? (
                <button className="btn-primary w-full text-sm mt-3">অর্ডার করুন</button>
              ) : (
                <Link
                  to="/login"
                  className="w-full mt-3 flex items-center justify-center gap-2 border border-gray-200 text-gray-500 py-2 rounded-lg text-sm hover:bg-gray-50 transition-colors"
                >
                  <FaLock className="text-xs" />
                  অর্ডার করতে Login করুন
                </Link>
              )}
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-gray-400 py-12">কোনো পণ্য পাওয়া যায়নি।</p>
        )}
      </section>
    </div>
  );
};

export default Marketplace;
