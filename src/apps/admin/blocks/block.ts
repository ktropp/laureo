class Block {
  type: string;

  constructor(type: string) {
    this.type = type;
  }

  toJSON(): any {
    return {
      type: this.type
    }
  }

  static fromJSON(json: any): Block {
    return new Block(json.type);
  }
}
