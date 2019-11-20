import {ReplaySubject} from 'rxjs';

export class RtcServiceStub {
  myType$ = new ReplaySubject<ClientTypes>();

  setClientType(type: ClientTypes): void {
    this.myType$.next(type);
  }
}
