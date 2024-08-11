// public/index.js
window.addEventListener('DOMContentLoaded', (event) => {
  document.querySelectorAll('.user-name').forEach((elem) => {
    elem.addEventListener('click', (event) => {
      alert(event.target.innerHTML);
    });
  });

  document.querySelector('.send-button').addEventListener('click', (event) => {
    
    const month = document.querySelector('.month').value;
    const day = document.querySelector('.day').value;
    const hour = document.querySelector('.hour').value;
    const minute = document.querySelector('.minute').value;
    const time = "("+month+"月"+day+"日"+hour+"時"+minute+"分"+")";
    const text = document.querySelector('.input-text').value + time;

    fetch('/api/user', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: text}) })
  });
  
});
