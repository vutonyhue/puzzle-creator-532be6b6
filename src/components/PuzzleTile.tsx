import { cn } from "@/lib/utils";

interface PuzzleTileProps {
  value: number;
  position: number;
  isEmpty: boolean;
  onClick: () => void;
}

export const PuzzleTile = ({ value, isEmpty, onClick }: PuzzleTileProps) => {
  if (isEmpty) {
    return (
      <div className="aspect-square rounded-xl bg-muted/30 border-2 border-dashed border-muted" />
    );
  }

  return (
    <button
      onClick={onClick}
      className={cn(
        "aspect-square rounded-xl font-bold text-4xl relative overflow-hidden",
        "bg-gradient-primary text-primary-foreground",
        "shadow-tile hover:shadow-lg",
        "transition-all duration-300 ease-out",
        "hover:scale-110 hover:-translate-y-2 active:scale-95",
        "border-2 border-primary-glow/30",
        "cursor-pointer group",
        "transform-gpu",
        "animate-[float_3s_ease-in-out_infinite]"
      )}
      style={{
        transformStyle: 'preserve-3d',
        transform: 'perspective(1000px) rotateX(5deg) rotateY(0deg)',
      }}
    >
      <div 
        className="absolute inset-0 bg-gradient-shine opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          animation: 'shimmer 2s infinite',
        }}
      />
      <span className="relative z-10 drop-shadow-lg">{value}</span>
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-xl" />
    </button>
  );
};
