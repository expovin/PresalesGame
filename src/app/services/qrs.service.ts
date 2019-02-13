import { Injectable } from '@angular/core';
import { RestangularModule, Restangular } from 'ngx-restangular';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';

@Injectable({
  providedIn: 'root'
})
export class QrsService {

  constructor(private http: Http, 
    private restangular: Restangular,
    private processHTTPMsgService: ProcessHTTPMsgService) { }

    addCustomProp(gameId, userId, customProp) : Observable <any> {

      const headerDict = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'gameID' : gameId
      }
      
      const requestOptions = {                                                                                                                                                                                 
        headers: new Headers(headerDict), 
      };
  
      return this.http.put(baseURL + 'QIX/user/'+userId+'/custProp', {custProp : customProp},requestOptions)
              .map(res => { return this.processHTTPMsgService.extractData(res); });
    } 

    delCustomProp(gameId, userId, customProp) : Observable <any> {

      const headerDict = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'gameID' : gameId,
        'custProp':customProp
      }
      
      const requestOptions = {                                                                                                                                                                                 
        headers: new Headers(headerDict), 
      };
  
      return this.http.delete(baseURL + 'QIX/user/'+userId+'/custProp', requestOptions)
              .map(res => { return this.processHTTPMsgService.extractData(res); });
    }   
    
    getQSToken(trigram): Observable <any> {

      const headerDict = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
      
      const requestOptions = {                                                                                                                                                                                 
        headers: new Headers(headerDict), 
      };
  
      return this.http.get(baseURL + 'QIX/token/'+trigram, requestOptions)
              .map(res => { return this.processHTTPMsgService.extractData(res); });
    }
}
