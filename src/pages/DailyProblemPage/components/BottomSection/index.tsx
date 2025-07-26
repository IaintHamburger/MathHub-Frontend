import ProblemCalendar from "@/components/DailyProblem/ProblemCalendar";

import Statistics from "./Statistics";
import Enhanced from "./Enhanced";

export default function BottomSection({
  selectedGrade,
}: {
  selectedGrade: string;
}) {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {/* Statistics */}
      <Statistics />

      {/* Calendar */}
      <ProblemCalendar />

      {/* Enhanced Tips */}
      <Enhanced selectedGrade={selectedGrade} />
    </div>
  );
}
