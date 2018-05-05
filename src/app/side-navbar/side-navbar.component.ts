import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
declare var $: any;

@Component({
  selector: 'app-side-navbar',
  templateUrl: './side-navbar.component.html',
  styleUrls: ['./side-navbar.component.css'],
  providers: [CookieService]
})
export class SideNavbarComponent implements OnInit {
 

  constructor(private cookie: CookieService,private http: Http) {

  }

  ngOnInit() {

  }
}
