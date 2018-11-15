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
}
