import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {QuestionsService} from '@service/questions.service';
import {QuestionList} from '@interface/question';
import {combineLatest, Observable, Subject} from 'rxjs';
import {Category} from '@interface/category';
import {map, takeUntil, tap} from 'rxjs/operators';
import {Router} from '@angular/router';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
})
export class GridComponent implements OnInit, AfterViewInit, OnDestroy {

  vm$: Observable<{ questions: QuestionList, categories: Category[] }>;
  values = [100, 200, 300, 400, 500];
  destroyed$ = new Subject();

  @ViewChild('gameBoard', {static: false}) private gb: ElementRef;

  constructor(private qandaSvc: QuestionsService, private router: Router) {
  }

  ngOnInit() {
    this.vm$ = combineLatest([this.qandaSvc.answersAndQuestions$, this.qandaSvc.categories$, this.qandaSvc.gameState$]).pipe(
      tap(([, , state]) => {
        if (state === 'double') {
          this.values = this.values.map(x => x * 2);
        }
      }),
      map(([questions, categories, gameState]: [QuestionList, Category[], 'single' | 'double' | 'final']) => ({
        questions,
        categories,
        gameState,
      })),
    );
  }

  ngAfterViewInit() {
    this.qandaSvc.categories$.pipe(
      takeUntil(this.destroyed$),
    ).subscribe(cats => this.gb.nativeElement.style.setProperty('--colNum', String(cats.length)));
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
  }

  goToAnswer(category, idx) {
    this.router.navigate(['game', category, idx]);
  }

}
