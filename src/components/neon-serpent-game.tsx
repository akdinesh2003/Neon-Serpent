'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { useInterval } from '@/hooks/use-interval';
import { getFoodPlacement } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, Loader2, Pause, Play, RotateCw } from 'lucide-react';

const BOARD_SIZE = 20;
const SCALE_BASE = 25;
const INITIAL_SPEED_MS = 150;

const DIRECTIONS = {
  ArrowUp: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 },
};

type DirectionKey = keyof typeof DIRECTIONS;
type Position = { x: number; y: number };
type GameState = 'START' | 'PLAYING' | 'PAUSED' | 'GAME_OVER';

const createInitialSnake = () => [
  { x: 10, y: 10 },
  { x: 10, y: 11 },
];

export function NeonSerpentGame() {
  const [scale, setScale] = useState(SCALE_BASE);
  const [gameState, setGameState] = useState<GameState>('START');
  const [snake, setSnake] = useState<Position[]>(createInitialSnake());
  const [food, setFood] = useState<Position>({ x: 15, y: 15 });
  const [direction, setDirection] = useState<DirectionKey>('ArrowUp');
  const [speed, setSpeed] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isAiThinking, setIsAiThinking] = useState(false);
  const { toast } = useToast();
  const [eatenFood, setEatenFood] = useState(false);

  const handleResize = () => {
    const minDim = Math.min(window.innerWidth * 0.9, window.innerHeight * 0.6);
    setScale(Math.floor(minDim / BOARD_SIZE));
  };
  
  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const resetGame = useCallback(() => {
    setSnake(createInitialSnake());
    setFood({ x: 15, y: 15 });
    setDirection('ArrowUp');
    setScore(0);
    setSpeed(INITIAL_SPEED_MS);
    setGameState('PLAYING');
  }, []);

  const pauseGame = () => {
    if (gameState === 'PLAYING') {
      setSpeed(null);
      setGameState('PAUSED');
    } else if (gameState === 'PAUSED') {
      setSpeed(INITIAL_SPEED_MS);
      setGameState('PLAYING');
    }
  };

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    const key = e.key as DirectionKey;
    if (key in DIRECTIONS) {
      e.preventDefault();
      // Prevent moving in the opposite direction
      if (
        (direction === 'ArrowUp' && key === 'ArrowDown') ||
        (direction === 'ArrowDown' && key === 'ArrowUp') ||
        (direction === 'ArrowLeft' && key === 'ArrowRight') ||
        (direction === 'ArrowRight' && key === 'ArrowLeft')
      ) {
        return;
      }
      setDirection(key);
    } else if (e.code === 'Space' || e.key === 'Enter') {
        e.preventDefault();
        if (gameState === 'START' || gameState === 'GAME_OVER') resetGame();
    } else if (e.key === 'p' || e.key === 'P') {
        e.preventDefault();
        pauseGame();
    }
  }, [direction, gameState, resetGame]);

  const handleDirectionChange = (newDirection: DirectionKey) => {
     if (
        (direction === 'ArrowUp' && newDirection === 'ArrowDown') ||
        (direction === 'ArrowDown' && newDirection === 'ArrowUp') ||
        (direction === 'ArrowLeft' && newDirection === 'ArrowRight') ||
        (direction === 'ArrowRight' && newDirection === 'ArrowLeft')
      ) {
        return;
      }
      setDirection(newDirection);
  };

  useEffect(() => {
    if (gameState === 'PLAYING') {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [gameState, handleKeyDown]);
  
  const generateRandomFood = (currentSnake: Position[]) => {
    while (true) {
        const newFood = {
            x: Math.floor(Math.random() * BOARD_SIZE),
            y: Math.floor(Math.random() * BOARD_SIZE),
        };
        if (!currentSnake.some(seg => seg.x === newFood.x && seg.y === newFood.y)) {
            return newFood;
        }
    }
  };

  const placeNewFood = useCallback(async (currentSnake: Position[]) => {
    setIsAiThinking(true);
    const response = await getFoodPlacement({
        boardWidth: BOARD_SIZE,
        boardHeight: BOARD_SIZE,
        snakeBody: currentSnake,
        currentFood: food,
    });
    setIsAiThinking(false);

    if (response.success && response.data) {
        const newFood = response.data;
        const isInvalid = currentSnake.some(seg => seg.x === newFood.x && seg.y === newFood.y) || newFood.x < 0 || newFood.x >= BOARD_SIZE || newFood.y < 0 || newFood.y >= BOARD_SIZE;
        if(isInvalid) {
             toast({ title: 'AI Placement Invalid', description: 'AI suggested an invalid spot. Placing randomly.' });
             setFood(generateRandomFood(currentSnake));
        } else {
            setFood({ x: newFood.x, y: newFood.y });
        }
    } else {
        toast({ title: 'AI Food Placement Failed', description: response.error, variant: 'destructive' });
        setFood(generateRandomFood(currentSnake));
    }
  }, [food, toast]);

  useEffect(() => {
    if (eatenFood) {
      placeNewFood(snake);
      setEatenFood(false);
    }
  }, [eatenFood, snake, placeNewFood]);

  const runGame = () => {
    if (gameState !== 'PLAYING') return;

    setSnake(prevSnake => {
        const newSnake = [...prevSnake];
        const head = { ...newSnake[0] };
        const move = DIRECTIONS[direction];
        head.x += move.x;
        head.y += move.y;

        // Wall collision
        if (head.x < 0 || head.x >= BOARD_SIZE || head.y < 0 || head.y >= BOARD_SIZE) {
            setGameState('GAME_OVER');
            setSpeed(null);
            return newSnake;
        }

        // Self collision
        for (let i = 1; i < newSnake.length; i++) {
            if (head.x === newSnake[i].x && head.y === newSnake[i].y) {
                setGameState('GAME_OVER');
                setSpeed(null);
                return newSnake;
            }
        }

        newSnake.unshift(head);

        // Food collision
        if (head.x === food.x && head.y === food.y) {
            setScore(prev => prev + 10);
            setEatenFood(true);
        } else {
            newSnake.pop();
        }
        
        return newSnake;
    });
  };

  useInterval(runGame, speed);
  
  const boardDimensions = {
      width: BOARD_SIZE * scale,
      height: BOARD_SIZE * scale
  };

  const renderOverlay = (title: string, buttonText: string, onButtonClick: () => void, icon?: React.ReactNode) => (
    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex flex-col items-center justify-center z-10 p-4">
      <h2 className="text-4xl font-bold text-primary mb-4 animate-pulse">{title}</h2>
      {gameState === 'GAME_OVER' && <p className="text-xl text-foreground mb-6">Final Score: {score}</p>}
      <Button onClick={onButtonClick} size="lg" className="font-bold text-lg">
        {icon || <Play className="mr-2" />}
        {buttonText}
      </Button>
    </div>
  );

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="w-full flex justify-between items-center text-foreground font-headline px-2" style={{ width: boardDimensions.width }}>
          <div className="text-2xl">Score: <span className="text-accent font-bold">{score}</span></div>
          <div className="flex items-center gap-2">
            {isAiThinking && <Loader2 className="h-6 w-6 animate-spin text-primary" />}
            <Button variant="ghost" size="icon" onClick={pauseGame} disabled={gameState !== 'PLAYING' && gameState !== 'PAUSED'}>
              {gameState === 'PLAYING' ? <Pause/> : <Play/>}
            </Button>
          </div>
      </div>
      <div className="relative rounded-lg overflow-hidden" style={boardDimensions}>
        {gameState === 'START' && renderOverlay('Neon Serpent', 'Start Game', resetGame)}
        {gameState === 'PAUSED' && renderOverlay('Paused', 'Resume', pauseGame, <Play className="mr-2"/>)}
        {gameState === 'GAME_OVER' && renderOverlay('Game Over', 'Restart', resetGame, <RotateCw className="mr-2"/>)}

        <div className="absolute inset-0 bg-background" style={{
            backgroundSize: `${scale}px ${scale}px`,
            backgroundImage: `
              linear-gradient(to right, hsl(var(--border) / 0.2) 1px, transparent 1px),
              linear-gradient(to bottom, hsl(var(--border) / 0.2) 1px, transparent 1px)
            `,
        }}/>
        
        {snake.map((segment, index) => (
          <div
            key={index}
            className={cn(
              'absolute rounded-sm transition-all duration-100',
              index === 0 ? 'bg-primary' : 'bg-primary/70'
            )}
            style={{
              width: scale,
              height: scale,
              left: segment.x * scale,
              top: segment.y * scale,
              boxShadow: index === 0 ? `0 0 ${scale/2}px hsl(var(--primary)), 0 0 ${scale}px hsl(var(--primary))` : `0 0 ${scale/4}px hsl(var(--primary))`,
              zIndex: snake.length - index,
            }}
          />
        ))}
        <div
          className="absolute rounded-full bg-accent animate-pulse"
          style={{
            width: scale,
            height: scale,
            left: food.x * scale,
            top: food.y * scale,
            boxShadow: `0 0 ${scale/2}px hsl(var(--accent)), 0 0 ${scale}px hsl(var(--accent))`
          }}
        />
      </div>
      <div className="grid grid-cols-3 grid-rows-3 gap-2 md:hidden" style={{ width: Math.min(boardDimensions.width, 240) }}>
          <div className="col-start-2 row-start-1 flex justify-center items-center">
              <Button variant="outline" size="icon" className="w-16 h-16" onClick={() => handleDirectionChange('ArrowUp')}><ArrowUp className="w-8 h-8"/></Button>
          </div>
          <div className="col-start-1 row-start-2 flex justify-center items-center">
              <Button variant="outline" size="icon" className="w-16 h-16" onClick={() => handleDirectionChange('ArrowLeft')}><ArrowLeft className="w-8 h-8"/></Button>
          </div>
          <div className="col-start-3 row-start-2 flex justify-center items-center">
              <Button variant="outline" size="icon" className="w-16 h-16" onClick={() => handleDirectionChange('ArrowRight')}><ArrowRight className="w-8 h-8"/></Button>
          </div>
          <div className="col-start-2 row-start-3 flex justify-center items-center">
              <Button variant="outline" size="icon" className="w-16 h-16" onClick={() => handleDirectionChange('ArrowDown')}><ArrowDown className="w-8 h-8"/></Button>
          </div>
      </div>
    </div>
  );
}
