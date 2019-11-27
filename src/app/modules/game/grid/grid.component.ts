import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {QuestionsService} from '@service/questions.service';
import {QuestionList} from '@interface/question';
import {combineLatest, Observable, Subject} from 'rxjs';
import {Category} from '@interface/category';
import {map, takeUntil, tap} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
})
export class GridComponent implements OnInit, AfterViewInit, OnDestroy {

  vm$: Observable<{ questions: QuestionList, categories: Category[], answered: { [id: string]: Set<number> } }>;
  values = [100, 200, 300, 400, 500];
  destroyed$ = new Subject();

  @ViewChild('gameBoard', {static: false}) private gb: ElementRef;

  constructor(private qandaSvc: QuestionsService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.vm$ = combineLatest([
      this.qandaSvc.answersAndQuestions$,
      this.qandaSvc.categories$,
      this.qandaSvc.gameState$,
      this.qandaSvc.answered$,
    ]).pipe(
      tap(([, , state]) => {
        if (state === 'double') {
          this.values = this.values.map(x => x * 2);
        }
      }),
      map(([questions, categories, gameState, answered]:
             [QuestionList, Category[], 'single' | 'double' | 'final', any]) => ({
        questions,
        categories,
        gameState,
        answered,
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

  goToAnswer(category: string, idx: number, amount: number) {
    this.router.navigate([category, idx, amount], {relativeTo: this.route});
  }

  isAnswered(category: string, idx: number, answered: { [id: string]: Set<number> }): boolean {
    return category in answered && answered[category].has(idx);
  }
}
