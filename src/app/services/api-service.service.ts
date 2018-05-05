import { Injectable } from '@angular/core';
@Injectable()
export class ApiServiceService {

  constructor() { }
  baseUrl = "http://localhost/MyLaravel/public/api/";
  user = {
    login : {method : 'POST', url : this.baseUrl + 'userLogin'}
  };

  main = {
    
  }
}
