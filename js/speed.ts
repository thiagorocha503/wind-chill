abstract class Speed {

    protected _value: number;

    constructor(value: number){
        this._value = value;
    }

    abstract toMilesPerHour(): MilesPerHours;

    get value(): number { return this._value;}

}

class Knot extends Speed {

    constructor(value: number){
        super(value);
    }
  
    public toMilesPerHour() {
      return new MilesPerHours(this.value * 1.151);
    }

}

class FeetPerSecond extends Speed {

    constructor( value: number){
        super(value);
    }
    
    public toMilesPerHour() {
      return new MilesPerHours(this.value / 1.467);
    }
}

class KilometersPerHour extends Speed {

    constructor( value: number){
        super(value);
    }
  
    public toMilesPerHour() {
      return new MilesPerHours(this.value / 1.609);
    }

}
  
class MetersPerSecond extends Speed {

    constructor( value: number){
        super(value);
    }
  
    public toMilesPerHour() {
      return new MilesPerHours(this.value * 2.237);
    }

}
  
class MilesPerHours extends Speed {

    constructor( value: number) {
        super(value);
    }
  
    public toMilesPerHour() {
      return new MilesPerHours(this.value);
    }

}
  
class SpeedFactory {

    static createSpeed(system: string, value: number): Speed {
      switch (system) {
        case "kmh":
          return new KilometersPerHour(value);
        case "knot":
          return new Knot(value);
        case "ms":
          return new MetersPerSecond(value);
        case "mph":
          return new MilesPerHours(value);
        case "fts":
          return new FeetPerSecond(value);
        default:
            throw Error("Invalid speed");
      }
    }

}
  