'use strict';
const form = document.getElementById('cost-form');
const result = document.getElementById('result');
function calculate() {
  if (!form.checkValidity()) { result.textContent = 'Enter valid, non-negative numbers in every field.'; return; }
  const types = ['input', 'write', 'read', 'output'];
  const number = id => Number(document.getElementById(id).value);
  const cost = prefix => types.reduce((sum, type) => sum + number(`${prefix}-${type}`) * number(`price-${type}`) / 1000000, 0);
  const total = prefix => types.reduce((sum, type) => sum + number(`${prefix}-${type}`), 0);
  const a = cost('a'), b = cost('b');
  if (![a, b, total('a'), total('b')].every(Number.isFinite)) { result.textContent = 'These numbers are too large. Enter smaller values.'; return; }
  const money = value => '$' + value.toFixed(6);
  const difference = b - a;
  const verdict = difference === 0 ? 'Both workflows have the same estimated cost.' : `${difference > 0 ? 'Optimized workflow costs more' : 'Optimized workflow costs less'}: ${money(Math.abs(difference))}${a > 0 ? ` (${(Math.abs(difference) / a * 100).toFixed(1)}%)` : ' (percentage unavailable: baseline cost is zero)'}.`;
  result.innerHTML = `<div class="result-grid"><div><p>Baseline</p><div class="amount">${money(a)}</div><p>${total('a').toLocaleString('en-US')} total tokens</p></div><div><p>Optimized workflow</p><div class="amount">${money(b)}</div><p>${total('b').toLocaleString('en-US')} total tokens</p></div></div><p class="verdict">${verdict}</p><p class="note">Estimate only. Use your provider's current rates and measured usage.</p>`;
}
form.addEventListener('submit', event => { event.preventDefault(); calculate(); });
form.addEventListener('input', calculate);
form.addEventListener('reset', () => setTimeout(calculate, 0));
calculate();
