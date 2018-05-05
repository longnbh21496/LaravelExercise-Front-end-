import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { ApiServiceService } from './api-service.service';

@Injectable()
export class UserServiceService {

  constructor(private apiService : ApiServiceService, private http : Http ) {}
  
  login(user:any){
    let url = this.apiService.user.login.url;
    return this.http.post(url, user).map(response => response.json());
  }

}
