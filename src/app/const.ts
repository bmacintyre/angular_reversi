export class Const {

    public static DIAG_TL_BR = [
        // [{col: 'A', row: 8}],
        // [{col: 'A', row: 7}, {col: 'B', row: 8}],
        // [{col: 'A', row: 6}, {col: 'B', row: 7}, {col: 'C', row: 8}],
        // [{col: 'A', row: 5}, {col: 'B', row: 6}, {col: 'C', row: 7}, {col: 'D', row: 8}],
        // [{col: 'A', row: 4}, {col: 'B', row: 5}, {col: 'C', row: 6}, {col: 'D', row: 7}, {col: 'E', row: 8}],
        // [{col: 'A', row: 3}, {col: 'B', row: 4}, {col: 'C', row: 5}, {col: 'D', row: 6}, {col: 'E', row: 7}, {col: 'F', row: 8}],
        // // tslint:disable-next-line:max-line-length
        // [{col: 'A', row: 2}, {col: 'B', row: 3}, {col: 'C', row: 4}, {col: 'D', row: 5}, {col: 'E', row: 6}, {col: 'F', row: 7}, {col: 'G', row: 8}],
        // // tslint:disable-next-line:max-line-length
        // [{col: 'A', row: 1}, {col: 'B', row: 2}, {col: 'C', row: 3}, {col: 'D', row: 4}, {col: 'E', row: 5}, {col: 'F', row: 6}, {col: 'G', row: 7}, {col: 'H', row: 8}],
        // // tslint:disable-next-line:max-line-length
        // [{col: 'B', row: 1}, {col: 'C', row: 2}, {col: 'D', row: 3}, {col: 'E', row: 4}, {col: 'F', row: 5}, {col: 'G', row: 6}, {col: 'H', row: 7}],
        // [{col: 'C', row: 1}, {col: 'D', row: 2}, {col: 'E', row: 3}, {col: 'F', row: 4}, {col: 'G', row: 5}, {col: 'H', row: 6}],
        [{col: 'D', row: 1}, {col: 'E', row: 2}, {col: 'F', row: 3}, {col: 'G', row: 4}, {col: 'H', row: 5}],
        // [{col: 'E', row: 1}, {col: 'F', row: 2}, {col: 'G', row: 3}, {col: 'H', row: 4}],
        // [{col: 'F', row: 1}, {col: 'G', row: 2}, {col: 'H', row: 3}],
        // [{col: 'G', row: 1}, {col: 'H', row: 2}],
        // [{col: 'H', row: 1}]
      ];

    public static DIAG_TR_BL = [
        [{col: 'H', row: 8}],
        [{col: 'H', row: 7}, {col: 'G', row: 8}],
        [{col: 'H', row: 6}, {col: 'G', row: 7}, {col: 'F', row: 8}],
        [{col: 'H', row: 5}, {col: 'G', row: 6}, {col: 'F', row: 7}, {col: 'E', row: 8}],
        [{col: 'H', row: 4}, {col: 'G', row: 5}, {col: 'F', row: 6}, {col: 'E', row: 7}, {col: 'D', row: 8}],
        [{col: 'H', row: 3}, {col: 'G', row: 4}, {col: 'F', row: 5}, {col: 'E', row: 6}, {col: 'D', row: 7}, {col: 'C', row: 8}],
        // tslint:disable-next-line:max-line-length
        [{col: 'H', row: 2}, {col: 'G', row: 3}, {col: 'F', row: 4}, {col: 'E', row: 5}, {col: 'D', row: 6}, {col: 'C', row: 7}, {col: 'B', row: 8}],
        [{col: 'H', row: 1}, {col: 'G', row: 2}, {col: 'F', row: 3}, {col: 'E', row: 4}, {col: 'D', row: 5}, {col: 'C', row: 6}, {col: 'B', row: 7}, {col: 'A', row: 8}],
        // tslint:disable-next-line:max-line-length
        [{col: 'G', row: 1}, {col: 'F', row: 2}, {col: 'E', row: 3}, {col: 'D', row: 4}, {col: 'C', row: 5}, {col: 'B', row: 6}, {col: 'A', row: 7}],
        [{col: 'F', row: 1}, {col: 'E', row: 2}, {col: 'D', row: 3}, {col: 'C', row: 4}, {col: 'B', row: 5}, {col: 'A', row: 6}],
        [{col: 'E', row: 1}, {col: 'D', row: 2}, {col: 'C', row: 3}, {col: 'B', row: 4}, {col: 'A', row: 5}],
        [{col: 'D', row: 1}, {col: 'C', row: 2}, {col: 'B', row: 3}, {col: 'A', row: 4}],
        [{col: 'C', row: 1}, {col: 'B', row: 2}, {col: 'A', row: 3}],
        [{col: 'B', row: 1}, {col: 'A', row: 2}],
        [{col: 'A', row: 1}]
      ];

}
