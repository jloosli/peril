import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-waiting',
  templateUrl: './waiting.component.html',
  styleUrls: ['./waiting.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WaitingComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
