var box = document.getElementById('screen');
var lastDigit = function(){
	var arr = box.value.split(/\+|\-|\/|\*/);
	return arr[arr.length-1];
}
var dotInDigit = function() {
	return lastDigit().indexOf('.') >= 0
}
var pressEqual = false;

function toScreen(x){
    if(box.value.length < 12) {
    	box.value += x;
    }
    pressEqual = false;
}

function goodDigit() {
	if(lastDigit() == ".") box.value = box.value.slice(0,box.value.length-1);
	else if(lastDigit()) box.value = box.value.replace(lastDigit(),eval(lastDigit()*1));
}

function clearScreen() {
  box.value = '';
}

function back() {
	if(box.value.indexOf('ERROR') >= 0) clearScreen();
  	box.value = box.value.slice(0,-1);
}

function result() {
  if(box.value.slice(box.value.length -2) == "/0" || box.value.slice(box.value.length -3) == "/-0") box.value = "ERROR: div by 0";
  else if(lastDigit()) box.value = Math.round(eval(box.value) * 10000) / 10000;
  pressEqual = true
}

function twoZero() {
	if(box.value.length < 11 && lastDigit() > 0 && !pressEqual || dotInDigit()) digit("00")
}

function zero() {
	if(lastDigit() != "0") digit('0');
}

function digit(x){
	if(pressEqual) clearScreen();
	toScreen(x)
}

function pressDot() {
	if(!dotInDigit()) digit('.')
}

function act(x) {
	if(box.value.indexOf('ERROR') >= 0) clearScreen();
	goodDigit();
	if(lastDigit() > 0) {
		if(x == "*" || x == "/") result();
		toScreen(x)
	}
}

function minus() {
	goodDigit();
	if(box.value.slice(box.value.length-1) != '-') toScreen('-');
}