import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { User } from '../_models/user';
import { AlertyfyService } from '../_services/alertyfy.service';
import { UserService } from '../_services/user.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class MemberListResolver implements Resolve<User[]> {

    pageNumber = 1;
    pageSize = 5;

    constructor(private userService: UserService, private alertify: AlertyfyService, private router: Router) {}

    resolve(route: ActivatedRouteSnapshot): Observable<User[]> {
        return this.userService.getUsers(this.pageNumber, this.pageSize).pipe(
            catchError(error => {
                this.alertify.error('Problem retriving data');
                this.router.navigate(['/home']);
                return of(null);
            })
        );
    }
// tslint:disable-next-line: eofline
}