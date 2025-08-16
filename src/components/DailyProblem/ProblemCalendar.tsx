import { isAfter, subDays } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "../ui/card";

export default function ProblemCalendar() {
  const specialDays = {
    basic: [new Date(2025, 6, 1), new Date(2025, 6, 3)],
    advanced: [new Date(2025, 6, 2), new Date(2025, 6, 4)],
  };
  return (
    <Card className="bg-slate-800/50 border-blue-400/20">
      <CardContent>
        <div className="space-y-4">
          <Calendar
            className="w-full bg-transparent "
            captionLayout="label"
            disabled={(date) => {
              const fifthLastDay = subDays(new Date(), -5); // 後5天的第一天
              return (
                isAfter(date, fifthLastDay) || date.toDateString() === fifthLastDay.toDateString()
              );
            }}
            modifiers={{
              basic: specialDays.basic,
              advanced: specialDays.advanced,
            }}
            modifiersClassNames={{
              basic: "!bg-blue-500 text-white",
              advanced: "!bg-green-500 text-white",
            }}
            classNames={{
              today: " !bg-purple-500 rounded-md text-white ring-2 ring-white ",
              table: "border-separate border-spacing-1 ",
              week: "flex w-full mt-2 gap-2 h-full",
              weekday: "flex-1 text-blue-300",
              selected: "bg-slate-700 ",
              month_caption: "font-geist",
              day_selected: " bg-purple-500",
              caption_label: "text-2xl text-white font-bold",
              button_next: "text-blue-400 hover:bg-blue-400/10 px-3 py-2 rounded-3xl",
              button_previous: "text-blue-400 hover:bg-blue-400/10 px-3 py-2 rounded-3xl",
              disabled: "bg-slate-800 !cursor-not-allowed  hover:!scale-100 ",

              day: "font-geist hover:scale-105 hover:cursor-pointer  transition-scale text-sm  bg-slate-700 rounded-md flex-1 text-white aspect-square flex items-center justify-center",
            }}
            components={{
              MonthCaption: ({ className, children }) => {
                return (
                  <span className={cn("flex items-center gap-2 mb-2", className)}>
                    <CalendarIcon className="w-5 text-blue-400" /> {children}
                  </span>
                );
              },
            }}
          />

          {/* Calendar Legend */}
          <div className="flex justify-center pt-3 space-x-3 text-xs border-t border-slate-700 ">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full shadow-sm" />
              <span className="font-medium text-blue-400">基礎完成</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full shadow-sm" />
              <span className="font-medium text-green-400">全部完成</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-purple-500 rounded-full shadow-sm ring-1 ring-purple-300" />
              <span className="font-medium text-purple-400">今日</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full shadow-sm bg-slate-700" />
              <span className="font-medium text-slate-400">可用</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full opacity-50 bg-slate-800" />
              <span className="font-medium text-slate-500">鎖定</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
