
export default class Move {
  status = 'empty';
  row: number;
  col: string;
  direction: string;

  constructor(status: string, row: number, col: string, direction: any) {
    this.status = status;
    this.row = row;
    this.col = col;
    this.direction = direction;
  }

  equals(other: Move) {
    return JSON.stringify(this) === JSON.stringify(other);
  }
}
