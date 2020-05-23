import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AlertyfyService } from '../_services/alertyfy.service';
import { UserService } from '../_services/user.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Message } from '../_models/message';
import { AuthService } from '../_services/auth.service';

@Injectable()
export class MessagesResolver implements Resolve<Message[]> {

    pageNumber = 1;
    pageSize = 5;
    messageContainer = 'Unread';

    constructor(private userService: UserService, private alertify: AlertyfyService,
                private authService: AuthService, private router: Router) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Message[]> {
        return this.userService.getMessages(this.authService.decodedToken.nameid, this.pageNumber,
             this.pageSize, this.messageContainer).pipe(
            catchError(error => {
                this.alertify.error('Problem retriving message');
                this.router.navigate(['/home']);
                return of(null);
            })
        );
    }
// tslint:disable-next-line: eofline
}