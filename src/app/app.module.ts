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
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { baseURL } from './shared/baseurl';
import { RestangularModule, Restangular } from 'ngx-restangular';
import { RestangularConfigFactory } from './shared/restConfig';
import { CompanyService } from './services/company.service'
import { ProcessHTTPMsgService} from './services/process-httpmsg.service'
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from './services/message.service'
import { NotifierModule } from 'angular-notifier';
import { ChartModule } from 'angular-highcharts';
import { ChartsComponent } from './charts/charts.component';
import { MyFilterPipe } from './shared/filter.pipe';
import { PeopleProposal } from './shared/filter.pipe.peopleproposal';
import { NgxSmartModalModule } from 'ngx-smart-modal';

import { ElaborationComponent } from './elaboration/elaboration.component';

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
    MyFilterPipe,
    PeopleProposal,
    ChartsComponent,
    ElaborationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpModule,
    ChartModule,
    NotifierModule.withConfig( {
      position: {
        horizontal: {
          position: 'right',
          distance: 12
        },
        vertical: {
          position: 'top',
          distance: 12,
          gap: 10
        }
      },
      theme: 'material',
      behaviour: {
        autoHide: 5000,
        onMouseover: 'pauseAutoHide',
        showDismissButton: true,
      },
      animations: {
        enabled: true,
        show: {
          preset: 'slide',
          speed: 300,
          easing: 'ease'
        },
        hide: {
          preset: 'fade',
          speed: 300,
          easing: 'ease',
          offset: 50
        },
        shift: {
          speed: 300,
          easing: 'ease'
        },
        overlap: 150
      }
    }),
    RestangularModule.forRoot(RestangularConfigFactory),
    NgxSmartModalModule.forRoot()
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
