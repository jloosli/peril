import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {RtcClientService} from '@service/rtc/rtc-client.service';
import {ClientType} from '@service/rtc/rtc.service';

@Injectable({
  providedIn: 'root',
})
export class ConnectedToGameService implements CanActivate {

  constructor(private clientSvc: RtcClientService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree> {
    const type = route.url[0].path as ClientType;
    this.clientSvc.setClientType(type);
    const gameId = route.paramMap.get('gameId');
    const playerId = route.paramMap.get('playerId') || undefined;
    const playerName = route.paramMap.get('playerName') || undefined || 'Bobby wagner';
    return this.clientSvc.connect(gameId, playerId).then(Boolean);
  }
}
