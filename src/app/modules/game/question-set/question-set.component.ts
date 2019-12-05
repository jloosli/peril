import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {QuestionsService} from '@service/questions.service';

@Component({
  selector: 'app-question-set',
  templateUrl: './question-set.component.html',
  styleUrls: ['./question-set.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionSetComponent implements OnInit {

  constructor(private questionsSvc: QuestionsService) {
  }

  ngOnInit() {

  }

}
