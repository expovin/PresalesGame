import { Injectable } from '@angular/core';
import { RestangularModule, Restangular } from 'ngx-restangular';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import { Presale } from '../shared/presale';

import 'rxjs/add/operator/catch';

@Injectable({
  providedIn: 'root'
})
export class PresalesService {

  constructor(private http: Http, 
              private restangular: Restangular,
              private processHTTPMsgService: ProcessHTTPMsgService) { }

  getPresales(gameId): Observable <Presale[]> {

    const headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'gameID' : gameId
    }

    const requestOptions = {                                                                                                                                                                                 
      headers: new Headers(headerDict), 
    };

    return this.http.get(baseURL + 'presales', requestOptions)
            .map(res => { return this.processHTTPMsgService.extractData(res); });
  } 


  getPresale(PresaleId, gameId): Observable <Presale[]> {

    const headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'gameID' : gameId
    }

    const requestOptions = {                                                                                                                                                                                 
      headers: new Headers(headerDict), 
    };

    return this.http.get(baseURL + 'presales/'+PresaleId, requestOptions)
            .map(res => { return this.processHTTPMsgService.extractData(res); });
  } 
}

