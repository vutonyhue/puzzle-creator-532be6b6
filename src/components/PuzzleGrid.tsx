import { useState, useEffect } from "react";
import { PuzzleTile } from "./PuzzleTile";
import { GameStats } from "./GameStats";
import { Button } from "./ui/button";
import { Shuffle, Trophy } from "lucide-react";
import { toast } from "sonner";

const GRID_SIZE = 3;
const TILE_COUNT = GRID_SIZE * GRID_SIZE;

export const PuzzleGrid = () => {
  const [tiles, setTiles] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [hasWon, setHasWon] = useState(false);

  useEffect(() => {
    initializePuzzle();
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && !hasWon) {
      interval = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, hasWon]);

  const initializePuzzle = () => {
    const initialTiles = Array.from({ length: TILE_COUNT - 1 }, (_, i) => i + 1);
    initialTiles.push(0); // 0 represents empty tile
    setTiles(initialTiles);
    setMoves(0);
    setTime(0);
    setIsRunning(false);
    setHasWon(false);
  };

  const shuffleTiles = () => {
    let shuffled = [...tiles];
    // Perform random moves to ensure solvability
    for (let i = 0; i < 100; i++) {
      const emptyIndex = shuffled.indexOf(0);
      const validMoves = getValidMoves(emptyIndex);
      const randomMove = validMoves[Math.floor(Math.random() * validMoves.length)];
      [shuffled[emptyIndex], shuffled[randomMove]] = [shuffled[randomMove], shuffled[emptyIndex]];
    }
    setTiles(shuffled);
    setMoves(0);
    setTime(0);
    setIsRunning(true);
    setHasWon(false);
    toast.success("Puzzle shuffled! Start playing!");
  };

  const getValidMoves = (emptyIndex: number): number[] => {
    const validMoves: number[] = [];
    const row = Math.floor(emptyIndex / GRID_SIZE);
    const col = emptyIndex % GRID_SIZE;

    // Up
    if (row > 0) validMoves.push(emptyIndex - GRID_SIZE);
    // Down
    if (row < GRID_SIZE - 1) validMoves.push(emptyIndex + GRID_SIZE);
    // Left
    if (col > 0) validMoves.push(emptyIndex - 1);
    // Right
    if (col < GRID_SIZE - 1) validMoves.push(emptyIndex + 1);

    return validMoves;
  };

  const checkWin = (currentTiles: number[]): boolean => {
    for (let i = 0; i < TILE_COUNT - 1; i++) {
      if (currentTiles[i] !== i + 1) return false;
    }
    return currentTiles[TILE_COUNT - 1] === 0;
  };

  const handleTileClick = (index: number) => {
    if (hasWon) return;
    
    if (!isRunning) {
      setIsRunning(true);
    }

    const emptyIndex = tiles.indexOf(0);
    const validMoves = getValidMoves(emptyIndex);

    if (validMoves.includes(index)) {
      const newTiles = [...tiles];
      [newTiles[emptyIndex], newTiles[index]] = [newTiles[index], newTiles[emptyIndex]];
      setTiles(newTiles);
      setMoves((prev) => prev + 1);

      if (checkWin(newTiles)) {
        setHasWon(true);
        setIsRunning(false);
        toast.success("🎉 Congratulations! You solved the puzzle!", {
          description: `You finished in ${moves + 1} moves and ${Math.floor(time / 60)}:${(time % 60).toString().padStart(2, '0')}`,
        });
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-md mx-auto">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Puzzle Game
        </h1>
        <p className="text-muted-foreground">
          Arrange the numbers in order from 1 to 8
        </p>
      </div>

      <GameStats moves={moves} time={time} />

      <div 
        className="grid gap-2 w-full p-4 bg-card rounded-2xl shadow-card"
        style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)` }}
      >
        {tiles.map((tile, index) => (
          <PuzzleTile
            key={index}
            value={tile}
            position={index}
            isEmpty={tile === 0}
            onClick={() => handleTileClick(index)}
          />
        ))}
      </div>

      <div className="flex gap-4">
        <Button
          onClick={shuffleTiles}
          size="lg"
          className="bg-gradient-primary hover:opacity-90 transition-opacity shadow-tile"
        >
          <Shuffle className="w-5 h-5 mr-2" />
          New Game
        </Button>
        {hasWon && (
          <Button
            variant="outline"
            size="lg"
            className="border-success text-success hover:bg-success/10"
          >
            <Trophy className="w-5 h-5 mr-2" />
            Winner!
          </Button>
        )}
      </div>
    </div>
  );
};
