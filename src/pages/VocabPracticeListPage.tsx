// src/pages/VocabLessonListPage.tsx
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
type Lesson = {
  lesson: number;
  total: number;
};
export function VocabPracticeListPage() {
  const [indexData, setIndexData] = useState<Lesson[]>([]);
  useEffect(() => {
    fetch("/data/vocab-index.json")
      .then((res) => res.json())
      .then((data) => setIndexData(data));
  }, []);
  const totalVocab = indexData.reduce((sum, item) => sum + item.total, 0);
  return (
    <>
      <div className="bg-[#b9433f] text-white px-5 pt-5 pb-8 rounded-b-3xl shadow-sm absolute top-0 left-0 right-0">
        <Link
          to="/"
          className="text-sm text-white bg-white/20 px-3 py-1 rounded-xl"
        >
          ← 首頁
        </Link>

        <div className="mt-5 mb-3">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold mr-3">單字練習</h1>
            <p className="text-sm text-[#ffb710]">Vocabulary Library</p>
          </div>

          <p className="mt-2 text-sm text-white/90">
            共 {indexData.length} 回，選一回開始複習 N1 單字。
          </p>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-white/15 p-3 text-center">
            <p className="text-xl font-bold">{indexData.length}</p>
            <p className="mt-1 text-xs text-white/80">總回數</p>
          </div>

          <div className="rounded-2xl bg-white/15 p-3 text-center">
            <p className="text-xl font-bold">{totalVocab}</p>
            <p className="mt-1 text-xs text-white/80">單字量</p>
          </div>
        </div>
      </div>

      <section className="p-6 space-y-4 mt-[248px]">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-[#3f2a24]">選擇回數</h2>
        </div>

        {indexData.map((item) => {

          return (
            <Link
              key={item.lesson}
              to={`/vocabPractice/${item.lesson}`}
              className="block rounded-3xl border border-[#ead8cf] bg-white p-5 shadow-sm active:scale-[0.98] transition"
            >

              <div className="flex items-center justify-between text-sm">
                <div>
                  <h3 className="text-xl font-bold">第 {item.lesson} 回</h3>  
                  <p className="text-xs text-[#7a5a50]">共 {item.total} 個單字</p>
                </div>
                
                <span className="font-medium text-[#b9433f]">進入 →</span>
              </div>
            </Link>
          );
        })}
      </section>
    </>
  );
}