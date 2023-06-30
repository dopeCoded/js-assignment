const start=document.getElementById('start');
const stop=document.getElementById('stop');
const time=document.getElementById('time');
const reset=document.getElementById('reset');
let timerId;
let elapsedMsMs = 0;

function TimeToString(millis) {
	const min = Math.floor(millis/1000/60) % 60;
	const second = Math.floor(millis/1000) % 60;
	const ms = millis % 1000;
	const ModifiedMin = min.toString().padStart(2,0);
	const ModifiedSecond = second.toString().padStart(2,0);
	const ModifiedMs = ms.toString().padStart(3,0);
	return `${ModifiedMin}:${ModifiedSecond}.${ModifiedMs[0]}`;
}

start.addEventListener('click',()=>{
	let startMs = Date.now();
	startMs -= elapsedMs;

	timerId = setInterval(() => {
		const nowMs=Date.now();
		elapsedMs = nowMs - startMs;
		time.textContent = TimeToString(elapsedMs);
		start.disabled = true;
		stop.disabled = false;
		reset.disabled = false;
	}, 10);
})

stop.addEventListener('click',() => {
	clearInterval(timerId);
	start.disabled = false;
	stop.disabled = true;
	reset.disabled = false;
});

reset.addEventListener('click',() => {
	elapsedMs = 0;
	time.innerHTML = '00:00.0';
	clearInterval(timerId);
	start.disabled = false;
	stop.disabled = false;
	reset.disabled = true;
});

const display = document.getElementById('display');
let operand1 = '';
let operand2 = '';
let operator = null;

// 数値ボタンのイベントリスナー
Array.from(document.getElementsByClassName('num')).forEach((button) => {
  button.addEventListener('click', (e) => {
    if (operator) {
      operand2 += e.target.textContent;
      display.value = operand1 + operator + operand2;
    } else {
      operand1 += e.target.textContent;
      display.value = operand1;
    }
  });
});

// 演算子ボタンのイベントリスナー
Array.from(document.getElementsByClassName('op')).forEach((button) => {
  button.addEventListener('click', (e) => {
    if (!operator && operand1) {
      operator = e.target.textContent;
      display.value = operand1 + operator;
    }
  });
});

// =ボタンのイベントリスナー
document.getElementById('eq').addEventListener('click', () => {
  if (operand1 && operator && operand2) {
    operand1 = eval(operand1 + operator + operand2).toString();
    operator = null;
    operand2 = '';
    display.value = operand1;
  }
});

// Cボタンのイベントリスナー
document.getElementById('clear').addEventListener('click', () => {
  operand1 = '';
  operand2 = '';
  operator = null;
  display.value = '';
});
