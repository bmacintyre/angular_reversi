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
  apponentBranches = [];
  board: Array<any> = [];
  cols: Array<string> = Const.COL_NAMES;
  currentPlayer = 'white';

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
        (square.col === 'A' && square.row === 4) ||
        (square.col === 'A' && square.row === 5)
      ) {
        square.status = 'white';
      }

      if (square.col === 'A' && square.row === 3) {
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

      if (square.col === 'C' && square.row === 6) {
        square.status = 'white';
      }

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
    if (this.currentPlayer === 'white') {
      return 'black';
    } else {
      return 'white';
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

  private sequenceIndentifier(item: any, square: any, temp: any[]) {

    if (item[0] !== undefined) {
      item = item[0];
    }

    if (item.status === 'black') {
      temp.push({status: 'b', item: square});
    }
    if (item.status === 'white') {
      temp.push({status: 'w', item: square});
    }

    if (item.status === 'empty') {
      temp.push({status: 'e', item: square});
    }

    if (item.status === 'valid') {
      temp.push({status: 'v', item: square});
    }
  }

  private analyzeSeqAndSetValidMarker(sequences: any[]) {
    if (sequences.length > 1) {
      let keySeq = 'b,w';
      if (this.currentPlayer === 'white') {
        keySeq = 'w,b';
      }
      let temp = [];
      let pastMinReq = false;
      for (let z = 0; z < sequences.length; z++) {
        if (sequences[z].status === 'e' || sequences[z].status === 'v') {
          if (pastMinReq) {

            const stone = this.board.filter(val => {
              return val.col === sequences[z].item.col && val.row === sequences[z].item.row ? true : false;
            });

            stone[0].status = 'valid';
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

      for (let q = sequences.length - 1; q > -1; q--) {
        if (sequences[q].status === 'e' || sequences[q].status === 'v') {
          if (pastMinReq) {
            const stone = this.board.filter(val => {
              return val.col === sequences[q].item.col && val.row === sequences[q].item.row ? true : false;
            });

            stone[0].status = 'valid';
            pastMinReq = false;
          }
          temp = [];
        } else {
          temp.push(sequences[q].status);
          const flat = temp.toString();
          if (flat.indexOf(keySeq) > -1) {
            pastMinReq = true;
          }
        }
      }
    }
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

  private scanForHorizontalLines() {
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

      this.analyzeSeqAndSetValidMarker(sequence);

      /// Left to Right
      sequence = [];
      row.forEach(square => {
        this.sequenceIndentifier(square, square, sequence);
      });

      this.analyzeSeqAndSetValidMarker(sequence);

    }
  }

  private scanForVerticalLines() {

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

      this.analyzeSeqAndSetValidMarker(sequence);


      /// Top down scan
      sequence = [];
      columns.forEach(square => {
        this.sequenceIndentifier(square, square, sequence);
      });

      this.analyzeSeqAndSetValidMarker(sequence);

    });
  }

  private getColumnIndex(letter: string) {
    return this.cols.indexOf(letter);
  }
}
