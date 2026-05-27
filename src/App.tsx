import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { DailyPracticePage } from "./pages/DailyPracticePage";
import { WrongBookPage } from "./pages/WrongBookPage";
import { GrammarPage } from "./pages/GrammarPage";
import { VocabPage } from "./pages/VocabPage";
import { GrammarDetailPage } from "./pages/GrammarDetailPage";
import { VocabLessonListPage } from "./pages/VocabLessonListPage";
import { VocabPracticeListPage } from "./pages/VocabPracticeListPage";
import { VocabPracticePage } from "./pages/VocabPracticePage";
function App() {
  return (
    <>
    <div className="h-screen overflow-y-auto bg-[#fffafa] text-[#3f2a24]">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/daily" element={<DailyPracticePage />} />
        <Route path="/wrong" element={<WrongBookPage />} />
        <Route path="/grammar" element={<GrammarPage />} />
        <Route path="/vocab" element={<VocabLessonListPage />} />
        <Route path="/vocab/:lesson" element={<VocabPage />} />
        <Route path="/vocabPractice/:lesson" element={<VocabPracticePage />} />
        <Route path="/vocabPracticeList" element={<VocabPracticeListPage />} />
        <Route path="/grammar/:id" element={<GrammarDetailPage />} />
      </Routes>
    </div>
    {/* <Footer /> */}
    </>
  );
}

export default App;