import { Injectable } from '@angular/core';
import { RestangularModule, Restangular } from 'ngx-restangular';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import { Market } from '../shared/market';

import 'rxjs/add/operator/catch';

@Injectable({
  providedIn: 'root'
})
export class MarketService {

  constructor(private http: Http, 
    private restangular: Restangular,
    private processHTTPMsgService: ProcessHTTPMsgService) { }

    getTrends(gameId): Observable <Market[]>{
      const headerDict = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'gameID' : gameId
      }
      
      const requestOptions = {                                                                                                                                                                                 
        headers: new Headers(headerDict), 
      };

      return this.http.get(baseURL + 'market', requestOptions)
              .map(res => { return this.processHTTPMsgService.extractData(res); });
    } 

    getTeamAvgSatisfaction(gameId, CompanyId): Observable <Object[]> {
      const headerDict = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'gameID' : gameId
      }
      
      const requestOptions = {                                                                                                                                                                                 
        headers: new Headers(headerDict), 
      };

      return this.http.get(baseURL + 'market/avgSatisfaction/'+CompanyId, requestOptions)
              .map(res => { return this.processHTTPMsgService.extractData(res); });
    }

    getTeamAvgTrends(gameId, CompanyId): Observable <Object[]> {
      const headerDict = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'gameID' : gameId
      }
      
      const requestOptions = {                                                                                                                                                                                 
        headers: new Headers(headerDict), 
      };

      return this.http.get(baseURL + 'market/avgTeamTrends/'+CompanyId, requestOptions)
              .map(res => { return this.processHTTPMsgService.extractData(res); });
    }


    placeOffer(gameId, CompanyId, PersonId, offer){
      const headerDict = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'gameID' : gameId
      }
      
      const requestOptions = {                                                                                                                                                                                 
        headers: new Headers(headerDict), 
      };

      return this.http.post(baseURL + 'market/proposal/'+CompanyId+'/'+PersonId, {value:offer},requestOptions)
              .map(res => { return this.processHTTPMsgService.extractData(res); });
    }

    removeOffer(gameId, CompanyId, PersonId){
      const headerDict = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'gameID' : gameId
      }
      
      const requestOptions = {                                                                                                                                                                                 
        headers: new Headers(headerDict), 
      };

      return this.http.delete(baseURL + 'market/proposal/'+CompanyId+'/'+PersonId,requestOptions)
              .map(res => { return this.processHTTPMsgService.extractData(res); });
    }

    offerRetentionBonus(gameId, CompanyId, PersonId, offer){
      const headerDict = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'gameID' : gameId
      }
      
      const requestOptions = {                                                                                                                                                                                 
        headers: new Headers(headerDict), 
      };

      return this.http.post(baseURL + 'market/retentionBonus/'+CompanyId+'/'+PersonId, {money:offer},requestOptions)
              .map(res => { return this.processHTTPMsgService.extractData(res); });
    }    

    enrollCourse(gameId, CompanyId, PersonId, feature, money, hours, gain, type){
      const headerDict = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'gameID' : gameId
      }
      
      const requestOptions = {                                                                                                                                                                                 
        headers: new Headers(headerDict), 
      };
      
      if(type===0)
        return this.http.post(baseURL + 'market/course/'+CompanyId+'/'+PersonId, {feature:feature, money:money, hours:hours, quantity:gain},requestOptions)
                .map(res => { return this.processHTTPMsgService.extractData(res); });
      else
        return this.http.post(baseURL + 'market/course/'+CompanyId+'/'+PersonId, {marketTrend:feature, money:money, hours:hours, quantity:gain},requestOptions)
                .map(res => { return this.processHTTPMsgService.extractData(res); });              
    }      
    
    
    confirmOffer(gameId, CompanyId, PersonId){
      const headerDict = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'gameID' : gameId
      }
      
      const requestOptions = {                                                                                                                                                                                 
        headers: new Headers(headerDict), 
      };

      return this.http.post(baseURL + 'market/evaluate', {personID:PersonId, companyID:CompanyId},requestOptions)
              .map(res => { return this.processHTTPMsgService.extractData(res); });
    }    

    declineOffer(gameId, CompanyId, PersonId){
      const headerDict = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'gameID' : gameId
      }
      
      const requestOptions = {                                                                                                                                                                                 
        headers: new Headers(headerDict), 
      };

      return this.http.put(baseURL + 'market/evaluate/', {personID:PersonId, companyID:CompanyId},requestOptions)
              .map(res => { return this.processHTTPMsgService.extractData(res); });
    }    
  }

