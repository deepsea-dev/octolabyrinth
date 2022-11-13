export default class Player {
  id: string;
  nickname: string;
  teamId: string = 'none';
  moves: string[] = [];
  timeOfLastMove: number;
  lastSeen: number;
  constructor(id: string, nickname: string) {
    this.id = id;
    this.nickname = nickname;
    this.timeOfLastMove = 0;
    this.lastSeen = Date.now();
  }

  getID() {
    return this.id;
  }

  getNickname() {
    return this.nickname;
  }

  feed() {
    this.lastSeen = Date.now();
  }

  hasLeft() {
    return Date.now() - this.lastSeen > 5000;
  }
}