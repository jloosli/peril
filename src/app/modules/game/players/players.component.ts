import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {PlayersService} from '@service/players.service';
import {take, tap} from 'rxjs/operators';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-teams',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayersComponent implements OnInit {

  playersForm: FormGroup;

  constructor(private playersSvc: PlayersService, private fb: FormBuilder, private router: Router,
              private route: ActivatedRoute, private cdr: ChangeDetectorRef) {
  }

  get playersCtrls() {
    return this.playersForm.get('players') as FormArray;
  }

  ngOnInit() {
    this.playersForm = this.fb.group({players: this.fb.array([])});
    this.playersSvc.players$.pipe(tap(x => console.log(x)), take(1))
      .subscribe(players => {
        players.map(player => {
          this.playersCtrls.push(this.fb.group({
            name: [player.name || '', Validators.required],
          }));
        });
        this.cdr.markForCheck();
      });

  }

  addPlayer() {
    this.playersCtrls.push(this.fb.group({name: ''}));
  }

  removePlayer(idx: number) {
    this.playersCtrls.removeAt(idx);
  }

  clearPlayers() {
    for (let i = this.playersCtrls.length; i--;) {
      this.playersCtrls.removeAt(i);
    }
  }

  savePlayers() {
    const players = this.playersCtrls.value;
    console.log(players);
    this.playersSvc.setPlayers(players)
      .then(() => this.router.navigate(['/game/connect']));
  }

}
