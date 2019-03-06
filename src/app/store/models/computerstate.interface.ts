
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
