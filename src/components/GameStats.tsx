interface GameStatsProps {
  moves: number;
  time: number;
}

export const GameStats = ({ moves, time }: GameStatsProps) => {
  return (
    <div className="flex gap-6 justify-center mb-6">
      <div className="px-6 py-3 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 shadow-xl">
        <div className="text-sm text-white/80 font-medium">Moves</div>
        <div className="text-2xl font-bold text-white">{moves}</div>
      </div>
      <div className="px-6 py-3 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 shadow-xl">
        <div className="text-sm text-white/80 font-medium">Time</div>
        <div className="text-2xl font-bold text-white">{time}s</div>
      </div>
    </div>
  );
};
