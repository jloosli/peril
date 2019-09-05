import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {QuestionsService} from '@service/questions.service';
import {combineLatest, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {QuestionList} from '@interface/question';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss'],
})
export class AnswerComponent implements OnInit {

  vm$: Observable<{ answer: string }>;

  constructor(private route: ActivatedRoute, private router: Router, private questionsSvc: QuestionsService) {
  }

  ngOnInit() {
    this.vm$ = combineLatest([this.route.paramMap, this.questionsSvc.answersAndQuestions$]).pipe(
      map(([params, qanda]: [ParamMap, QuestionList]) => {
        const category = params.get('category');
        const index = params.get('idx');
        const answer = qanda[category][index].answer;
        return {answer};
      }),
    );
  }

  goToQuestion() {
    this.router.navigate(['question'], {relativeTo: this.route});
  }

}
