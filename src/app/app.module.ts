import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FooterComponent } from './footer/footer.component';
import { MarketComponent } from './market/market.component';
import { OpportunitiesComponent } from './opportunities/opportunities.component';
import { PeopleComponent } from './people/people.component';
import { BamComponent } from './bam/bam.component';
import { TopComponent } from './top/top.component';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing/app-routing.module';
import { baseURL } from './shared/baseurl';
import { RestangularModule, Restangular } from 'ngx-restangular';
import { RestangularConfigFactory } from './shared/restConfig';
import { CompanyService } from './services/company.service'
import { ProcessHTTPMsgService} from './services/process-httpmsg.service'
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from './services/message.service'

import { ChartModule } from 'angular-highcharts';
import { ChartsComponent } from './charts/charts.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    NavbarComponent,
    DashboardComponent,
    FooterComponent,
    MarketComponent,
    OpportunitiesComponent,
    PeopleComponent,
    BamComponent,
    TopComponent,
    ChartsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    ChartModule,
    RestangularModule.forRoot(RestangularConfigFactory)
  ],
  providers: [{provide: 'BaseURL', useValue: baseURL},
                ProcessHTTPMsgService,
                CompanyService,
                MessageService,
                CookieService
              ],
  bootstrap: [AppComponent]
})
export class AppModule { }
