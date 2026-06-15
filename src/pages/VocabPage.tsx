// src/pages/VocabPage.tsx
import { useState,  useEffect} from "react";
import { Link, useParams } from "react-router-dom";

const parts = [
  "全部",
  "名詞",
  "動詞",
  "サ変動詞",
  "い形容詞",
  "ナ形容詞",
  "副詞",
  "自動詞",
  "他動詞",
];
type Vocab = {
  id: number;
  word: string;
  reading: string;
  meaning: string;
  partOfSpeech: string;
  example: string;
  isFavorite: boolean;
};
export function VocabPage() {
  const { lesson } = useParams();

  const favoriteKey = `vocabFavoriteIds-${lesson}`;

  const [vocabList, setVocabList] = useState<Vocab[]>([]);
  const [activePart, setActivePart] = useState("全部");
  const [flippedIds, setFlippedIds] = useState<number[]>([]);
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);
  const [isFavoriteLoaded, setIsFavoriteLoaded] = useState(false);
  useEffect(() => {
    fetch(`/data/vocab-${lesson}.json`)
      .then((res) => res.json())
      .then((data) => setVocabList(data));
  }, [lesson]);

  useEffect(() => {
    const saved = localStorage.getItem(favoriteKey);
    setFavoriteIds(saved ? JSON.parse(saved) : []);
    setIsFavoriteLoaded(true);
  }, [favoriteKey]);

  useEffect(() => {
    if (!isFavoriteLoaded) return;

    localStorage.setItem(
      favoriteKey,
      JSON.stringify(favoriteIds)
    );
  }, [favoriteIds, favoriteKey, isFavoriteLoaded]);

  const filteredList =
  activePart === "全部"
    ? vocabList
    : vocabList.filter((item) =>
        item.partOfSpeech.includes(activePart)
      );

  const toggleFlip = (id: number) => {
    setFlippedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleFavorite = (id: number) => {
    setFavoriteIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <>
    <div className="bg-[#b9433f] text-white px-5 pt-5 pb-8 rounded-b-3xl shadow-sm absolute top-0 left-0 right-0">
        <Link to="/vocab" className="text-sm text-white bg-white/20 px-3 py-1 rounded-xl">
           ← 單字
        </Link>
        <div className="flex items-center justify-start mt-5 mb-3">
            <p className="text-2xl font-bold mr-3">第 {lesson} 回</p>
            <p className="text-sm text-[#ffb710]">Vocabulary Library</p>
        </div>
      <div className="flex gap-2 overflow-x-auto pb-2">
        {parts.map((part) => (
          <button
            key={part}
            onClick={() => setActivePart(part)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm ${
              activePart === part
                ? "bg-[#b9433f] bg-white text-[#7a5a50] border border-[#ead8cf]"
                : "text-white border border-white"
            }`}
          >
            {part}
          </button>
        ))}
      </div>
    </div>

      <section className="space-y-4 p-6 mt-[186px]">
        {filteredList.map((item) => {
          const isFlipped = flippedIds.includes(item.id);
          const isFavorite = favoriteIds.includes(item.id);

          return (
            <article
              key={item.id}
              
              className="min-h-[180px] cursor-pointer rounded-3xl border border-[#ead8cf] bg-white p-5 shadow-sm transition active:scale-[0.98]"
            >
              <div className="flex justify-between">
                <span className="rounded-full bg-[#fff0ea] px-3 py-1 text-xs text-[#b9433f]">
                  {item.partOfSpeech}
                </span>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(item.id);
                  }}
                  className="text-xl"
                >
                  {isFavorite ? "♥" : "♡"}
                </button>
              </div>

              {!isFlipped ? (
                <div className="mt-8 text-center">
                  <h2 className="text-3xl font-bold">{item.word}</h2>
                  <p className="mt-2 text-sm text-[#a56b5f]">{item.reading}</p>
                  <p className="mt-6 text-xs text-[#7a5a50]" onClick={() => toggleFlip(item.id)}>
                    點一下查看意思
                  </p>
                </div>
              ) : (
                <div className="mt-6">
                  <p className="text-lg font-bold">{item.meaning}</p>

                  <div className="mt-4 rounded-2xl bg-[#fff7f2] p-4">
                    <p className="text-xs text-[#a56b5f]">例句</p>
                    <p className="mt-1 text-sm">{item.example}</p>
                  </div>

                  <p className="mt-4 text-xs text-[#7a5a50] text-center" onClick={() => toggleFlip(item.id)}>
                    再點一下回到單字
                  </p>
                </div>
              )}
            </article>
          );
        })}
      </section>
    </>
  );
}