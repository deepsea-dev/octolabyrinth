import { useEffect, useRef, useState } from 'react';
import { Maze } from '../../models/Maze';

type MazeRendererProps = {
  maze: Maze
};

export const MazeRenderer: React.FC<MazeRendererProps> = ({ maze }) => {
  const canvasRef = useRef(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const drawMaze = () => {
    if (ctx == null) return;

    const width = ctx.canvas.width;
    const height = ctx.canvas.height;

    const unit = Math.min(width, height) / (maze.grid.length + 1);

    for (let i = 0; i < maze.grid.length; i++) {
      for (let j = 0; j < maze.grid[i].length; j++) {
        if (maze.grid[i][j] == 1) {
          ctx.beginPath();
          ctx.rect(j*unit, i*unit, unit, unit);
          ctx.fill();
        }
      }
    }

    for (const avatar of maze.avatars) {
      ctx.beginPath();
      ctx.arc(avatar.x*unit + unit/2, avatar.y*unit + unit/2, unit/2, 0, 360);
      ctx.fillStyle = avatar.color;
      ctx.fill();
    }
  };

  useEffect(() => {
    drawMaze();
    console.log(maze.avatars);
  }, [ctx]);

  useEffect(() => {
    if (canvasRef != null) {
      const canvas: HTMLCanvasElement = canvasRef.current!;
      setCtx(canvas.getContext('2d'));
    }
  }, [canvasRef]);

  return (
    <div>
      <canvas ref={canvasRef} height={400} width={400}/>
    </div>
  );
};