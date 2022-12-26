import { LocalstorageService } from 'src/app/shared/services/localstorage/localstorage.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActiveUserGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    let localstorageService = new LocalstorageService();
    let tenent = localstorageService.get<string>(LocalstorageService.KEY_STORAGE.tenant);
    if(state.url.includes('auth') && tenent) return this.router.createUrlTree(['core']);
    if(!state.url.includes('auth') && !tenent) return this.router.createUrlTree(['auth']);

    return true;
  }
}
