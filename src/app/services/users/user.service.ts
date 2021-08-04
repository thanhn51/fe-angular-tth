import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,
              protected toastr: ToastrService) { }

  register(data: any){
    this.toastr.success('Register successfully')
    return this.http.post(environment.url + '/auth/register',data);
  }
}
