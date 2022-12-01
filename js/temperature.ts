abstract class Temperature  {

    protected _value: number;

    constructor(value: number){
        this._value = value
    }

    get value(): number { return this._value;}
    
    abstract toFahrenheit(): Fahrenheit;
    abstract toCelcius(): Celcius;
   
}

class Fahrenheit extends Temperature {
    
    constructor(value: number){
        super(value);
    }
  
    public toFahrenheit() {
      return new Fahrenheit(this.value);
    }

    public toCelcius(): Celcius {
      return new Celcius((this.value - 32) * (5/9));


    }

}
  
class Celcius extends Temperature {

    constructor(value: number) {
        super(value);
    }
    
    public toFahrenheit() : Fahrenheit {
      return new Fahrenheit((this.value * 9 / 5) + 32);
    }

    public toCelcius(): Celcius {
      return new Celcius(this.value);
    }
  
}
  
class TemperatureFactory {

    static createTemperature(system: string, value: number): Temperature {
      
      switch (system) {
        case "celcius":
          return new Celcius(value);
        case "fahrenheit":
          return new Fahrenheit(value);
        default:
          throw Error("Invalid temperature system");
      }
    }

}
  