import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MSAL_INSTANCE, MSAL_INTERCEPTOR_CONFIG, MsalGuardConfiguration, MsalInterceptor, MsalInterceptorConfiguration, MsalModule, MsalRedirectComponent, MsalService } from '@azure/msal-angular';
import { IPublicClientApplication, InteractionType, PublicClientApplication } from '@azure/msal-browser';
import { environment } from 'src/environments/environment.development';
const isIE=window.navigator.userAgent.indexOf('MSIE')>-1
||window.navigator.userAgent.indexOf('Trident/')>-1

export function MsalInstanceFactory():IPublicClientApplication
{
  return new PublicClientApplication(
    {
      auth:{
        clientId:'548d24a6-6546-443c-b343-ae10459d98ae',

        redirectUri:'http://localhost:4200',
         authority:'https://login.microsoftonline.com/common'



      },
      cache:
      {
        cacheLocation:'localStorage',
        storeAuthStateInCookie:isIE
      }
    }
  )
}



export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<string, Array<string>>();
  protectedResourceMap.set('localhost', ['api://9d07821d-6487-4c61-be7f-68edaf33b2b4/data.save']);

  return {
    interactionType: InteractionType.Popup,
    protectedResourceMap
  };
}

export function MsalGuardConfigFactory():MsalGuardConfiguration
{
  return {
    interactionType:InteractionType.Popup,
  };
}


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CalculatorComponent
  ],
  imports: [
    BrowserModule,
    MsalModule,
    HttpClientModule
  ],
  providers: [

    // login ve logout u yönetmek için msal tarafından oluşturulmuş bir servis
    {
      provide:HTTP_INTERCEPTORS,
      useClass:MsalInterceptor,
      multi:true
    },
    {
      provide:MSAL_INSTANCE,
      useFactory:MsalInstanceFactory
    },
    {
      provide:MSAL_INTERCEPTOR_CONFIG,
      useFactory:MSALInterceptorConfigFactory
    },
    MsalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
