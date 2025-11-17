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
        "aspect-square rounded-xl font-bold text-3xl",
        "bg-gradient-primary text-primary-foreground",
        "shadow-tile hover:shadow-lg",
        "transition-all duration-300 ease-out",
        "hover:scale-105 active:scale-95",
        "border-2 border-primary-glow/20",
        "cursor-pointer"
      )}
    >
      {value}
    </button>
  );
};
