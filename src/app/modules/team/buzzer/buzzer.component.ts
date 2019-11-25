import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-buzzer',
  templateUrl: './buzzer.component.html',
  styleUrls: ['./buzzer.component.scss'],
})
export class BuzzerComponent implements OnInit {

  @Input() name: string;
  @Input() active: boolean;
  @Output() buzzed = new EventEmitter<void>();

  constructor() {
  }

  ngOnInit() {

  }

  buzz() {
    this.buzzed.emit();

  }

}
