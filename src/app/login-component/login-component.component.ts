import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Http, Response, Headers } from '@angular/http';
import { UserServiceService } from './../services/user-service.service'

declare var $: any;

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css'],
  providers: [CookieService]
})

export class LoginComponentComponent implements OnInit {

  constructor(private http: Http,private cookieService: CookieService, private router: Router,private userService:UserServiceService) { }

  ngOnInit() {
  }

  onSubmit = function(user){
    this.userService.login(user)
    .subscribe(data => {
      console.log(data);
      this.cookieService.set('loginID', data.user.id);
      this.cookieService.set('token', data.success.token);
      this.router.navigate(['/']);
    },err=>{
      $("#errMessage").html("<b style = 'color:red'>Invalid username or password</b>");
    });
    // this.http.post('http://localhost/MyLaravel/public/api/userLogin',user).map((res: Response) => res.json())
    //   .subscribe(data => {
    //     console.log(data);
    //     this.cookieService.set('loginID', data.user.id);
    //     this.cookieService.set('token', data.success.token);
    //     this.router.navigate(['/']);
    //   },err=>{
    //     $("#errMessage").html("<b style = 'color:red'>Invalid username or password</b>");
    //   });
  }

}
