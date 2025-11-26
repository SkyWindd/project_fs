import { Card, CardHeader, CardTitle, CardContent } from "../../components/ui/card";
import type { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  className?: string;
}

export const StatsCard = ({ title, value, icon: Icon, className = "" }: StatsCardProps) => {
  return (
    <Card className={`flex items-center gap-4 p-4 ${className}`}>
      <Icon className="w-6 h-6 text-primary" />
      <div>
        <CardHeader className="p-0">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <p className="text-2xl font-bold">{value}</p>
        </CardContent>
      </div>
    </Card>
  );
};
