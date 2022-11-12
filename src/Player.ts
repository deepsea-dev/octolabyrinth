export default class Player {
  id: string;
  nickname: string;
  teamId: string = 'none';
  moves: string[] = [];
  timeOfLastMove: number;
  constructor(id: string, nickname: string) {
    this.id = id;
    this.nickname = nickname;
    this.timeOfLastMove = 0;
  }

  getID() {
    return this.id;
  }

  getNickname() {
    return this.nickname;
  }
}