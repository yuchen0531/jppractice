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
  const [grammarList, setGrammarList] = useState<Grammar[]>([]);

   useEffect(() => {
     fetch("/data/grammar.json")
       .then((res) => res.json())
       .then((data) => setGrammarList(data));
   }, []);

  const filteredList =
    activeCategory === "全部"
      ? grammarList
      : grammarList.filter((item) => item.category === activeCategory);

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
      <section className="space-y-4 p-6 mt-[186px]">
        {filteredList.map((item) => (
          <Link
            key={item.id}
            to={`/grammar/${item.id}`}
            className="block rounded-3xl border border-[#ead8cf] bg-white p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-[#fff0ea] px-3 py-1 text-xs text-[#b9433f]">
                {item.level}
              </span>
              <span className="text-xs text-[#a56b5f]">{item.category}</span>
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