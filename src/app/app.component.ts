import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult } from '@azure/msal-browser';
import { CalculatorServiceService } from './services/calculator-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ngcalculator';
  apiResponse: string | undefined;



  constructor(private msalService:MsalService,private calculatorService: CalculatorServiceService)
  {

  }
  ngOnInit(): void {
    this.msalService.initialize();
    this.msalService.instance.handleRedirectPromise().then(res=>{
      if(res!=null && res.account!=null)
      {
        this.msalService.instance.setActiveAccount(res.account)
      }
    })
  }


  // isLoggedIn():boolean{
  //   return this.msalService.instance.getActiveAccount()!=null;
  // }
  isLoggedIn():boolean
 {
   if(this.msalService.instance.getActiveAccount()!=null)
   {
    // console.log("true")
     return true;
   }
  //  console.log("false")
   return false;
 }


  login()
  {
    //initialize etmeyince hata veriyor
    // this.msalService.initialize();
    this.msalService.loginPopup().subscribe((response:AuthenticationResult)=>{
      this.msalService.instance.setActiveAccount(response.account)
    });
    // this.msalService.loginRedirect();


  }

  logout()
  {
    this.msalService.logout();
  }
  callProfile()
  {
   this.calculatorService.callProfile();
  }
}
