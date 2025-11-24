interface PuzzleTileProps {
  value: number;
  isEmpty: boolean;
  onClick: () => void;
}

export const PuzzleTile = ({ value, isEmpty, onClick }: PuzzleTileProps) => {
  if (isEmpty) {
    return (
      <div className="aspect-square rounded-xl bg-black/20 backdrop-blur-sm border border-white/10" />
    );
  }

  return (
    <button
      onClick={onClick}
      className="aspect-square rounded-xl bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-sm 
        border-2 border-white/40 shadow-2xl hover:shadow-[0_0_40px_rgba(255,255,255,0.6)]
        hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer
        relative overflow-hidden group animate-float"
      style={{
        transform: 'perspective(1000px) rotateX(2deg) rotateY(2deg)',
        animationDelay: `${value * 0.1}s`
      }}
    >
      {/* Shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent 
        -translate-x-full group-hover:translate-x-full transition-transform duration-1000 animate-shimmer" />
      
      {/* Glow border */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-purple-400/50 via-pink-400/50 to-orange-400/50 
        opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md -z-10" />
      
      {/* Number */}
      <span className="relative z-10 text-4xl font-bold bg-gradient-to-br from-purple-600 via-pink-600 to-orange-600 
        bg-clip-text text-transparent drop-shadow-lg">
        {value}
      </span>
    </button>
  );
};
