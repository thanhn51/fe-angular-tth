import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {JwtHelperService} from "@auth0/angular-jwt";
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router,
              private http: HttpClient,
              public jwtHelper: JwtHelperService,
              private toastr: ToastrService,
  ) {
  }

  checkAccount(data: any): Observable<any> {
    return this.http.post(environment.url + '/login/', data)
  }

  isLogin() {
    this.http.get(environment.url + '/auth/user-profile').subscribe((res: any) => {
      // console.log(res)
    });
    return localStorage.getItem('token');
  }

  logout() {
    this.router.navigate(['login'])
    // @ts-ignore
    return this.http.post(environment.url + '/auth/logout').subscribe(() => {
      this.toastr.success('Hope to see you again soon')
      localStorage.clear();
    });
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    // Check whether the token is expired and return
    // true or false
    // @ts-ignore
    return !this.jwtHelper.isTokenExpired(token);
  }
}
