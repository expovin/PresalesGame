import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private companyName: string;

  constructor() { }

  setCompanyName(companyName : string){
    
    this.companyName=companyName;
    console.log("Setting company name to : ",this.companyName);
  }

  getCompanyName(): string{
    console.log("getting CompanyName: ",this.companyName);
    return this.companyName;
  }
}
