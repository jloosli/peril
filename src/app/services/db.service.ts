import {Injectable} from '@angular/core';
import * as localForage from 'localforage';
import {extendPrototype} from 'localforage-observable';
import {BehaviorSubject, Observable} from 'rxjs';
import {filter, switchMap} from 'rxjs/operators';

const localforage: LocalForageWithObservableMethods = extendPrototype(localForage);


@Injectable({
  providedIn: 'root',
})
export class DbService {

  private ready$ = new BehaviorSubject(false);

  constructor() {
    this.init();
  }

  obsKey<T = any>(key: string): Observable<T> {
    return this.ready$.pipe(
      filter(Boolean),
      switchMap(() => localforage.getItemObservable<T>(key, {crossTabNotification: true}) as Observable<T>),
    );
  }

  getItem<T = any>(key: string): Promise<T> {
    return localforage.getItem<T>(key);
  }

  setItem<T>(key: string, value: T): Promise<T> {
    return localforage.setItem<T>(key, value);
  }

  removeItem(key: string): Promise<void> {
    return localforage.removeItem(key);
  }

  clear(): Promise<void> {
    return localforage.clear();
  }

  private init() {
    console.log('I ran init (should only happen once)');
    localforage.newObservable.factory = <T>(subscribeFn: SubscriberFunction<T>): Observable<T> => new Observable<T>(subscribeFn);
    localforage.ready().then(() => this.ready$.next(true));
  }

}
