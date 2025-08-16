import { Card, CardContent } from "@/components/ui/card";

export default function Date() {
  return (
    <Card className="bg-slate-800/50 border-blue-400/20">
      <CardContent className="p-8 text-center">
        <div className="mb-2 text-3xl font-bold text-white ">May</div>
        <div className="mb-2 font-bold text-blue-400 text-8xl ">5</div>
        <div className="text-lg text-blue-200 ">2025</div>
      </CardContent>
    </Card>
  );
}
