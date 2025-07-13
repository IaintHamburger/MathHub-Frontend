import React from "react";
import Basic from "./Basic";
import Date from "./Date";
import Advanced from "./Advanced";

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
