import { Injectable } from '@angular/core';
import { RestangularModule, Restangular } from 'ngx-restangular';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import { Company } from '../shared/company';

import 'rxjs/add/operator/catch';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http: Http, 
              private restangular: Restangular,
              private processHTTPMsgService: ProcessHTTPMsgService) { }

  getDetails(idCompany,gameId) : Observable <Company[]> {

    const headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'gameID' : gameId
    }
    
    const requestOptions = {                                                                                                                                                                                 
      headers: new Headers(headerDict), 
    };

    return this.http.get(baseURL + 'companies/'+idCompany, requestOptions)
            .map(res => { return this.processHTTPMsgService.extractData(res); });
  } 

  getCompanies(gameId) : Observable <Company[]> {

    const headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'gameID' : gameId
    }
    
    const requestOptions = {                                                                                                                                                                                 
      headers: new Headers(headerDict), 
    };

    return this.http.get(baseURL + 'companies/', requestOptions)
            .map(res => { return this.processHTTPMsgService.extractData(res); });
  } 

  getMessage(idCompany,gameId) : Observable <Company[]> {

    const headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'gameID' : gameId
    }
    
    const requestOptions = {                                                                                                                                                                                 
      headers: new Headers(headerDict), 
    };

    return this.http.get(baseURL + 'companies/'+idCompany+'/message', requestOptions)
            .map(res => { return this.processHTTPMsgService.extractData(res); });
  }   

  enableBAM(idCompany,gameId) : Observable <Object[]> {

    const headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'gameID' : gameId
    }
    
    const requestOptions = {                                                                                                                                                                                 
      headers: new Headers(headerDict), 
    };

    return this.http.post(baseURL + 'companies/'+idCompany+'/BAM',{} ,requestOptions)
            .map(res => { return this.processHTTPMsgService.extractData(res); });
  }   

  enableTOP(idCompany,gameId) : Observable <Object[]> {

    const headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'gameID' : gameId
    }
    
    const requestOptions = {                                                                                                                                                                                 
      headers: new Headers(headerDict), 
    };

    return this.http.post(baseURL + 'companies/'+idCompany+'/TOP',{}, requestOptions)
            .map(res => { return this.processHTTPMsgService.extractData(res); });
  }  

  disableBAM(idCompany,gameId) : Observable <Object[]> {

    const headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'gameID' : gameId
    }
    
    const requestOptions = {                                                                                                                                                                                 
      headers: new Headers(headerDict), 
    };

    return this.http.delete(baseURL + 'companies/'+idCompany+'/BAM', requestOptions)
            .map(res => { return this.processHTTPMsgService.extractData(res); });
  }   

  disableTOP(idCompany,gameId) : Observable <Object[]> {

    const headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'gameID' : gameId
    }
    
    const requestOptions = {                                                                                                                                                                                 
      headers: new Headers(headerDict), 
    };

    return this.http.delete(baseURL + 'companies/'+idCompany+'/TOP', requestOptions)
            .map(res => { return this.processHTTPMsgService.extractData(res); });
  }   
  
  getCampain(idCompany,gameId, hours, cost) : Observable <Object[]> {

    const headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'gameID' : gameId
    }
    
    const requestOptions = {                                                                                                                                                                                 
      headers: new Headers(headerDict), 
    };

    return this.http.post(baseURL + 'companies/'+idCompany+'/Campain',{cost:cost, hours:hours}, requestOptions)
            .map(res => { return this.processHTTPMsgService.extractData(res); });
  }    

  delCampain(idCompany,gameId, idx) : Observable <Object[]> {

    const headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'gameID' : gameId
    }
    
    const requestOptions = {                                                                                                                                                                                 
      headers: new Headers(headerDict), 
    };

    return this.http.put(baseURL + 'companies/'+idCompany+'/Campain',{idx:idx}, requestOptions)
            .map(res => { return this.processHTTPMsgService.extractData(res); });
  }   

  toggleValueConstraint(idCompany,gameId){
    const headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'gameID' : gameId
    }
    
    const requestOptions = {                                                                                                                                                                                 
      headers: new Headers(headerDict), 
    };

    return this.http.put(baseURL + 'companies/'+idCompany+'/filter/value',{} ,requestOptions)
            .map(res => { return this.processHTTPMsgService.extractData(res); });
  }    
  
  changeValueConstraint(idCompany,gameId,values){
    const headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'gameID' : gameId
    }
    
    const requestOptions = {                                                                                                                                                                                 
      headers: new Headers(headerDict), 
    };

    return this.http.post(baseURL + 'companies/'+idCompany+'/filter/value',{oppyValues:values} ,requestOptions)
            .map(res => { return this.processHTTPMsgService.extractData(res); });
  }  

  toggleValueQualification(idCompany,gameId){
    const headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'gameID' : gameId
    }
    
    const requestOptions = {                                                                                                                                                                                 
      headers: new Headers(headerDict), 
    };

    return this.http.put(baseURL + 'companies/'+idCompany+'/filter/qualification',{} ,requestOptions)
            .map(res => { return this.processHTTPMsgService.extractData(res); });
  }    

  changeValueQualification(idCompany,gameId, values){
    const headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'gameID' : gameId
    }
    
    const requestOptions = {                                                                                                                                                                                 
      headers: new Headers(headerDict), 
    };

    return this.http.post(baseURL + 'companies/'+idCompany+'/filter/qualification',{oppyQualifications:values} ,requestOptions)
            .map(res => { return this.processHTTPMsgService.extractData(res); });
  }  

  improveProductFeature(idCompany, gameId, feature, money){
    const headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'gameID' : gameId
    }
    
    const requestOptions = {                                                                                                                                                                                 
      headers: new Headers(headerDict), 
    };

    return this.http.post(baseURL + 'companies/'+idCompany+'/ProductFeature',{feature:feature, money:money} ,requestOptions)
            .map(res => { return this.processHTTPMsgService.extractData(res); });    
  }
}
