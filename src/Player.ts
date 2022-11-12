export default class Player {
  id: string;
  nickname: string;
  constructor(id: string, nickname: string) {
    this.id = id;
    this.nickname = nickname;
  }

  getID() {
    return this.id;
  }

  getNickname() {
    return this.nickname;
  }
}