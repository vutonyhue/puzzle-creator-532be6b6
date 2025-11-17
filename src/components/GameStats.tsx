import { Clock, MousePointerClick } from "lucide-react";

interface GameStatsProps {
  moves: number;
  time: number;
}

export const GameStats = ({ moves, time }: GameStatsProps) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex gap-6 justify-center">
      <div className="flex items-center gap-2 bg-card px-6 py-3 rounded-full shadow-card">
        <MousePointerClick className="w-5 h-5 text-primary" />
        <span className="font-semibold text-foreground">{moves}</span>
        <span className="text-muted-foreground text-sm">Moves</span>
      </div>
      <div className="flex items-center gap-2 bg-card px-6 py-3 rounded-full shadow-card">
        <Clock className="w-5 h-5 text-secondary" />
        <span className="font-semibold text-foreground">{formatTime(time)}</span>
        <span className="text-muted-foreground text-sm">Time</span>
      </div>
    </div>
  );
};
