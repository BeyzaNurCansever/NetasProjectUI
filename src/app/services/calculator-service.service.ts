import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { CalculateModel } from '../models/calculate.model';

@Injectable({
  providedIn: 'root'
})

export class CalculatorServiceService {

  baseApiURL:string=environment.baseApiURL;
  apiResponse: string | undefined;


  constructor(private http:HttpClient) { }

sendData(data:CalculateModel)
{
  console.log(data);

  this.http.post<number>(this.baseApiURL+'/api/Calculator', data)
  .subscribe(
    response => {
      console.log('Response:', response);
    },
    error => {
      console.error('Error:', error);
    }
  );


}

callProfile()
{
  this.http.get("https://graph.microsoft.com/v1.0/me").subscribe(res=>{
    this.apiResponse=JSON.stringify(res);
    console.log("buraya girdi.")
    console.log(this.apiResponse)
  })
}

}
