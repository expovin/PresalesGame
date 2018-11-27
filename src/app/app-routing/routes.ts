import { Routes } from '@angular/router';

import { DashboardComponent } from '../dashboard/dashboard.component';
import { MarketComponent } from '../market/market.component';
import { OpportunitiesComponent } from '../opportunities/opportunities.component';
import  { PeopleComponent } from '../people/people.component';
import  { BamComponent } from '../bam/bam.component';
import  { TopComponent } from '../top/top.component';

export const routes: Routes = [
  { path: 'dashboard',  component: DashboardComponent },
  { path: 'market',     component: MarketComponent },
  { path: 'oppy',     component: OpportunitiesComponent },
  { path: 'people',     component: PeopleComponent },
  { path: 'bam',     component: BamComponent },
  { path: 'top',     component: TopComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }

];