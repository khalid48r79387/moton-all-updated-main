import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from '../services/storage/storage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(
    private storageService: StorageService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const allowedRoles = next.data['roles'] as Array<string>;

    if (this.storageService.isLoggedIn()) {
      if (
        this.storageService.hasAnyRole(
          allowedRoles,
          this.storageService.getUser().role
        )
      ) {
        return true;
      } else {
        return this.router.parseUrl('not-authorized');
      }
    }
    return this.router.parseUrl('/login');
  }
}
