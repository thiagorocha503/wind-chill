"use strict";var _a,__extends=this&&this.__extends||function(){var r=function(e,t){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])})(e,t)};return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Class extends value "+String(t)+" is not a constructor or null");function n(){this.constructor=e}r(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)}}(),temperature_input=document.getElementById("input-temperature"),speed_input=document.getElementById("speed-input"),result=document.getElementById("result"),speed_feedback=document.getElementById("speed-feedback");function calculate(){var e,t;validate()&&(t=parseFloat(temperature_input.value),parseFloat(speed_input.value),e=TemperatureFactory.createTemperature("celcius",t),t=SpeedFactory.createSpeed("kmh",t),t=WindChillCalculator.calculate(e,t),result.innerHTML="Wind chill: ".concat(t.value.toFixed(2),"°F(").concat(t.toCelcius().value.toFixed(2),")°C"))}function validate(){speed_input.classList.remove("is-invalid"),temperature_input.classList.remove("is-invalid");var e=0;return""==temperature_input.value&&(temperature_input.classList.add("is-invalid"),e+=1),""==speed_input.value&&(speed_input.classList.add("is-invalid"),speed_feedback.innerHTML="Fill out this field",e+=1),parseFloat(speed_input.value)<=0&&(speed_input.classList.add("is-invalid"),speed_feedback.innerHTML="Invalid speed",e+=1),0==e}null!==(_a=document.getElementById("btn-calculate"))&&void 0!==_a&&_a.addEventListener("click",function(){calculate()});var Speed=function(){function e(e){this._value=e}return Object.defineProperty(e.prototype,"value",{get:function(){return this._value},enumerable:!1,configurable:!0}),e}(),Knot=function(t){function e(e){return t.call(this,e)||this}return __extends(e,t),e.prototype.toMilesPerHour=function(){return new MilesPerHours(1.151*this.value)},e}(Speed),FeetPerSecond=function(t){function e(e){return t.call(this,e)||this}return __extends(e,t),e.prototype.toMilesPerHour=function(){return new MilesPerHours(this.value/1.467)},e}(Speed),KilometersPerHour=function(t){function e(e){return t.call(this,e)||this}return __extends(e,t),e.prototype.toMilesPerHour=function(){return new MilesPerHours(this.value/1.609)},e}(Speed),MetersPerSecond=function(t){function e(e){return t.call(this,e)||this}return __extends(e,t),e.prototype.toMilesPerHour=function(){return new MilesPerHours(2.237*this.value)},e}(Speed),MilesPerHours=function(t){function e(e){return t.call(this,e)||this}return __extends(e,t),e.prototype.toMilesPerHour=function(){return new e(this.value)},e}(Speed),SpeedFactory=function(){function e(){}return e.createSpeed=function(e,t){switch(e){case"kmh":return new KilometersPerHour(t);case"knot":return new Knot(t);case"ms":return new MetersPerSecond(t);case"mph":return new MilesPerHours(t);case"fts":return new FeetPerSecond(t);default:throw Error("Invalid speed")}},e}(),Temperature=function(){function e(e){this._value=e}return Object.defineProperty(e.prototype,"value",{get:function(){return this._value},enumerable:!1,configurable:!0}),e}(),Fahrenheit=function(t){function e(e){return t.call(this,e)||this}return __extends(e,t),e.prototype.toFahrenheit=function(){return new e(this.value)},e.prototype.toCelcius=function(){return new Celcius((this.value-32)*(5/9))},e}(Temperature),Celcius=function(t){function e(e){return t.call(this,e)||this}return __extends(e,t),e.prototype.toFahrenheit=function(){return new Fahrenheit(9*this.value/5+32)},e.prototype.toCelcius=function(){return new e(this.value)},e}(Temperature),TemperatureFactory=function(){function e(){}return e.createTemperature=function(e,t){switch(e){case"celcius":return new Celcius(t);case"fahrenheit":return new Fahrenheit(t);default:throw Error("Invalid temperature system")}},e}(),WindChillCalculator=function(){function e(){}return e.calculate=function(e,t){e=e.toFahrenheit().value,t=t.toMilesPerHour().value,t=35.74+.6215*e-35.75*Math.pow(t,.16)+.4275*e*Math.pow(t,.16);return new Fahrenheit(t)},e}();