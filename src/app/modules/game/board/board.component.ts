import {Component, OnInit} from '@angular/core';
import {QuestionsService} from '@service/questions.service';
import {combineLatest, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {

  vm$: Observable<{ double: boolean }>;

  constructor(private questionsSvc: QuestionsService) {
  }

  ngOnInit() {
    this.vm$ = combineLatest([this.questionsSvc.gameState$]).pipe(
      map(state => ({double: String(state) === 'double'})),
    );
  }

}
