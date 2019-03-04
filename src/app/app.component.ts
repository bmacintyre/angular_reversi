import { Const } from './const';
import { Component, ViewEncapsulation } from '@angular/core';
import Move from './components/move';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {

  board: Array<any> = [];
  cols: Array<string> = Const.COL_NAMES;
  currentPlayer = 'w';

  constructor() {
    // Initialize the board
    this.initBoard();
  }

  public initBoard() {
    this.cols.map(element => {
      for (let i = 1; i < 9; i++) {
        const vector = { col: element, row: i, status: 'empty' };
        this.board.push(vector);
      }
    });

    /// add starter stones
    this.board.map(square => {
      if (
        (square.col === 'D' && square.row === 4) ||
        (square.col === 'E' && square.row === 5)
      ) {
        square.status = 'white';
      }
      if (
        (square.col === 'D' && square.row === 5) ||
        (square.col === 'E' && square.row === 4)
      ) {
        square.status = 'black';
      }

      if (
        (square.col === 'A' && square.row === 6)
        || (square.col === 'A' && square.row === 1)) {
        square.status = 'white';
      }

      if (square.col === 'A' && square.row === 4 ||
        (square.col === 'A' && square.row === 5) ||
        (square.col === 'A' && square.row === 2)) {
        square.status = 'black';
      }

      if (square.col === 'H' && square.row === 1) {
        square.status = 'black';
      }

      if (square.col === 'F' && square.row === 3) {
        square.status = 'white';
      }

      if (square.col === 'D' && square.row === 3) {
        square.status = 'white';
      }

      // if (square.col === 'C' && square.row === 6) {
      //   square.status = 'white';
      // }

      if (square.col === 'F' && square.row === 6) {
        square.status = 'black';
      }

      if (square.col === 'E' && square.row === 2) {
        square.status = 'black';
      }

      // if (square.col === 'G' && square.row === 4) {
      //   square.status = 'white';
      // }

      // if (square.col === 'H' && square.row === 5) {
      //   square.status = 'white';
      // }
    });

    this.calculateValidMoves();
  }

  public squareClicked(col: string, row: string) {
    // console.log(col + row);
    this.setStone(col, row, 'black');
  }

  public setStone(col: string, row: string, color: string) {
    this.board.map(square => {
      if (
        square.col === col &&
        String(square.row) === row &&
        square.status === 'empty'
      ) {
        square.status = color;
      }
    });
  }

  public getStoneColor(col: string, row: number): any {
    const item = this.board.filter(cell => {
      if (String(col + row) === String(cell.col + cell.row)) {
        if (!!cell && !!cell.status) {
          return cell.status as string;
        } else {
          return;
        }
      }
    });

    return item[0].status;
  }

  public calculateValidMoves() {
    this.scanForVerticalLines();
    this.scanForHorizontalLines();
    this.scanForDiagonalLinesTRtoBL();
    this.scanForDiagonalLinesTLtoBR();
  }

  public getInActivePlayerColour() {
    if (this.currentPlayer === 'w') {
      return 'b';
    } else {
      return 'w';
    }
  }

  private scanForDiagonalLinesTLtoBR() {

    const masterListOfDiags: Array<any> = Const.DIAG_TL_BR;

    const sequences = [];
    for (let m = 0; m < masterListOfDiags.length; m++) {
      masterListOfDiags[m].forEach(square => {

        const item = this.board.filter(val => {
            return val.col === square.col && val.row === square.row ? true : false;
        });

        this.sequenceIndentifier(item, square, sequences);
      });
    }

    this.analyzeSeqAndSetValidMarker(sequences);
  }

  private sequenceIndentifier(item: any, square: any, arrayToFill: any[]) {

    if (item[0] !== undefined) {
      item = item[0];
    }

    if (item.status === 'black') {
      arrayToFill.push({status: 'b', item: square});
    }
    if (item.status === 'white') {
      arrayToFill.push({status: 'w', item: square});
    }

    if (item.status === 'empty') {
      arrayToFill.push({status: 'e', item: square});
    }

    if (item.status === 'valid') {
      arrayToFill.push({status: 'v', item: square});
    }
  }

  private analyzeSeqAndSetValidMarker(sequences: any[], validate = false) {
    if (sequences.length > 1) {
      let keySeq = 'b,w';
      if (this.currentPlayer === 'w') {
        keySeq = 'w,b';
      }
      let temp = [];
      let seqStones = [];
      let pastMinReq = false;
      for (let z = 0; z < sequences.length; z++) {
        if (sequences[z].status === 'e' || sequences[z].status === 'v') {
          if (pastMinReq) {

            const stone = this.getStoneByPosition(sequences[z].item.col, sequences[z].item.row);
            stone.status = 'valid';

            pastMinReq = false;
          }
          temp = [];
        } else {
          temp.push(sequences[z].status);
          const flat = temp.toString();
          if (flat.indexOf(keySeq) > -1) {
            pastMinReq = true;
          }
        }
      }

      pastMinReq = false;
      temp = [];
      seqStones = [];

      for (let q = sequences.length - 1; q > -1; q--) {
        if (sequences[q].status === 'e' || sequences[q].status === 'v') {
          if (pastMinReq) {
            const stone = this.getStoneByPosition(sequences[q].item.col, sequences[q].item.row);
            stone.status = 'valid';
            pastMinReq = false;
          }
          temp = [];
        } else {

          temp.push(sequences[q].status);

          const flat = temp.toString();
          if (flat.indexOf(keySeq) > -1) {
            pastMinReq = true;
            if (validate) {
              const stone = this.getStoneByPosition(sequences[q].item.col, sequences[q].item.row);
              stone.status = this.currentPlayer === 'w' ? 'white' : 'black';
            }
          }
        }
      }
    }
  }

  private getStoneByPosition(col, row):any {
    const stone = this.board.filter(val => {
      return val.col === col && val.row === row ? true : false;
    });

    return stone[0];
  }
  private scanForDiagonalLinesTRtoBL() {

    const masterListOfDiags: Array<any> = Const.DIAG_TR_BL;

    const sequences = [];
    for (let m = 0; m < masterListOfDiags.length; m++) {
      masterListOfDiags[m].forEach(square => {

        const item = this.board.filter(val => {
            return val.col === square.col && val.row === square.row ? true : false;
        });

        this.sequenceIndentifier(item[0], square, sequences);
      });
    }

    this.analyzeSeqAndSetValidMarker(sequences);
  }

  private scanForHorizontalLines(validate = false, stone: any = null) {
    let sequence = [];
    for (let r = 1; r < 9; r++) {
      let row = [];
      row = this.board.filter(square => {
        if (square.row === r) {
          return true;
        }
      });

      this.cols.forEach(col => {

        // Right to Left
        for (let t = row.length - 1; t > -1; t--) {
            const square = row[t];
            this.sequenceIndentifier(square, square, sequence);
          }

      });

      if (!!stone) {
        validate = this.inArray(stone, row);
      }

      this.analyzeSeqAndSetValidMarker(sequence, validate);

      /// Left to Right
      sequence = [];
      row.forEach(square => {
        this.sequenceIndentifier(square, square, sequence);
      });

      this.analyzeSeqAndSetValidMarker(sequence, validate);
    }
  }

  private inArray(value: any, list: any[]): boolean {

    let found = false;
    for (let i = 0; i < list.length - 1; i++)
    {
      const element = list[i];
      if (element.col === value.col && element.row === value.row) {
        found = true;
      }
    }

    return found;
  }

  private scanForVerticalLines(validate = false, stone: any = null) {

    this.cols.forEach(col => {
      let columns = [];

      columns = this.board.filter(square => {
        if (square.col === col) {
          return true;
        }
      });

      // Bottom up scan
      let sequence = [];
      for (let t = columns.length - 1; t > -1; t--) {
        const square = columns[t];

        this.sequenceIndentifier(square, square, sequence);
      }

      if (columns.indexOf(stone) > -1 && validate === true) {
        validate = true;
      } else {
        validate = false;
      }

      this.analyzeSeqAndSetValidMarker(sequence, validate);


      /// Top down scan
      sequence = [];
      columns.forEach(square => {
        this.sequenceIndentifier(square, square, sequence);
      });

      if (columns.indexOf(stone) > -1 && validate === true) {
        validate = true;
      } else {
        validate = false;
      }

      this.analyzeSeqAndSetValidMarker(sequence, validate);

    });
  }

  public validMarkerClicked(col: any, row: number) {

    console.log('validMarkerClicked col : ' + col + ' row: ' + row);
    const stone = this.getStoneByPosition(col, row);
    stone.status = this.currentPlayer === 'w' ? 'white' : 'black';

    const finalHotList = [];

    // find col row in seach of scan lines
    // when found run sequence check from marker point
    // in both direct allowed on that scan line
    // keep track on intermediary opposites along path 
    // till stone of current player color is found

    console.log(finalHotList);
    this.scanForVerticalLines(true, stone);
    this.scanForHorizontalLines(true, stone);
    // this.scanForDiagonalLinesTRtoBL('validate');
    // this.scanForDiagonalLinesTLtoBR('validate');
  }
}
