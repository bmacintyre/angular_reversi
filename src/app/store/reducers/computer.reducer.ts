import { Action } from '@ngrx/store';
import { Computer } from '../models/computer.interface';

export interface ComputerState {
    wins: number;
    losses: number;
    ties: number;
    stones: number;
}

const initialState: ComputerState = {
    wins: 0,
    losses: 0,
    ties: 0,
    stones: 2
};

export const ComputerActionTypes = {
    COMPUTER_WIN: 'COMPUTER_WIN',
    COMPUTER_LOSS: 'COMPUTER_LOSS',
    COMPUTER_TIE: 'COMPUTER_TIE',
    COMPUTER_STONES: 'COMPUTER_STONES'
};

export class ComputerStonesAction implements Action {
    type = ComputerActionTypes.COMPUTER_STONES;

    constructor(public stones: number) {
    }
}

export class ComputerWinsAction implements Action {
    type = ComputerActionTypes.COMPUTER_WIN;

    constructor(public wins: number) {
    }
}

export class ComputerLossesAction implements Action {
    type = ComputerActionTypes.COMPUTER_LOSS;

    constructor(public losses: number) {
    }
}

export class ComputerTieAction implements Action {
    type = ComputerActionTypes.COMPUTER_TIE;

    constructor(public ties: number) {
    }
}


export function computerReducer(state: ComputerState = initialState, action: any) {

    switch (action.type) {

        case ComputerActionTypes.COMPUTER_STONES:
            return { ...state, stones: action.stones, loading: true };

        case ComputerActionTypes.COMPUTER_WIN:
            return { ...state, wins: action.wins, loading: true };

        case ComputerActionTypes.COMPUTER_LOSS:
            return { ...state, losses: action.losses, loading: true };

        case ComputerActionTypes.COMPUTER_TIE:
            return { ...state, ties: action.ties, loading: true };

        default:
            return state;
    }
}
