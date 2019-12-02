import {ChangeDetectorRef, Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {QuestionsService} from '@service/questions.service';
import {combineLatest, Observable, of, zip} from 'rxjs';
import {filter, map, mergeMap, takeWhile, throttleTime, withLatestFrom} from 'rxjs/operators';
import {QuestionList} from '@interface/question';
import {RtcBaseService} from '@service/rtc/rtc-base.service';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {PlayersService} from '@service/players.service';
import {PlayerBuzzInComponent} from '@module/game/answer/player-buzz-in/player-buzz-in.component';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss'],
})
export class AnswerComponent implements OnInit, OnDestroy {

  vm$: Observable<{ answer: string }>;
  active = true;

  private amount: number;
  private category_id: string;
  private idx: number;
  private playerAlert;

  @HostListener('click') onClick() {
    this.router.navigate(['question'], {relativeTo: this.route});
  }

  constructor(private route: ActivatedRoute, private router: Router, private questionsSvc: QuestionsService,
              private rtcSvc: RtcBaseService, private sheet: MatBottomSheet, private playersSvc: PlayersService,
              private cdr: ChangeDetectorRef) {

    this.rtcSvc.buzz$.pipe(
      throttleTime(500),
      filter(() => !this.playerAlert),
      withLatestFrom(this.playersSvc.players$),
      takeWhile(() => this.active),
      map(([{connection}, players]) => {
        return players.find(player => player.id === connection.metadata.playerId);
      }),
      mergeMap(currentPlayer => {
        this.playerAlert = this.sheet.open(PlayerBuzzInComponent, {data: currentPlayer});
        this.cdr.markForCheck();
        return zip(of(currentPlayer), this.playerAlert.afterDismissed());
      }),
    )
      .subscribe(([player, correct]) => {
        this.playerAlert = null;
        this.cdr.markForCheck();
        let change = this.amount;
        if (!correct) {
          change *= -1;
        }
        this.questionsSvc.remove(this.category_id, this.idx);
        this.playersSvc.changeScore(player.id, change);
        if (correct) {
          this.router.navigate(['question'], {relativeTo: this.route});
        }
      });
  }

  ngOnInit() {
    this.vm$ = combineLatest([this.route.paramMap, this.questionsSvc.answersAndQuestions$]).pipe(
      map(([params, qanda]: [ParamMap, QuestionList]) => {
        const category = params.get('category');
        const index = params.get('idx');
        const answer = qanda[category][index].answer;
        const question = qanda[category][index].question;
        this.amount = Number(params.get('amount'));
        this.category_id = category;
        this.idx = Number(index);
        console.log(`%cQuestion: ${question}`, 'color:blue; font-size: x-large;');
        return {answer};
      }),
    );
  }

  ngOnDestroy(): void {
    this.active = false;
  }

}
