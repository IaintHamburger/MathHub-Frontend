import type { Dispatch, SetStateAction } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Grade } from "../type";

type Props = {
  selectedGrade: string;
  setSelectedGrade: Dispatch<SetStateAction<string>>;
};
const gradeOptions: Grade[] = [
  { value: "國中一年級", label: "國中一年級", category: "國中" },
  { value: "國中二年級", label: "國中二年級", category: "國中" },
  { value: "國中三年級", label: "國中三年級", category: "國中" },
  { value: "高中一年級", label: "高中一年級", category: "高中" },
  { value: "高中二年級", label: "高中二年級", category: "高中" },
  { value: "高中三年級", label: "高中三年級", category: "高中" },
  { value: "大學數學", label: "大學數學", category: "大學" },
];
export default function HeaderSection({ selectedGrade, setSelectedGrade }: Props) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold text-white">每日一題</h1>
        <div className="flex items-center space-x-4">
          <Select value={selectedGrade} onValueChange={setSelectedGrade}>
            <SelectTrigger className="w-48 text-primary-foreground bg-slate-700/50 border-blue-400/30">
              <SelectValue placeholder="選擇您的年級" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-blue-400/30">
              {gradeOptions.map((grade) => (
                <SelectItem
                  key={grade.value}
                  value={grade.value}
                  className="text-white hover:bg-slate-700 focus:bg-slate-700 group"
                >
                  <div className="flex items-center justify-between w-full text-primary-foreground">
                    <span className="">{grade.label}</span>
                    <Badge
                      variant="outline"
                      className="ml-2 text-xs transition-none text-primary-foreground "
                    >
                      {grade.category}
                    </Badge>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
