import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private pageStatus =  new Subject<any>();
  private companyDetails = new Subject<any>();

  constructor() { }

  setCompany(state: any) {
    this.companyDetails.next(state);
  }

  getCompany(): Observable<any> {
    return this.companyDetails.asObservable();
  }  

  setPageStatus(state: any) {
    this.pageStatus.next(state);
  }

  getPageStatus(): Observable<any> {
    return this.pageStatus.asObservable();
  }   
}
