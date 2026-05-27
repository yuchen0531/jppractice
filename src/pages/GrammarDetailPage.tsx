// src/pages/GrammarDetailPage.tsx
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
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
  const [grammarList, setGrammarList] = useState<Grammar[]>([]);

  useEffect(() => {
    fetch("/data/grammar.json")
        .then((res) => res.json())
        .then((data) => setGrammarList(data));
    }, []);
  const grammar = grammarList.find((item) => item.id === Number(id));

  if (!grammar) {
    return <main className="p-6">找不到文法</main>;
  }

  return (
    <main className="min-h-screen bg-[#fff7f2] px-5 pt-6 pb-24 text-[#3f2a24]">
      <Link to="/grammar" className="text-sm bg-[#b9433f]/20 px-3 py-1 rounded-xl text-[#b9433f]">
        ← 回文法庫
      </Link>

      <section className="mt-5 rounded-3xl bg-white p-5 shadow-sm border border-[#ead8cf]">
        <span className="rounded-full bg-[#fff0ea] px-3 py-1 text-xs text-[#b9433f]">
          {grammar.level}・{grammar.category}
        </span>

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
    </main>
  );
}