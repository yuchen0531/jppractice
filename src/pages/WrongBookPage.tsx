// src/pages/WrongBookPage.tsx
import { Link } from "react-router-dom";
import { useState } from "react";

const wrongQuestions = [
  {
    id: 1,
    type: "文法",
    title: "〜べくして",
    question: "「〜べくして」最接近哪個意思？",
    yourAnswer: "為了做某事",
    correctAnswer: "事情發生是必然的",
    explanation: "〜べくして 表示某個結果不是偶然，而是本來就應該會發生。",
    wrongCount: 2,
  },
  {
    id: 2,
    type: "單字",
    title: "著しい",
    question: "「著しい」的意思是？",
    yourAnswer: "缺乏的",
    correctAnswer: "顯著的",
    explanation: "著しい＝明顯的、顯著的。常見搭配：著しい進歩、著しい変化。",
    wrongCount: 1,
  },
  {
    id: 3,
    type: "文法",
    title: "〜だけに",
    question: "「〜だけに」常用來表示？",
    yourAnswer: "只做 A 不做 B",
    correctAnswer: "正因為 A，所以 B 更加強烈",
    explanation: "〜だけに 表示因為前面的原因，後面的感受或結果更明顯。",
    wrongCount: 3,
  },
];

const filters = ["全部", "文法", "單字"];

export function WrongBookPage() {
  const [activeFilter, setActiveFilter] = useState("全部");

  const filteredList =
    activeFilter === "全部"
      ? wrongQuestions
      : wrongQuestions.filter((item) => item.type === activeFilter);

  return (
    <>
      <div className="bg-[#b9433f] text-white px-5 pt-5 pb-8 rounded-b-3xl shadow-sm absolute top-0 left-0 right-0">
        <Link to="/" className="text-sm text-white bg-white/20 px-3 py-1 rounded-xl">
           ← 首頁
        </Link>
        <div className="flex items-center justify-start mt-5 mb-3">
            <p className="text-2xl font-bold mr-3">錯題本</p>
            <p className="text-sm text-[#ffb710]">Wrong Answer Book</p> 
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-bold ${
                activeFilter === filter
                  ? "bg-white text-[#7a5a50] border border-[#ead8cf]"
                  : "text-white border border-white"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <section className="p-6 space-y-4 mt-[186px]">
        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-2xl bg-white border border-[#ead8cf] p-4 text-center shadow-sm">
            <p className="text-xl font-bold text-[#b9433f]">
              {wrongQuestions.length}
            </p>
            <p className="mt-1 text-xs text-[#7a5a50]">總錯題</p>
          </div>

          <div className="rounded-2xl bg-white border border-[#ead8cf] p-4 text-center shadow-sm">
            <p className="text-xl font-bold text-[#b9433f]">
              {wrongQuestions.filter((item) => item.type === "文法").length}
            </p>
            <p className="mt-1 text-xs text-[#7a5a50]">文法</p>
          </div>

          <div className="rounded-2xl bg-white border border-[#ead8cf] p-4 text-center shadow-sm">
            <p className="text-xl font-bold text-[#b9433f]">
              {wrongQuestions.filter((item) => item.type === "單字").length}
            </p>
            <p className="mt-1 text-xs text-[#7a5a50]">單字</p>
          </div>
        </div>

        {filteredList.length === 0 ? (
          <div className="rounded-3xl border border-[#ead8cf] bg-white p-6 text-center shadow-sm">
            <p className="text-lg font-bold">目前沒有錯題 🎉</p>
            <p className="mt-2 text-sm text-[#7a5a50]">
              今天狀態很好，繼續保持！
            </p>
          </div>
        ) : (
          filteredList.map((item) => (
            <article
              key={item.id}
              className="rounded-3xl border border-[#ead8cf] bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-[#fff0ea] px-3 py-1 text-xs text-[#b9433f]">
                  {item.type}
                </span>

                <span className="text-xs text-[#a56b5f]">
                  錯 {item.wrongCount} 次
                </span>
              </div>

              <h2 className="mt-4 text-xl font-bold">{item.title}</h2>

              <p className="mt-3 text-sm leading-6 text-[#6b4f4f]">
                {item.question}
              </p>

              <div className="mt-4 space-y-2">
                <div className="rounded-2xl bg-[#f7eeee] p-3">
                  <p className="text-xs text-[#a56b5f]">你的答案</p>
                  <p className="mt-1 text-sm text-[#6b4f4f]">
                    {item.yourAnswer}
                  </p>
                </div>

                <div className="rounded-2xl bg-[#fff0ea] p-3">
                  <p className="text-xs text-[#b9433f]">正確答案</p>
                  <p className="mt-1 text-sm font-bold text-[#b9433f]">
                    {item.correctAnswer}
                  </p>
                </div>
              </div>

              <div className="mt-4 rounded-2xl border border-[#ead8cf] bg-[#fff7f2] p-4">
                <p className="text-xs text-[#a56b5f]">解析</p>
                <p className="mt-1 text-sm leading-6 text-[#6b4f4f]">
                  {item.explanation}
                </p>
              </div>
            </article>
          ))
        )}
      </section>
    </>
  );
}