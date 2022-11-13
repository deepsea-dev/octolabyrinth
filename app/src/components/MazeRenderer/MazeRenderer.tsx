import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { HostPollGameResponse } from '../../models/HostPollGameReponse';
import { Maze } from '../../models/Maze';
import { queryApi } from '../../wrappedFetch';

type MazeRendererProps = {
  gameId: string
};

export const MazeRenderer: React.FC<MazeRendererProps> = ({ gameId }) => {
  const canvasRef = useRef(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);

  const [maze, setMaze] = useState<Maze|null>();

  const update = () => {
    queryApi<HostPollGameResponse>(`/api/${gameId}/status`)
      .then(res => setMaze(res.maze));
  };


  useEffect(() => {
    drawMaze();
  }, [maze]);

  useEffect(() => {
    const end = setInterval(update, 200);
    return () => clearInterval(end);
  },[]);
  const drawMaze = () => {
    if (ctx == null) return;
    if (maze == null) return;

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    const width = ctx.canvas.width;
    const height = ctx.canvas.height;
    ctx.fill();

    const unit = Math.min(width, height) / (maze.grid.length + 1);
    ctx.fillStyle = 'black';
    for (let i = 0; i < maze.grid.length; i++) {
      for (let j = 0; j < maze.grid[i].length; j++) {
        if (maze.grid[i][j] == 1) {
          if (j == 0 || j == maze.grid[i].length - 1 || maze.grid[i][j-1] == 1 || maze.grid[i][j+1] == 1) {
            ctx.beginPath();
            ctx.rect(j*unit, i*unit + unit/4, unit, unit/2);
            ctx.fill();
          }
          if (i == 0 || i == maze.grid.length - 1 || maze.grid[i-1][j] == 1 || maze.grid[i+1][j] == 1) {
            ctx.beginPath();
            ctx.rect(j*unit + unit/4, i*unit, unit/2, unit);
            ctx.fill();
          }
        }
      }
    }

    for (const avatar of maze.avatars) {
      ctx.beginPath();
      ctx.arc(avatar.x*unit + unit/2, avatar.y*unit + unit/2, unit/1.2, 0, 360);
      ctx.fillStyle = avatar.color;
      ctx.fill();
    }
  };

  useEffect(() => {
    drawMaze();
    console.log(maze?.avatars);
  }, [ctx]);

  useEffect(() => {
    if (canvasRef != null) {
      const canvas: HTMLCanvasElement = canvasRef.current!;
      setCtx(canvas.getContext('2d'));
    }
  }, [canvasRef]);

  return (
    <CanvasContainer>
      <canvas ref={canvasRef} width={700} height={700}/>
    </CanvasContainer>
  );
};

const CanvasContainer = styled.div`
  border-radius: 24px;
  background-color: #F4F5F5;
  border: 4px solid #C9D6EA;
  padding: 16px;
  width: 700px;
  height: 700px;
`;