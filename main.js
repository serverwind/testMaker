const HTML = document.getElementById('code');
const SEND_BUTTON = document.getElementById('send');
const ALL_Q = [];

SEND_BUTTON.addEventListener('click', constructor);

function constructor() {
  const Q = document.getElementById('question').value;
  const A1 = document.getElementById('a1').value;
  const A2 = document.getElementById('a2').value;
  const A1_CHECK = document.getElementById('a1-checked');
  const A2_CHECK = document.getElementById('a2-checked');
  const ALL_Q_LEN = ALL_Q.length;
  let currentNum = ALL_Q_LEN+1;
  let template = '';
  
if (A1_CHECK.checked) {
  template = `
    &lt;div id='q${currentNum}'&gt;
      &lt;div class='q-desc'&gt;${Q}&lt;/div&gt;
      &lt;div id='Q${currentNum}A1'&gt;${A1} RIGHT &lt;/div&gt;
      &lt;div id='Q${currentNum}A2'&gt;${A2} &lt;/div&gt;
      &lt;div class='next-q'&gt;Next question&lt;/div&gt;
    &lt;/div&gt;
  `;
} else if (A2_CHECK.checked) {
  template = `
    &lt;div id='q${currentNum}'&gt;
      &lt;div class='q-desc'&gt;${Q}&lt;/div&gt;
      &lt;div id='Q${currentNum}A1'&gt;${A1}&lt;/div&gt;
      &lt;div id='Q${currentNum}A2'&gt;${A2} RIGHT&lt;/div&gt;
      &lt;div class='next-q'&gt;Next question&lt;/div&gt;
    &lt;/div&gt;
  `;
  }

  ALL_Q.push(template);
  
  let div = document.createElement('div');
  div.innerHTML = template;
  HTML.appendChild(div);
}

