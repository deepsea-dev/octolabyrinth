import generator from 'generate-maze';

export const generateMazeGrid = (size = 25) => {
  const MAZE_SIZE = size;
  const maze = generator(MAZE_SIZE);

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