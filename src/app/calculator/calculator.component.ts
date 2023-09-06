import { Component, OnInit } from '@angular/core';
import { CalculateModel } from '../models/calculate.model';
import { CalculatorServiceService } from '../services/calculator-service.service';

@Component({
  selector: 'calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {

  currentNumber = '0';
  firstOperand=0;
  operator = "";
  waitForSecondNumber = false;
  numbers:string[]=[];
  ops:string[]=[];

  calculateData: CalculateModel = {

    result: 0
  };

  constructor(private calculatorService: CalculatorServiceService) { }

  ngOnInit() {
  }

  public getNumber(v: string){
    //burada sayı üretiliyor
   // console.log("getNumber"+v);
    if(this.waitForSecondNumber)
    {
      this.currentNumber = v;
      this.waitForSecondNumber = false;
    }else{
      this.currentNumber === '0'? this.currentNumber = v: this.currentNumber += v;

    }
    //console.log("currenNumber"+this.currentNumber);
  }

  getDecimal(){
    if(!this.currentNumber.includes('.')){
        this.currentNumber += '.';
    }
  }
  private faktoriyel(sayi:number)
  {
    console.log(sayi)
    var toplam=1;

    for(var i=1;i<sayi+1;i++)
    {
      toplam*=i;
    }
    console.log(toplam)
    return toplam;
  }

  private doCalculation(op:any , secondOp:any){
    switch (op){
      case '+':
      return this.firstOperand += secondOp;
      case '-':
      return this.firstOperand -= secondOp;
      case '*':
      return this.firstOperand *= secondOp;
      case '/':
      return this.firstOperand /= secondOp;
      case 'x!':
      return this.firstOperand=this.faktoriyel(secondOp);
      case 'karekök':
      return this.firstOperand=Math.sqrt(secondOp);
      case 'kare':
      return this.firstOperand=secondOp*secondOp;
      case 'ln':
      return this.firstOperand=Math.log(secondOp);
      case 'e':
      return this.firstOperand=Math.E*secondOp;
      //burada radyan cinsinden hesaplıyor
      case 'sin':
      return this.firstOperand=Math.sin(secondOp);
      case 'cos':
      return this.firstOperand=Math.cos(secondOp);
      case 'tan':
      return this.firstOperand=Math.tan(secondOp);
      case '=':
      return secondOp;

    }
  }
  public getOperation(op: string){
    //console.log(op);

    this.numbers.push(this.currentNumber);
    this.ops.push(op);
    console.log(op)


    //ilk baştaki işaret yoksa ilk sayıyı ilk girilen sayıyı atıyor

    if(this.firstOperand === 0){
      this.firstOperand = Number(this.currentNumber);
      console.log(this.firstOperand)

    }else if(this.operator){
      const result = this.doCalculation(this.operator , Number(this.currentNumber))
      //do calculation ın içine giden sayı şu an elimizde bulunan sayı dolayısıyla secondoperand şu anki sayı oluyor.
      this.currentNumber = String(result);
      console.log(op)
      console.log(this.currentNumber)
      this.firstOperand = Number(result);
    }
    if(op=="=")
    {

      this.calculateData.result=this.firstOperand;
      this.calculatorService.sendData(this.calculateData);
      console.log(this.calculateData.result);

    }
    this.operator = op;
    this.waitForSecondNumber = true;

    //console.log("first operand değeri burada"+this.firstOperand);

  }

  public clear(){
    this.currentNumber = '0';

    console.log(this.calculateData.result);
    this.firstOperand = 0;
    this.operator = "";
    this.waitForSecondNumber = false;
  }





}
