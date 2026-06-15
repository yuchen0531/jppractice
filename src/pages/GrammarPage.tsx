// src/pages/GrammarPage.tsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
type Grammar = {
  id: number;
  pattern: string;
  level: "N1" | "N2" | "N3" | "N4" | "N5";
  category: "必然" | "原因" | "逆接" | "強調" | "時間/順序" | "限定/範圍" | "狀態/傾向" | "對比/立場" | "意志/目的";
  meaning: string;
  usage: string;
  structure: string;

  examples: {
    jp: string;
    zh: string;
  }[];

  confusion: {
    pattern: string;
    difference: string;
  }[];
};
const categories = ["全部", "必然", "原因", "逆接", "強調", "時間/順序", "限定/範圍", "狀態/傾向", "對比/立場", "意志/目的"];

export function GrammarPage() {
  const [activeCategory, setActiveCategory] = useState("全部");
  const [searchText, setSearchText] = useState("");
  const [grammarList, setGrammarList] = useState<Grammar[]>([]);
  const [readIds, setReadIds] = useState<number[]>([]);
  const [isReadLoaded, setIsReadLoaded] = useState(false);

  const readKey = "grammarReadIds";
  useEffect(() => {
    fetch("/data/grammar.json")
      .then((res) => res.json())
      .then((data) => setGrammarList(data));
  }, []);
  useEffect(() => {
    const saved = localStorage.getItem(readKey);
    setReadIds(saved ? JSON.parse(saved) : []);
    setIsReadLoaded(true);
  }, []);

  useEffect(() => {
    if (!isReadLoaded) return;

    localStorage.setItem(readKey, JSON.stringify(readIds));
  }, [readIds, isReadLoaded]);
  const toggleRead = (id: number) => {
    setReadIds((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };
  const filteredList = grammarList.filter((item) => {
    const matchCategory =
      activeCategory === "全部" || item.category === activeCategory;

    const keyword = searchText.trim().toLowerCase();

    const matchSearch =
      keyword === "" ||
      item.pattern.toLowerCase().includes(keyword) ||
      item.meaning.toLowerCase().includes(keyword) ||
      item.usage.toLowerCase().includes(keyword) ||
      item.structure.toLowerCase().includes(keyword);

    return matchCategory && matchSearch;
  });

  return (
    <>
      <div className="bg-[#b9433f] text-white px-5 pt-5 pb-8 rounded-b-3xl shadow-sm absolute top-0 left-0 right-0">
        <Link to="/" className="text-sm text-white bg-white/20 px-3 py-1 rounded-xl">
          ← 首頁
        </Link>

        <div className="flex items-center justify-start mt-5 mb-3">
          <p className="text-2xl font-bold mr-3">文法庫</p>
          <p className="text-sm text-[#ffb710]">Grammar Library</p>
        </div>

        {/* 搜尋框 */}
        <input
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="搜尋文法、意思、用法..."
          className="mb-4 w-full rounded-2xl bg-white px-4 py-3 text-sm text-[#6b4f4f] placeholder:text-[#c9aaa0] outline-none"
        />

        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-bold ${
                activeCategory === category
                  ? "bg-white text-[#7a5a50] border border-[#ead8cf]"
                  : "text-white border border-white"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <section className="space-y-4 p-6 mt-[240px]">
        {filteredList.map((item) => (
          <Link
            key={item.id}
             to={`/grammar/${item.id}?category=${activeCategory}&search=${searchText}`}
            className="block rounded-3xl border border-[#ead8cf] bg-white p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-[#fff0ea] px-3 py-1 text-xs text-[#b9433f]">
                {item.level}
              </span>

              <div className="flex items-center gap-2">
                <span className="text-xs text-[#a56b5f]">
                  {item.category}
                </span>

                <button
                  onClick={(e) => {
                    e.preventDefault();
                    toggleRead(item.id);
                  }}
                  className={`rounded-full px-3 py-1 text-xs font-bold transition ${
                    readIds.includes(item.id)
                      ? "bg-[#dff4de] text-[#2f7d32]"
                      : "bg-[#f6f1ee] text-[#a56b5f]"
                  }`}
                >
                  {readIds.includes(item.id) ? "✓ 已讀" : "未讀"}
                </button>
              </div>
            </div>

            <h2 className="mt-3 text-xl font-bold">{item.pattern}</h2>
            <p className="mt-2 text-sm leading-6 text-[#6b4f4f]">
              {item.meaning}
            </p>

            <p className="mt-3 text-xs text-[#b9433f]">查看詳細解釋 →</p>
          </Link>
        ))}
      </section>
    </>
  );
}