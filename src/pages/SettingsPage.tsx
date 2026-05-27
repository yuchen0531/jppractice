import { Link } from "react-router-dom";

export function SettingsPage() {
  return (
    <main className="p-6 pb-24">
      <section className="rounded-3xl bg-white p-6 shadow-sm border border-[#f1ddd3]">
        <p className="text-sm text-[#a56b5f]">日本語を勉強しましょう</p>
        <h1 className="mt-2 text-2xl font-bold">今天也來練 N1 🌸</h1>

        <div className="mt-6 rounded-2xl bg-[#fff0ea] p-4">
          <p className="font-semibold">今日任務</p>
          <p className="mt-1 text-sm text-[#7a5a50]">
            N1 文法 3 題 + 單字 2 題
          </p>
        </div>

        <Link
          to="/daily"
          className="mt-6 block rounded-full bg-[#b9433f] py-3 text-center font-semibold text-white"
        >
          開始今日練習
        </Link>
      </section>
    </main>
  );
}