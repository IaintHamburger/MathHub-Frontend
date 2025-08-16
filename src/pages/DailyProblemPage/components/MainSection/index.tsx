import Advanced from "./Advanced";
import Basic from "./Basic";
import Date from "./Date";

export default function index({ selectedGrade }: { selectedGrade: string }) {
  return (
    <div className="grid gap-6 mb-8 md:grid-cols-3">
      {/* Basic Problem */}
      <Basic selectedGrade={selectedGrade} />
      {/* Date Display */}
      <Date />
      {/* Advanced Problem */}
      <Advanced selectedGrade={selectedGrade} />
    </div>
  );
}
