import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-waiting-host',
  templateUrl: './waiting-host.component.html',
  styleUrls: ['./waiting-host.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WaitingHostComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
