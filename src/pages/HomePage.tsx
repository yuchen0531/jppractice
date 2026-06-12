
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
export function HomePage() {
    const  [dailyList, setDailyList] =  useState<any[]>([]);
    const  [dailyGrammarList, setDailyGrammarList] =  useState<any[]>([]);
    useEffect(() => {
        const randomVocab = Math.floor(Math.random() * 35) + 1; // 生成 1-35 的隨機數字
        console.log('randomVocab', randomVocab);
          fetch(`/data/vocab-${randomVocab}.json`)
            .then((res) => res.json())
            .then((data) => {
                console.log('data', data.length);
                const randomNum = Math.floor(Math.random() * (data.length - 5)) + 1;
                setDailyList(data.slice(randomNum - 5, randomNum));
            });
          fetch(`/data/grammar.json`)
            .then((res) => res.json())
            .then((data) => {
                console.log('data', data.length);
                const randomNum = Math.floor(Math.random() * (data.length - 5)) + 1;
                setDailyGrammarList(data.slice(randomNum - 5, randomNum));
            });
    }, []);

  return (
    <div>
        <div className="bg-[#b9433f] text-white px-6 pt-8 pb-10 rounded-b-3xl shadow-sm absolute top-0 left-0 right-0">
            <p className="text-sm tracking-widest">日本語を勉強しましょう</p>

            <h1 className="mt-2 text-xl font-semibold">
                今天也一起加油吧！
            </h1>
        </div>
        <div className="p-6 mt-[128px]">
            <h2 className="text-xl font-bold mb-4">功能導覽</h2>
            <div className="grid grid-cols-2 gap-4">
                <Link to="/daily" className={`flex flex-col items-center bg-white border border-[#ead8cf] text-[#b9433f] rounded-2xl p-4`}>
                    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none">
                        <path d="M5 19H19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                        <path d="M7 16L16.5 6.5L19 9L9.5 18.5L6.5 19.5L7 16Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                    </svg>
                    <p className={`mt-1 `}>文法練習</p>
                </Link>
                <Link to="/VocabPracticeList" className={`flex flex-col items-center bg-white border border-[#ead8cf] text-[#b9433f] rounded-2xl p-4 `}>
                    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none">
                        <path d="M5 19H19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                        <path d="M7 16L16.5 6.5L19 9L9.5 18.5L6.5 19.5L7 16Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                    </svg>
                    <p className={`mt-1 `}>單字練習</p>
                </Link>
                <Link to="/grammar" className={`flex flex-col items-center bg-white border border-[#ead8cf] text-[#b9433f] rounded-2xl p-4 `}>
                    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none">
                        <path d="M5 5.5C5 4.7 5.7 4 6.5 4H19V18.5H7C5.9 18.5 5 19.4 5 20.5V5.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                        <path d="M8 8H16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                        <path d="M8 11H14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    </svg>
                    <p className={`mt-1 `}>文法</p>
                </Link>
                <Link to="/vocab" className={`flex flex-col items-center bg-white border border-[#ead8cf] text-[#b9433f] rounded-2xl p-4 `}>
                    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none">
                        <path d="M6 5H18V19H6V5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                        <path d="M9 9H15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                        <path d="M9 12H13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                        <path d="M8 5V19" stroke="currentColor" strokeWidth="1.8" />
                    </svg>
                    <p className={`mt-1 `}>單字</p>
                </Link>
            </div>
            <div className="h-[1px] bg-[#f1ddd3] w-full my-6"></div>
            <h2 className="text-xl font-bold mb-4">每日推薦單字</h2>
            <ul>
                {dailyList.map((item, index) => (
                    <li key={index} className="mb-2 border border-[#f1ddd3] bg-white rounded-2xl p-3">
                        <p className="text-xs leading-6 text-[#6b4f4f]">{item.reading}</p>
                        <p className="-mt-2 leading-6 tracking-[4px] font-bold text-[#6b4f4f] mb-2">
                            {item.word}
                        </p>
                        <p className="text-sm text-gray-600  mb-2">{item.meaning}</p>
                        <p className="text-sm text-gray-400 text-sm">{item.example}</p>
                    </li>
                ))}
            </ul>
            <div className="h-[1px] bg-[#f1ddd3] w-full my-6"></div>
            <h2 className="text-xl font-bold mb-4">每日推薦文法</h2>
            <ul>
                {dailyGrammarList.map((item, index) => (
                    <li key={index} className="mb-2 border border-[#f1ddd3] bg-white rounded-2xl p-3">
                        <p className="font-bold text-[#6b4f4f] mb-2">
                            {item.pattern}
                        </p>
                        <p className="text-sm text-gray-600  mb-2">{item.meaning}</p>
                        <p className="text-sm text-gray-400 text-sm">{item.examples[0].jp}</p>
                    </li>
                ))}
            </ul>
        </div>
        
    </div>
        
  );
}