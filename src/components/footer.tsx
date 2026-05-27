import { Link, useLocation } from "react-router-dom";

export function Footer() {
    const location = useLocation();
    const isActive = (path: string) =>
    location.pathname === path;

  return (
     <nav className="fixed bottom-0 left-0 right-0 bg-[#b2423c] border-t border-[#ead8cf] grid grid-cols-5 py-3 text-center text-sm">
        <Link to="/" className={`flex flex-col items-center ${isActive('/') ? 'text-white' : 'text-[#f3d6cc]'}`}>
            <svg viewBox="0 0 24 24" className="w-6 h-6" fill={isActive('/') ? 'currentColor' : 'none'}>
                <path d="M3.5 10.5L12 3.5L20.5 10.5V20H15V14H9V20H3.5V10.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
            </svg>
            <p className={`mt-1 ${isActive('/') ? 'text-white' : 'text-[#f3d6cc]'}`}>首頁</p>
        </Link>
        <Link to="/daily" className={`flex flex-col items-center ${isActive('/daily') ? 'text-white' : 'text-[#f3d6cc]'}`}>
            <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none">
                <path d="M5 19H19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                <path d="M7 16L16.5 6.5L19 9L9.5 18.5L6.5 19.5L7 16Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
            </svg>
            <p className={`mt-1 ${isActive('/daily') ? 'text-white' : 'text-[#f3d6cc]'}`}>練習</p>
        </Link>
        <Link to="/wrong" className={`flex flex-col items-center ${isActive('/wrong') ? 'text-white' : 'text-[#f3d6cc]'}`}>
            <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none">
                <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.8" />
                <path d="M12 7.5V12.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                <circle cx="12" cy="16.5" r="1" fill="currentColor" />
            </svg>
            <p className={`mt-1 ${isActive('/wrong') ? 'text-white' : 'text-[#f3d6cc]'}`}>錯題</p>
        </Link>
        <Link to="/grammar" className={`flex flex-col items-center ${isActive('/grammar') ? 'text-white' : 'text-[#f3d6cc]'}`}>
            <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none">
                <path d="M5 5.5C5 4.7 5.7 4 6.5 4H19V18.5H7C5.9 18.5 5 19.4 5 20.5V5.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                <path d="M8 8H16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                <path d="M8 11H14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            <p className={`mt-1 ${isActive('/grammar') ? 'text-white' : 'text-[#f3d6cc]'}`}>文法</p>
        </Link>
        <Link to="/vocab" className={`flex flex-col items-center ${isActive('/vocab') ? 'text-white' : 'text-[#f3d6cc]'}`}>
            <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none">
                <path d="M6 5H18V19H6V5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                <path d="M9 9H15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                <path d="M9 12H13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                <path d="M8 5V19" stroke="currentColor" strokeWidth="1.8" />
            </svg>
            <p className={`mt-1 ${isActive('/vocab') ? 'text-white' : 'text-[#f3d6cc]'}`}>單字</p>
        </Link>
      </nav>
  );
}
