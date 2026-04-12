// Calculator State
let current = '0';
let prev = null;
let op = null;
let fresh = false;
let exprStr = '';

const screen = document.getElementById('screen');
const expr = document.getElementById('expr');

// Update the main display
function display(val) {
  let s = String(val);
  if (s.length > 12) {
    let n = parseFloat(val);
    s = parseFloat(n.toPrecision(10)).toString();
  }
  screen.textContent = s;
}

// Map operator symbols for display
function opSymbol(o) {
  return { '+': '+', '-': '−', '*': '×', '/': '÷' }[o] || o;
}

// Core calculator function
function calcFn(type, val) {
  if (type === 'num') {
    if (current === '0' || fresh) {
      current = val;
      fresh = false;
    } else {
      if (current.length >= 12) return;
      current += val;
    }
    display(current);
  }

  else if (type === 'dot') {
    if (fresh) { current = '0'; fresh = false; }
    if (!current.includes('.')) {
      current += '.';
      display(current);
    }
  }

  else if (type === 'op') {
    if (op && !fresh) {
      const result = compute(parseFloat(prev), parseFloat(current), op);
      current = String(parseFloat(result.toPrecision(10)));
      display(current);
      exprStr = current + ' ' + opSymbol(val);
    } else {
      exprStr = current + ' ' + opSymbol(val);
    }
    prev = current;
    op = val;
    fresh = true;
    expr.textContent = exprStr;
  }

  else if (type === 'eq') {
    if (!op || prev === null) return;
    const a = parseFloat(prev);
    const b = parseFloat(current);
    exprStr = prev + ' ' + opSymbol(op) + ' ' + current + ' =';
    const result = compute(a, b, op);
    current = String(parseFloat(result.toPrecision(10)));
    prev = null;
    op = null;
    fresh = true;
    display(current);
    expr.textContent = exprStr;
  }

  else if (type === 'clear') {
    current = '0';
    prev = null;
    op = null;
    fresh = false;
    exprStr = '';
    display('0');
    expr.textContent = '';
  }

  else if (type === 'sign') {
    current = String(parseFloat(current) * -1);
    display(current);
  }

  else if (type === 'percent') {
    current = String(parseFloat(current) / 100);
    display(current);
  }
}

// Perform arithmetic
function compute(a, b, o) {
  if (o === '+') return a + b;
  if (o === '-') return a - b;
  if (o === '*') return a * b;
  if (o === '/') return b === 0 ? NaN : a / b;
  return b;
}

// Keyboard support
document.addEventListener('keydown', e => {
  if ('0123456789'.includes(e.key)) {
    calcFn('num', e.key);
  } else if (e.key === '.') {
    calcFn('dot');
  } else if (e.key === '+') {
    calcFn('op', '+');
  } else if (e.key === '-') {
    calcFn('op', '-');
  } else if (e.key === '*') {
    calcFn('op', '*');
  } else if (e.key === '/') {
    e.preventDefault();
    calcFn('op', '/');
  } else if (e.key === 'Enter' || e.key === '=') {
    calcFn('eq');
  } else if (e.key === 'Escape') {
    calcFn('clear');
  } else if (e.key === 'Backspace') {
    if (current.length > 1) {
      current = current.slice(0, -1);
    } else {
      current = '0';
    }
    display(current);
  }
});
