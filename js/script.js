"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var temperature_input = document.getElementById("input-temperature");
var speed_input = document.getElementById("speed-input");
var result = document.getElementById("result");
var speed_feedback = document.getElementById("speed-feedback");
document.getElementById("btn-calculate").addEventListener("click", function () {
    calculate();
});
function calculate() {
    var temperature_value;
    var speed_value;
    if (!validate()) {
        return;
    }
    temperature_value = parseFloat(temperature_input.value);
    speed_value = parseFloat(speed_input.value);
    var temperature = TemperatureFactory.createTemperature("celcius", temperature_value);
    var speed = SpeedFactory.createSpeed("kmh", temperature_value);
    var windchill = WindChillCalculator.calculate(temperature, speed);
    result.innerHTML = "Wind chill: ".concat(windchill.value.toFixed(2), "\u00B0F(").concat(windchill.toCelcius().value.toFixed(2), ")\u00B0C");
}
function validate() {
    speed_input.classList.remove("is-invalid");
    temperature_input.classList.remove("is-invalid");
    var erros = 0;
    if (temperature_input.value == "") {
        temperature_input.classList.add("is-invalid");
        erros += 1;
    }
    if (speed_input.value == "") {
        speed_input.classList.add("is-invalid");
        speed_feedback.innerHTML = "Fill out this field";
        erros += 1;
    }
    var speed_value = parseFloat(speed_input.value);
    if (speed_value <= 0) {
        speed_input.classList.add("is-invalid");
        speed_feedback.innerHTML = "Invalid speed";
        erros += 1;
    }
    return erros == 0 ? true : false;
}
var Speed = (function () {
    function Speed(value) {
        this._value = value;
    }
    Object.defineProperty(Speed.prototype, "value", {
        get: function () { return this._value; },
        enumerable: false,
        configurable: true
    });
    return Speed;
}());
var Knot = (function (_super) {
    __extends(Knot, _super);
    function Knot(value) {
        return _super.call(this, value) || this;
    }
    Knot.prototype.toMilesPerHour = function () {
        return new MilesPerHours(this.value * 1.151);
    };
    return Knot;
}(Speed));
var FeetPerSecond = (function (_super) {
    __extends(FeetPerSecond, _super);
    function FeetPerSecond(value) {
        return _super.call(this, value) || this;
    }
    FeetPerSecond.prototype.toMilesPerHour = function () {
        return new MilesPerHours(this.value / 1.467);
    };
    return FeetPerSecond;
}(Speed));
var KilometersPerHour = (function (_super) {
    __extends(KilometersPerHour, _super);
    function KilometersPerHour(value) {
        return _super.call(this, value) || this;
    }
    KilometersPerHour.prototype.toMilesPerHour = function () {
        return new MilesPerHours(this.value / 1.609);
    };
    return KilometersPerHour;
}(Speed));
var MetersPerSecond = (function (_super) {
    __extends(MetersPerSecond, _super);
    function MetersPerSecond(value) {
        return _super.call(this, value) || this;
    }
    MetersPerSecond.prototype.toMilesPerHour = function () {
        return new MilesPerHours(this.value * 2.237);
    };
    return MetersPerSecond;
}(Speed));
var MilesPerHours = (function (_super) {
    __extends(MilesPerHours, _super);
    function MilesPerHours(value) {
        return _super.call(this, value) || this;
    }
    MilesPerHours.prototype.toMilesPerHour = function () {
        return new MilesPerHours(this.value);
    };
    return MilesPerHours;
}(Speed));
var SpeedFactory = (function () {
    function SpeedFactory() {
    }
    SpeedFactory.createSpeed = function (system, value) {
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
    };
    return SpeedFactory;
}());
var Temperature = (function () {
    function Temperature(value) {
        this._value = value;
    }
    Object.defineProperty(Temperature.prototype, "value", {
        get: function () { return this._value; },
        enumerable: false,
        configurable: true
    });
    return Temperature;
}());
var Fahrenheit = (function (_super) {
    __extends(Fahrenheit, _super);
    function Fahrenheit(value) {
        return _super.call(this, value) || this;
    }
    Fahrenheit.prototype.toFahrenheit = function () {
        return new Fahrenheit(this.value);
    };
    Fahrenheit.prototype.toCelcius = function () {
        return new Celcius((this.value - 32) * (5 / 9));
    };
    return Fahrenheit;
}(Temperature));
var Celcius = (function (_super) {
    __extends(Celcius, _super);
    function Celcius(value) {
        return _super.call(this, value) || this;
    }
    Celcius.prototype.toFahrenheit = function () {
        return new Fahrenheit((this.value * 9 / 5) + 32);
    };
    Celcius.prototype.toCelcius = function () {
        return new Celcius(this.value);
    };
    return Celcius;
}(Temperature));
var TemperatureFactory = (function () {
    function TemperatureFactory() {
    }
    TemperatureFactory.createTemperature = function (system, value) {
        switch (system) {
            case "celcius":
                return new Celcius(value);
            case "fahrenheit":
                return new Fahrenheit(value);
            default:
                throw Error("Invalid temperature system");
        }
    };
    return TemperatureFactory;
}());
var WindChillCalculator = (function () {
    function WindChillCalculator() {
    }
    WindChillCalculator.calculate = function (temperature, speed) {
        var T = temperature.toFahrenheit().value;
        var V = speed.toMilesPerHour().value;
        var result = 35.74 +
            (0.6215 * T) -
            (35.75 * Math.pow(V, 0.16)) +
            (0.4275 * T * Math.pow(V, 0.16));
        return new Fahrenheit(result);
    };
    return WindChillCalculator;
}());
