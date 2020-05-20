import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { error } from '@angular/compiler/src/util';
import { AlertyfyService } from '../_services/alertyfy.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};
  photoUrl: string;

  constructor(public authService: AuthService, private alertyfy: AlertyfyService, private router: Router) { }

  ngOnInit() {
    this.authService.currentPhotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl);
  }
   login() {
    this.authService.login(this.model).subscribe(next => {
     this.alertyfy.success('login successfully');
    // tslint:disable-next-line: no-shadowed-variable
    }, error => {
      this.alertyfy.error(error);
    }, () => {
      this.router.navigate(['/members']);
    });
  }

  loggedin() {
    return this.authService.loggedIn();
  }

  logout()  {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.authService.decodedToken = null;
    this.authService.currentUser = null;
    this.alertyfy.message('logout');
    this.router.navigate(['/home']);
  }

}
