import { useEffect, useRef, useState } from 'react';

export const Maze = () => {

  const maze = [
    [0,1,0,0,0,1],
    [0,1,1,0,1,1],
    [1,0,0,0,0,1],
    [0,0,1,1,0,1],
    [0,1,0,0,0,1]
  ];

  const canvasRef = useRef(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);

  const drawMaze = () => {
    if (ctx == null) return;

    const width = ctx.canvas.width;
    const height = ctx.canvas.height;

    const unit = Math.min(width, height) / (maze.length + 1);

    for (let i = 0; i < maze.length; i++) {
      for (let j = 0; j < maze[i].length; j++) {
        if (maze[i][j] == 1) {
          ctx.beginPath();
          ctx.rect(j*unit, i*unit, unit, unit);
          ctx.fill();
        }
      }
    }
  };

  useEffect(() => {
    if (canvasRef != null) {
      const canvas: HTMLCanvasElement = canvasRef.current!;
      setCtx(canvas.getContext('2d'));
    }
  }, [canvasRef]);

  return (
    <div>
      <canvas ref={canvasRef} height={400} width={400}/>
      <button onClick={drawMaze}>draw</button>
    </div>
  );
};