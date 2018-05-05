import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponentComponent } from './login-component/login-component.component';
import { HttpModule } from '@angular/http';
import { SideNavbarComponent } from './side-navbar/side-navbar.component';
import { MainDashboardComponent } from './main-dashboard/main-dashboard.component';

import { ApiServiceService } from './services/api-service.service';
import { UserServiceService } from './services/user-service.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponentComponent,
    SideNavbarComponent,
    MainDashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,  
    HttpModule,
    RouterModule.forRoot([
      {
        path: 'Login',
        component: LoginComponentComponent
      },
      {
        path:'',
        component:SideNavbarComponent,
        children:[
          {
            path: '',
            component: MainDashboardComponent
          },
        ]
      }
    ])
  ],
  providers: [ApiServiceService, UserServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
