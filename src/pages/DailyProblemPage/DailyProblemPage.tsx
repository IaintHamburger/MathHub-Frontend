import { useState } from "react";
import BottomSection from "./components/BottomSection";
import HeaderSection from "./components/HeaderSection";
import MainSection from "./components/MainSection/index";

export default function DailyProblemPage() {
  const [selectedGrade, setSelectedGrade] = useState<string>("國中二年級");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <div className="p-6 mx-auto max-w-7xl font-geist">
        {/* Title Section */}
        <HeaderSection selectedGrade={selectedGrade} setSelectedGrade={setSelectedGrade} />
        {/* Main Content Grid */}
        <MainSection selectedGrade={selectedGrade} />

        {/* Bottom Section */}
        <BottomSection selectedGrade={selectedGrade} />
      </div>
    </div>
  );
}
