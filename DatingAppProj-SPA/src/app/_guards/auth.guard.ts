import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { AlertyfyService } from '../_services/alertyfy.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(public authService: AuthService, private alertyfy: AlertyfyService, private router: Router) { }
 canActivate(): boolean {
   if (this.authService.loggedIn()) {
     return true;
   }

   this.alertyfy.error('You Shall not pass!!!');
   this.router.navigate(['/home']);
   return false;
 }
}
