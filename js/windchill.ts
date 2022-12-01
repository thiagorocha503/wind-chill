class WindChillCalculator {

    /*
 
    @param:  T = Temperature in degrees Fahrenheit
    @param: V = Wind velocity in miles per hour

    @return: Temperature

    */
    static calculate(temperature: Temperature,speed:  Speed): Fahrenheit {
      let T: number = temperature.toFahrenheit().value;
      let V: number = speed.toMilesPerHour().value;
      let result: number = 35.74 +
          (0.6215 * T) -
          (35.75 * Math.pow(V, 0.16)) +
          (0.4275 * T * Math.pow(V, 0.16));
      return new Fahrenheit(result);
    }

}
  