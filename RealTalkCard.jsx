import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquareText } from "lucide-react";
import Link from "next/link";
import realtalk from "@/data/realtalk.json"; // adjust path if needed

export default function RealTalkCard() {
  const { title, points, note, ctaText, ctaLink } = realtalk;

  return (
    <Card className="bg-white shadow-xl rounded-2xl p-6 border-0 max-w-md mx-auto">
      <CardContent className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          {points.map((point, idx) => (
            <li key={idx}>{point}</li>
          ))}
        </ul>
        <p className="text-sm text-gray-500 italic">{note}</p>
        <Link href={ctaLink} target="_blank">
          <Button className="w-full bg-green-600 hover:bg-green-700 text-white text-base font-medium flex items-center justify-center gap-2">
            <MessageSquareText className="w-5 h-5" />
            {ctaText}
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
