import generator from 'generate-maze';
import { Maze } from './models/Maze';

export const generateMaze = (numberOfTeams = 4, size = 25): Maze => {
  const grid = generateMazeGrid(size);

  const avatars = [
    {
      id: '1',
      x: size,
      y:1,
      color: 'red',
    },
    {
      id: '2',
      x: size,
      y: size*2 - 1,
      color: 'blue',
    },
    {
      id: '3',
      x: 1,
      y: size,
      color: 'green',
    },
    {
      id: '4',
      x: size*2-1,
      y: size,
      color: 'purple',
    },
  ].slice(0, numberOfTeams);

  return {
    grid: generateMazeGrid(size),
    avatars: avatars
  }
}

const generateMazeGrid = (size = 25) => {
  const MAZE_SIZE = size;
  const maze = generator(MAZE_SIZE, undefined, undefined, Math.random()*10_000);

  const expandedMaze: number[][] = Array(MAZE_SIZE*2 + 1).fill(0).map(() => Array(MAZE_SIZE*2 +1).fill(0));;
  for (let i = 0; i < maze.length; i++) {
    for (let j = 0; j < maze[i].length; j++) {
      const cell = maze[i][j];
      const ei = i*2 + 1;
      const ej = j*2 + 1;
      if (cell.top) {
        expandedMaze[ei-1][ej] = 1
        expandedMaze[ei-1][ej-1] = 1
        expandedMaze[ei-1][ej+1] = 1
      }
      if (cell.left) {
        expandedMaze[ei][ej-1] = 1
        expandedMaze[ei-1][ej-1] = 1
        expandedMaze[ei+1][ej-1] = 1
      }
      if (cell.bottom) {
        expandedMaze[ei+1][ej] = 1
        expandedMaze[ei+1][ej-1] = 1
        expandedMaze[ei+1][ej+1] = 1
      }
      if (cell.right) {
        expandedMaze[ei][ej+1] = 1
        expandedMaze[ei-1][ej+1] = 1
        expandedMaze[ei+1][ej+1] = 1
      }
    }
  }

  return expandedMaze;
}