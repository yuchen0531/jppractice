// src/pages/DailyPracticePage.tsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// const practiceQuestions = [
//   {
//     id: 1,
//     type: "文法",
//     question: "「〜べくして」最接近哪個意思？",
//     options: ["為了做某事", "事情發生是必然的", "一邊做一邊", "即使如此"],
//     answer: "事情發生是必然的",
//     explanation: "〜べくして 表示某個結果不是偶然，而是本來就應該會發生。",
//   },
//   {
//     id: 2,
//     type: "單字",
//     question: "「著しい」的意思是？",
//     options: ["缺乏的", "顯著的", "安靜的", "勉強的"],
//     answer: "顯著的",
//     explanation: "著しい＝明顯的、顯著的。常見搭配：著しい進歩、著しい変化。",
//   },
//   {
//     id: 3,
//     type: "文法",
//     question: "「〜だけに」常用來表示？",
//     options: ["正因為 A，所以 B 更加強烈", "只做 A 不做 B", "一完成 A 就 B", "無論 A 都 B"],
//     answer: "正因為 A，所以 B 更加強烈",
//     explanation: "〜だけに 表示因為前面的原因，後面的感受或結果更明顯。",
//   },
// ];

export function DailyPracticePage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [wrongList, setWrongList] = useState<number[]>([]);
  const [finished, setFinished] = useState(false);
  const [practiceList, setPracticeList] = useState<any[]>([]);
  const [practiceQuestions, setPracticeQuestions] = useState<any[]>([]);

  useEffect(() => {
    fetch(`/data/grammar.json`)
      .then((res) => res.json())
      .then((data) => setPracticeList(data));
  }, []);

  useEffect(() => {
    if (practiceList.length === 0) return;
    practiceProduce();
  }, [practiceList]);

  const practiceProduce = () => {
    if (practiceList.length < 4) return;

    const shuffled = [...practiceList]
      .sort(() => Math.random() - 0.5)
      .slice(0, 10);

    const questions = shuffled.map((question) => {
      const distractors = practiceList
        .filter((item) => item.id !== question.id)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
        .map((item) => item.meaning);

      const options = [...distractors, question.meaning]
        .sort(() => Math.random() - 0.5);

      return {
        id: question.id,
        type: "文法",
        title: question.pattern,
        question: `「${question.pattern}」常用來表示？`,
        options,
        answerIndex: options.indexOf(question.meaning),
        explanation: question.usage,
      };
    });

    setPracticeQuestions(questions);
  };

  // 還沒載入完，顯示 loading
  if (practiceQuestions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-3">
        <div className="text-2xl animate-spin">⚙️</div>
        <p className="text-sm text-[#7a5a50]">正在為你出題...</p>
      </div>
    );
  }

  const currentQuestion = practiceQuestions[currentIndex];
  const isCorrect = selectedIndex === currentQuestion.answerIndex;
  const progress = ((currentIndex + 1) / practiceQuestions.length) * 100;

  const handleSelect = (index: number) => {
    if (showResult) return;
    setSelectedIndex(index);
    setShowResult(true);
    if (index !== currentQuestion.answerIndex) {
      setWrongList((prev) => [...prev, currentQuestion.id]);
    }
  };

  const handleNext = () => {
    if (currentIndex === practiceQuestions.length - 1) {
      setFinished(true);
      return;
    }
    setCurrentIndex((prev) => prev + 1);
    setSelectedIndex(null);
    setShowResult(false);
  };

  if (finished) {
    const correctCount = practiceQuestions.length - wrongList.length;
    return (
      <>
        <div className="bg-[#b9433f] text-white px-6 pt-8 pb-10 rounded-b-3xl shadow-sm">
          <p className="text-sm text-[#ffb710]">Daily Practice</p>
          <h1 className="mt-1 text-2xl font-bold">今日練習完成</h1>
          <p className="mt-3 text-sm">今天也有好好練習，很棒 ✨</p>
        </div>
        <section className="p-6">
          <div className="rounded-3xl border border-[#ead8cf] bg-white p-6 shadow-sm text-center">
            <p className="text-sm text-[#a56b5f]">本次成績</p>
            <h2 className="mt-3 text-4xl font-bold text-[#b9433f]">
              {correctCount} / {practiceQuestions.length}
            </h2>
            <p className="mt-3 text-sm text-[#6b4f4f]">錯題數：{wrongList.length} 題</p>
            <button
              onClick={() => {
                setCurrentIndex(0);
                setSelectedIndex(null);
                setShowResult(false);
                setWrongList([]);
                setFinished(false);
                practiceProduce();
              }}
              className="mt-6 w-full rounded-full bg-[#b9433f] py-3 text-white font-bold"
            >
              再練一次
            </button>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <div className="bg-[#b9433f] text-white px-5 pt-5 pb-8 rounded-b-3xl shadow-sm absolute top-0 left-0 right-0">
        <Link to="/" className="text-sm text-white bg-white/20 px-3 py-1 rounded-xl">
          ← 首頁
        </Link>
        <div className="flex items-center justify-start mt-5 mb-3">
          <p className="text-2xl font-bold mr-3">今日練習</p>
          <p className="text-sm text-[#ffb710]">Daily Practice</p>
        </div>
        <div className="mt-5">
          <div className="flex justify-between text-sm mb-2">
            <span>第 {currentIndex + 1} / {practiceQuestions.length} 題</span>
            <span>{currentQuestion.type}</span>
          </div>
          <div className="h-2 rounded-full bg-white/30 overflow-hidden">
            <div
              className="h-full rounded-full bg-white transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      <section className="p-6 mt-[184px]">
        <div className="rounded-3xl border border-[#ead8cf] bg-white p-5 shadow-sm">
          <span className="rounded-full bg-[#fff0ea] px-3 py-1 text-xs text-[#b9433f]">
            {currentQuestion.type}
          </span>
          <h2 className="mt-5 text-xl font-bold leading-8">
            {currentQuestion.question}
          </h2>
          <div className="mt-6 space-y-3">
            {currentQuestion.options.map((option: string, index: number) => {
              const isSelected = selectedIndex === index;
              const isAnswer = index === currentQuestion.answerIndex;

              let optionClass =
                "w-full rounded-2xl border px-4 py-3 text-left text-sm transition";

              if (!showResult) {
                optionClass += " border-[#ead8cf] bg-white text-[#3f2a24]";
              } else if (isAnswer) {
                optionClass += " border-[#23551f] bg-[#155f0e24] text-[#23551f] font-bold";
              } else if (isSelected) {
                optionClass += " border-[#b93737] bg-[#db6c6c29] text-[#b93737]";
              } else {
                optionClass += " border-[#ead8cf] bg-white text-[#7a5a50]";
              }

              return (
                <button
                  key={index}
                  onClick={() => handleSelect(index)}
                  className={optionClass}
                >
                  {option}
                </button>
              );
            })}
          </div>

          {showResult && (
            <div className="mt-6 rounded-2xl bg-[#fff7f2] p-4 border border-[#ead8cf]">
              <p className={`font-bold ${isCorrect ? "text-[#23551f]" : "text-[#b9433f]"}`}>
                {isCorrect ? "✓ 答對了！" : "✗ 差一點！"}
              </p>
              <p className="mt-2 text-sm leading-6 text-[#6b4f4f]">
                {currentQuestion.explanation}
              </p>
              <button
                onClick={handleNext}
                className="mt-5 w-full rounded-full bg-[#b9433f] py-3 text-white font-bold"
              >
                {currentIndex === practiceQuestions.length - 1 ? "看結果" : "下一題"}
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}