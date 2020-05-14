var speedInput = document.getElementById("speedInput");
var temperatureInput = document.getElementById("temperatureInput");
var temperatureLabel = document.getElementById("temperatureLabel");
var speedLabel = document.getElementById("speedLabel");
var systemSelect = document.getElementById("measurementSystemSelect");
var SYSTEM_ENGLISH = "english-system";
var SYSTEM_METRIC = "metric-system";
var result = document.getElementById("result");
var previousSpeed = 0;
var previousTemperature = 0;
var previousSystem = SYSTEM_ENGLISH;
// Event change measurement system select
systemSelect.addEventListener("change", function (e) {
    console.log("New select> " + systemSelect.value);
    if (systemSelect.value == SYSTEM_ENGLISH) {
        temperatureLabel.innerHTML = "Temperature (°F)";
        speedLabel.innerHTML = "Wind speed (mph)";
    }
    else {
        temperatureLabel.innerHTML = "Temperature (°C)";
        speedLabel.innerHTML = "Wind speed (km/h)";
    }
});
function onCalculate() {
    document.getElementById("resul-container").style.display = "none";
    if (isEmptyFields(speedInput.value, temperatureInput.value)) {
        alert("Fill out all fields");
        return;
    }
    var currentTemperature = parseFloat(temperatureInput.value);
    var currentSpeed = parseFloat(speedInput.value);
    var currentSystem = systemSelect.value;
    console.log("previous> T: " + previousTemperature + ", S: " + previousSpeed + ", $: " + previousSystem);
    console.log("current> T: " + currentTemperature + ", S: " + currentSpeed + ", $: " + currentSystem);
    if (!isChangedFieldValues(currentSpeed, currentTemperature, currentSystem)) {
        alert("Enter new values");
        return;
    }
    previousTemperature = currentTemperature;
    previousSpeed = currentSpeed;
    previousSystem = currentSystem;
    console.log("select> " + systemSelect.value);
    document.getElementById("resul-container").style.display = "block";
    if (systemSelect.value == SYSTEM_ENGLISH) {
        result.innerHTML = windchillEnglish(currentTemperature, currentSpeed).toFixed(3) + "°F";
    }
    else {
        result.innerHTML = windChillMetric(currentTemperature, currentSpeed).toFixed(3) + "°C";
    }
}
function isChangedFieldValues(currentSpeed, currentTemperature, currentSystem) {
    if ((currentTemperature != previousTemperature) || (currentSpeed != previousSpeed) || (currentSystem != previousSystem)) {
        return true;
    }
    else {
        return false;
    }
}
function isEmptyFields(field1, field2) {
    return (field1 == "") || (field2 == "");
}
function windchillEnglish(T, V) {
    return 35.74 + (0.6215 * T) - (35.75 * Math.pow(V, 0.16)) + (0.4275 * T * Math.pow(V, 0.16));
}
function windChillMetric(T, V) {
    return 33 + (10 * Math.sqrt(V) + 10.45 - V) * ((T - 32) / 22);
}
/*


Metric

ST = 33 + (10 * Math.sqrt(v)+ 10.45 - v) * ((T-32)/22)

T = temperatura °C
v = velocidade do vento km/h


Ex: 5°C e 40km/h = -9.5°C

English

Wind chill = 35.74 + 0.6215T – 35.75 (V^0.16) + 0.4275T (V^0.16)

T = Temperature in degrees Fahrenheit
V = Wind velocity in miles per hour

Example: Calculate wind chill factor for a temperature of minus 20 degrees Fahrenheit and a wind speed of 55 miles per hour.

W (T, V) = 35.74 –12.43 – 35.75 (1.90) –8.55 (1.90)
W (T, V) = 35.74 –12.43 – 67.93 – 16.25 = 60.87

*/
