import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Const } from '../const';
import { Store } from '@ngrx/store';
import { PlayerStonesAction } from '../store/reducers/player.reducer';
import { ComputerStonesAction } from '../store/reducers/computer.reducer';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  @Input() gameStatus = Const.IN_PLAY;
  @Input() playAgainShowing = false;

  @Output() resetEvent = new EventEmitter<string>();

  public totalPlayerScore = 2;
  public totalPlayerWins = 0;
  public totalPlayerLosses = 0;
  public totalPlayerTies = 0;
  public totalComputerScore = 2;
  public totalComputerWins = 0;
  public totalComputerLosses = 0;
  public totalComputerTies = 0;

  constructor(private store: Store<any>) {
    this.store.subscribe(data => {
      if (!!data.playerState
        && (!!data.playerState.stones
        || !!data.playerState.wins
        || !!data.playerState.losses
        || !!data.playerState.ties)) {
        this.totalPlayerScore = data.playerState.stones;
        this.totalPlayerWins = data.playerState.wins;
        this.totalPlayerLosses = data.playerState.losses;
        this.totalPlayerTies = data.playerState.ties;
      }
    });

    this.store.subscribe(data => {
      if (!!data.computerState
        && (!!data.computerState.stones
        || !!data.computerState.wins
        || !!data.computerState.losses
        || !!data.computerState.ties)) {
        this.totalComputerScore = data.computerState.stones;
        this.totalComputerWins = data.computerState.wins;
        this.totalComputerLosses = data.computerState.losses;
        this.totalComputerTies = data.computerState.ties;
      }
    });
  }

  ngOnInit() {
  }


  public playAgainClick() {
    this.resetEvent.emit('reset');

    this.playAgainShowing = false;
    this.totalPlayerScore = 2;
    this.totalComputerScore = 2;
    this.store.dispatch(new PlayerStonesAction(this.totalPlayerScore));
    this.store.dispatch(new ComputerStonesAction(this.totalComputerScore));

    this.gameStatus = Const.IN_PLAY;
  }
}
