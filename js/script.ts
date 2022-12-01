const temperature_input: HTMLInputElement = document.getElementById("input-temperature") as HTMLInputElement;
const speed_input: HTMLInputElement = document.getElementById("speed-input") as HTMLInputElement;
const result: HTMLElement = document.getElementById("result") as HTMLElement;
const speed_feedback: HTMLElement = document.getElementById("speed-feedback") as HTMLElement;
    
(document.getElementById("btn-calculate") as HTMLButtonElement).addEventListener("click", ()=>{
    calculate()
});
    
function calculate(){
    let temperature_value: number;
    let speed_value: number;
        
    if(!validate()){
        return;
    }
    temperature_value = parseFloat(temperature_input.value);
    speed_value = parseFloat(speed_input.value);
    
    let temperature: Temperature = TemperatureFactory.createTemperature("celcius", temperature_value);
    let speed: Speed = SpeedFactory.createSpeed("kmh", temperature_value);
    let windchill: Fahrenheit = WindChillCalculator.calculate(temperature, speed);  
    result.innerHTML = `Wind chill: ${windchill.value.toFixed(2)}°F(${windchill.toCelcius().value.toFixed(2)})°C`;
}
 
function validate(): boolean{
    // reset
    speed_input.classList.remove("is-invalid")
    temperature_input.classList.remove("is-invalid")
    let erros: number = 0;
    if(temperature_input.value == ""){
        temperature_input.classList.add("is-invalid")
        erros += 1;         
    }
    if(speed_input.value == ""){
        speed_input.classList.add("is-invalid")
        speed_feedback.innerHTML = "Fill out this field"
        erros += 1
    }
    let speed_value = parseFloat(speed_input.value);
    if(speed_value <= 0){
        speed_input.classList.add("is-invalid")
        speed_feedback.innerHTML = "Invalid speed"
        erros += 1
            
    }
    return erros == 0 ? true:false;
}