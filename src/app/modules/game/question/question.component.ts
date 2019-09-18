import {Component, HostListener, OnInit} from '@angular/core';
import {combineLatest, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {QuestionList} from '@interface/question';
import {QuestionsService} from '@service/questions.service';
import {PlayersService} from '@service/players.service';
import {Player} from '@interface/player';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit {

  vm$: Observable<{ question: string, teams: Player[] }>;

  @HostListener('click') onClick() {
    this.router.navigate(['/game']);
  }

  constructor(private route: ActivatedRoute, private router: Router, private questionsSvc: QuestionsService,
              private teamsSvc: PlayersService) {
  }

  ngOnInit() {
    this.vm$ = combineLatest([this.route.paramMap, this.questionsSvc.answersAndQuestions$, this.teamsSvc.players$]).pipe(
      map(([params, qanda, teams]: [ParamMap, QuestionList, Player[]]) => {
        const category = params.get('category');
        const index = params.get('idx');
        const question = qanda[category][index].question;
        return {question, teams};
      }),
    );
  }

}
