import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-connect-host',
  templateUrl: './connect-host.component.html',
  styleUrls: ['./connect-host.component.scss'],
})
export class ConnectHostComponent implements OnInit {

  hostForm = new FormGroup({
    code: new FormControl('', Validators.required),
  });

  constructor() {
  }

  ngOnInit() {
  }

  submitCode() {
    console.log(this.hostForm.value);
    console.log(this.hostForm.get('code').value);
  }

}
