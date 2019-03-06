import { Const } from './const';
import { Component, ViewEncapsulation } from '@angular/core';
import Move from './components/move';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {

  board: Array<any> = [];
  cols: Array<string> = Const.COL_NAMES;
  currentPlayer = 'b';
  totalPlayerScore = 2;
  totalPlayerWins = 0;
  totalPlayerLosses = 0;
  totalPlayerTies = 0;
  totalComputerScore = 2;
  totalComputerWins = 0;
  totalComputerLosses = 0;
  totalComputerTies = 0;
  gameStatus = Const.IN_PLAY;
  playAgainShowing = false;

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
    });

    this.calculateScores();
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
    // this.scanForDiagonalLinesTRtoBL();
    // this.scanForDiagonalLinesTLtoBR();
  }

  public clearValidMarkers() {
    this.board.map(item => {
        if (item.status === 'valid') {
          item.status = 'empty';
        }
        return item;
    });
  }

  public getInActivePlayerColour() {
    if (this.currentPlayer === 'w') {
      return 'b';
    } else {
      return 'w';
    }
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

  private analyzeSeqAndSetValidMarker(sequences: any[]) {
    if (sequences.length > 1) {
      let keySeq = 'b,w';
      if (this.currentPlayer === 'w') {
        keySeq = 'w,b';
      }
      let temp = [];
      let pastMinReq = false;
      for (let z = 0; z < sequences.length; z++) {
        if (sequences[z].status === 'e' || sequences[z].status === 'v') {
          if (pastMinReq) {

            const stone = this.getStoneByPosition(sequences[z].item.col, sequences[z].item.row);
            if (sequences[z - 1] !== undefined &&  sequences[z - 1].status === (this.currentPlayer === 'w' ? 'white' : 'black')) {
              continue;
            }
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

      for (let q = sequences.length - 1; q > -1; q--) {
        if (sequences[q].status === 'e' || sequences[q].status === 'v') {
          if (pastMinReq) {
            const stone = this.getStoneByPosition(sequences[q].item.col, sequences[q].item.row);
            if (sequences[q + 1] !== undefined && sequences[q + 1].status === (this.currentPlayer === 'w' ? 'white' : 'black')) {
              continue;
            }
            stone.status = 'valid';
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

  private executeMovesOnSingleLine(sequences: any[], stone: any) {
    if (sequences.length > 1) {

      let changeFlag = false;
      for (let z = 0; z < sequences.length; z++) {

          const squareContent = this.getStoneByPosition(sequences[z].item.col, sequences[z].item.row);

          if (squareContent === stone
            && sequences[z + 1] !== undefined
            && sequences[z + 1].item.status !== 'empty'
            && sequences[z + 1].item.status !== 'valid') {
            changeFlag = true;
            continue;
          }

          if (changeFlag === true
            && squareContent.status === this.getOppositePlayer()) {
            squareContent.status = this.currentPlayer === 'w' ? 'white' : 'black';
            if (sequences[z + 1] !== undefined && sequences[z + 1].item.status == (this.currentPlayer === 'w' ? 'white' : 'black')) {
              break;
            }

          } else if (changeFlag === true && squareContent.status === 'empty'
          || squareContent.status === 'valid') {
            changeFlag = false;
          }
      }
    }
  }

  private getOppositePlayer(): string {
    if (this.currentPlayer === 'w') {
      return 'black';
    } else {
      return 'white';
    }
  }

  private inArray(value: any, list: any[]): boolean {

    let found = false;
    for (let i = 0; i < list.length; i++)
    {
      const element = list[i];
      if (element.col === value.col && element.row === value.row) {
        found = true;
      }
    }

    return found;
  }

  private getStoneByPosition(col, row):any {
    const stone = this.board.filter(val => {
      return val.col === col && val.row === row ? true : false;
    });

    return stone[0];
  }

  public executeLineOperation(stone: any, validate: boolean, arrayToSearch: any[], sequence: any[], checkReverseAlso = false): boolean {
    if (!!stone) {
      validate = this.inArray(stone, arrayToSearch);
    }

    if (validate) {
      if (this.checkForTriggerPatternInSeq(sequence)) {
        this.executeMovesOnSingleLine(sequence, stone);
      }

      if (checkReverseAlso) {
        // reverse scan
        sequence = sequence.reverse();
        if (this.checkForTriggerPatternInSeq(sequence)) {
          this.executeMovesOnSingleLine(sequence, stone);
        }
      }
    } else {
      this.analyzeSeqAndSetValidMarker(sequence);
    }

    return validate;
  }

  public checkForTriggerPatternInSeq(sequence: any[]): boolean {
    let response = false;
    const pattern = [];
    sequence.forEach(element => {
      pattern.push(element.status);
    });
    if (pattern.toString().indexOf('b,w') > -1 || pattern.toString().indexOf('w,b') > -1) {
      response = true;
    }

    return response;
  }

  public validMarkerClicked(col: any, row: number) {

    if (this.currentPlayer === 'w') {
      return;
    }
    console.log('validMarkerClicked col : ' + col + ' row: ' + row);
    const stone = this.getStoneByPosition(col, row);

    this.scanForVerticalLines(true, stone);
    this.scanForHorizontalLines(true, stone);
    this.scanForDiagonalLinesTRtoBL(true, stone);
    this.scanForDiagonalLinesTLtoBR(true, stone);

    stone.status = this.currentPlayer === 'w' ? 'white' : 'black';

    this.clearValidMarkers();
    this.currentPlayer = this.getOppositePlayer().charAt(0);
    this.calculateValidMoves();

    this.calculateScores();

    this.executeComputersTurn();
  }

  private calculateScores() {

    const numPlayersStonesOnBoard = this.board.filter((stone) => {
      return stone.status === 'black' ? true : false;
    });

    this.totalPlayerScore = numPlayersStonesOnBoard.length;

    const numComputersStonesOnBoard = this.board.filter((stone) => {
      return stone.status === 'white' ? true : false;
    });

    this.totalComputerScore = numComputersStonesOnBoard.length;

  }

  private executeComputersTurn() {

    const listOfValidMoves = this.board.filter(item => {
      return item.status !== undefined && item.status === 'valid' ? true : false;
    });

    // Small delay before display computer move
    // so human player doesn't miss it
    setTimeout(() => {
      const min = 0;
      const max = listOfValidMoves.length - 1;
      const random = Math.floor(Math.random() * Math.floor(max));

      const stone = listOfValidMoves[random];
      this.scanForVerticalLines(true, stone);
      this.scanForHorizontalLines(true, stone);
      this.scanForDiagonalLinesTRtoBL(true, stone);
      this.scanForDiagonalLinesTLtoBR(true, stone);

      if (stone !== undefined) {
        stone.status = 'white';
      }

      this.clearValidMarkers();
      this.currentPlayer = this.getOppositePlayer().charAt(0);
      this.calculateValidMoves();

      this.calculateScores();
      this.validateGameStatus();
      this.calculateValidMoves();

      if (this.gameStatus === Const.NO_MOVES) {
          this.gameStatus = Const.GAME_OVER;
      }

      if (this.gameStatus === Const.GAME_OVER) {
        this.addToWinLossTotals();
        this.playAgainShowing = true;
      }

    }, 1140);

  }

  private validateGameStatus() {
    const listOfValidMoves = this.board.filter(item => {
        return item !== undefined && item.status !== undefined && item.status === 'valid' ? true : false;
    });

    if (listOfValidMoves.length === 0) {
        this.gameStatus = Const.NO_MOVES;
    }
  }

  private addToWinLossTotals() {
      if (this.totalComputerScore > this.totalPlayerScore) {
        this.totalComputerWins++;
        this.totalPlayerLosses++;
      } else if (this.totalComputerScore < this.totalPlayerScore) {
        this.totalPlayerWins++;
        this.totalComputerLosses++;
      } else {
        this.totalComputerTies++;
        this.totalPlayerTies++;
      }
  }

  public playAgainClick() {
    this.board = [];
    this.playAgainShowing = false;
    this.initBoard();
    this.totalPlayerScore = 2;
    this.totalComputerScore = 2;
    this.gameStatus = Const.IN_PLAY;
  }


  ////////////////////////////////////////////////////////////
  // Directional scanning

  private scanForDiagonalLinesTLtoBR(validate = false, stone: any = null) {

    const masterListOfDiags: Array<any> = Const.DIAG_TL_BR;

    let sequence = [];
    for (let m = 0; m < masterListOfDiags.length; m++) {
      masterListOfDiags[m].forEach(square => {

        const item = this.board.filter(val => {
            return val.col === square.col && val.row === square.row ? true : false;
        });

        this.sequenceIndentifier(item, square, sequence);
      });

      this.executeLineOperation(stone, validate, masterListOfDiags[m], sequence, true);

      sequence = [];
    }
  }

  private scanForDiagonalLinesTRtoBL(validate = false, stone: any = null) {

    const masterListOfDiags: Array<any> = Const.DIAG_TR_BL;

    let sequence = [];
    for (let m = 0; m < masterListOfDiags.length; m++) {
      masterListOfDiags[m].forEach(square => {

        const item = this.board.filter(val => {
            return val.col === square.col && val.row === square.row ? true : false;
        });

        this.sequenceIndentifier(item[0], square, sequence);
      });

      this.executeLineOperation(stone, validate, masterListOfDiags[m], sequence, true);

      sequence = [];
    }
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

      // Right to Left
      sequence = [];
      for (let t = row.length - 1; t > -1; t--) {
          const square = row[t];
          this.sequenceIndentifier(square, square, sequence);
      }

      this.executeLineOperation(stone, validate, row, sequence);

      /// Left to Right
      sequence = [];
      row.forEach(square => {
        this.sequenceIndentifier(square, square, sequence);
      });

      if (validate) {
        if (this.checkForTriggerPatternInSeq(sequence)) {
          this.executeMovesOnSingleLine(sequence, stone);
        }
      } else {
        this.analyzeSeqAndSetValidMarker(sequence);
      }
    }
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

      this.executeLineOperation(stone, validate, columns, sequence);

      /// Top down scan
      sequence = [];
      columns.forEach(square => {
        this.sequenceIndentifier(square, square, sequence);
      });

      this.executeLineOperation(stone, validate, columns, sequence);

    });
  }
}
