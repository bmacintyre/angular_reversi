import { PlayerState } from './playerstate.interface';
import { ComputerState } from './computerstate.interface';

export interface AppStore {
    playerState: PlayerState;
    computer: ComputerState;
}
