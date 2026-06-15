// src/pages/GrammarDetailPage.tsx
import { Link, useParams, useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
export function GrammarDetailPage() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [readIds, setReadIds] = useState<number[]>([]);
  const [isReadLoaded, setIsReadLoaded] = useState(false);
  const [direction, setDirection] = useState(1);
  const readKey = "grammarReadIds";
  const category = searchParams.get("category") || "全部";
  const search = searchParams.get("search") || "";
  const [grammarList, setGrammarList] = useState<Grammar[]>([]);
  const filteredList = grammarList.filter((item) => {
  const matchCategory =
    category === "全部" || item.category === category;

  const keyword = search.trim().toLowerCase();

  const matchSearch =
    keyword === "" ||
    item.pattern.toLowerCase().includes(keyword) ||
    item.meaning.toLowerCase().includes(keyword) ||
    item.usage.toLowerCase().includes(keyword) ||
    item.structure.toLowerCase().includes(keyword);

  return matchCategory && matchSearch;
});

  useEffect(() => {
    fetch("/data/grammar.json")
        .then((res) => res.json())
        .then((data) => setGrammarList(data));
    }, []);
  const grammar = grammarList.find((item) => item.id === Number(id));
  useEffect(() => {
    const saved = localStorage.getItem(readKey);
    setReadIds(saved ? JSON.parse(saved) : []);
    setIsReadLoaded(true);
  }, []);

  useEffect(() => {
    if (!isReadLoaded) return;
    localStorage.setItem(readKey, JSON.stringify(readIds));
  }, [readIds, isReadLoaded]);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [id]);

  if (!grammar) {
    return <main className="p-6">找不到文法</main>;
  }
  const currentIndex = filteredList.findIndex(
    (item) => item.id === Number(id)
  );

  const prevGrammar = currentIndex > 0 ? filteredList[currentIndex - 1] : null;
  const nextGrammar =
    currentIndex < filteredList.length - 1
      ? filteredList[currentIndex + 1]
      : null;
  const toggleRead = (id: number) => {
    setReadIds((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };
  return (
    <AnimatePresence mode="wait">
      <motion.main
      key={id}
      className="min-h-screen bg-[#fff7f2] px-5 pt-6 pb-24 text-[#3f2a24]"
      initial={{
        x: direction === 1 ? 120 : -120,
        opacity: 0.6,
      }}
      animate={{
        x: 0,
        opacity: 1,
      }}
      exit={{
        x: direction === 1 ? -120 : 120,
        opacity: 0.5,
      }}
      transition={{
        duration: 0.22,
        ease: "easeOut",
      }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.15}
      onDragEnd={(_, info) => {
        const swipeThreshold = 90;

        // 左滑 → 下一頁
        if (info.offset.x < -swipeThreshold && nextGrammar) {
          setDirection(1);
          navigate(`/grammar/${nextGrammar.id}?category=${category}&search=${search}`);
        }

        // 右滑 → 上一頁
        if (info.offset.x > swipeThreshold && prevGrammar) {
          setDirection(-1);
          navigate(`/grammar/${prevGrammar.id}?category=${category}&search=${search}`);
        }
      }}
    >
      <main>
        <Link to="/grammar" className="text-sm bg-[#b9433f]/20 px-3 py-1 rounded-xl text-[#b9433f]">
          ← 回文法庫
        </Link>

        <section className="mt-5 rounded-3xl bg-white p-5 shadow-sm border border-[#ead8cf]">
          <div className="flex items-center justify-between">
            <span className="rounded-full bg-[#fff0ea] px-3 py-1 text-xs text-[#b9433f]">
              {grammar.level}・{grammar.category}
            </span>

            <button
              onClick={() => toggleRead(grammar.id)}
              className={`rounded-full px-3 py-1 text-xs font-bold transition ${
                readIds.includes(grammar.id)
                  ? "bg-[#dff4de] text-[#2f7d32]"
                  : "bg-[#f6f1ee] text-[#a56b5f]"
              }`}
            >
              {readIds.includes(grammar.id) ? "✓ 已讀" : "未讀"}
            </button>
          </div>

          <h1 className="mt-4 text-3xl font-bold">{grammar.pattern}</h1>

          <div className="mt-5">
            <h2 className="font-bold">白話意思</h2>
            <p className="mt-2 text-sm leading-6 text-[#6b4f4f]">
              {grammar.meaning}
            </p>
          </div>

          <div className="mt-5">
            <h2 className="font-bold">使用情境</h2>
            <p className="mt-2 text-sm leading-6 text-[#6b4f4f]">
              {grammar.usage}
            </p>
          </div>

          <div className="mt-5 rounded-2xl bg-[#fff7f2] p-4">
            <p className="text-xs text-[#a56b5f]">接續</p>
            <p className="mt-1 text-sm font-medium">{grammar.structure}</p>
          </div>
        </section>

        <section className="mt-5 rounded-3xl bg-white p-5 shadow-sm border border-[#ead8cf]">
          <h2 className="font-bold">例句</h2>

          <div className="mt-4 space-y-3">
            {grammar.examples.map((example) => (
              <div key={example.jp} className="rounded-2xl bg-[#fff7f2] p-4">
                <p className="font-medium">{example.jp}</p>
                <p className="mt-1 text-sm text-[#7a5a50]">{example.zh}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-5 rounded-3xl bg-white p-5 shadow-sm border border-[#ead8cf]">
          <h2 className="font-bold">容易混淆</h2>

          <div className="mt-4 space-y-3">
            {grammar.confusion.map((item) => (
              <div key={item.pattern} className="rounded-2xl border border-[#ead8cf] p-4">
                <p className="font-semibold text-[#b9433f]">{item.pattern}</p>
                <p className="mt-1 text-sm text-[#6b4f4f]">{item.difference}</p>
              </div>
            ))}
          </div>
        </section>
        <div className="mt-6 flex gap-3">
          <button
            disabled={!prevGrammar}
            onClick={() => {
              if (!prevGrammar) return;

              setTimeout(() => {
                navigate(`/grammar/${prevGrammar.id}?category=${category}&search=${search}`);
              }, 180);
            }}
            className="flex-1 rounded-full border border-[#ead8cf] bg-white py-3 text-sm font-bold text-[#b9433f] disabled:opacity-40"
          >
            ← 上一個
          </button>

          <button
            disabled={!nextGrammar}
            onClick={() => {
              if (!nextGrammar) return;
              setTimeout(() => {
                navigate(`/grammar/${nextGrammar.id}?category=${category}&search=${search}`);
              }, 180);
            }}
            className="flex-1 rounded-full bg-[#b9433f] py-3 text-sm font-bold text-white disabled:opacity-40"
          >
            下一個 →
          </button>
        </div>
      </main>
    </motion.main>
  </AnimatePresence>
    
  );
}