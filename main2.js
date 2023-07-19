const HTML = document.getElementById('code');
const JS_CODE = document.getElementById('js-code');
const SEND_BUTTON = document.getElementById('send');
const ALL_Q = [];
const ALL_JS = [];

SEND_BUTTON.addEventListener('click', constructor);

function constructor() {
  const Q = document.getElementById('question').value;
  const A1 = document.getElementById('a1').value;
  const A2 = document.getElementById('a2').value;
  const A3 = document.getElementById('a3').value;
  const A4 = document.getElementById('a4').value;
  const A1_CHECK = document.getElementById('a1-checked');
  const A2_CHECK = document.getElementById('a2-checked');
  const A3_CHECK = document.getElementById('a3-checked');
  const A4_CHECK = document.getElementById('a4-checked');
  const ALL_Q_LEN = ALL_Q.length;
  let currentNum = ALL_Q_LEN+1;
  let template_head = `&lt;div id='q${currentNum}'&gt;
      &lt;div class='q-desc'&gt;${Q}&lt;/div&gt; `;
  let template_end = `&lt;div class='next-q'&gt;Next question&lt;/div&gt;&lt;/div&gt; `;
  let js_template_head = `
    const Q${currentNum}A1 = document.getElementById('Q${currentNum}A1');
    const Q${currentNum}A2 = document.getElementById('Q${currentNum}A2');
    const Q${currentNum}A3 = document.getElementById('Q${currentNum}A3');
    const Q${currentNum}A4 = document.getElementById('Q${currentNum}A4');
    if `;
  let js_template_end = `score++;
        console.log('yes${currentNum}');
    }`;
  
  if (A1_CHECK.checked) {
    let template_q1 = `&lt;div id='Q${currentNum}A1'&gt;${A1} RIGHT &lt;/div&gt`;
    template_head += template_q1;
    let js_template_q1 = `(Q1A1.classList.contains('chosen') && `;
    js_template_head += js_template_q1;
  } else {
    let template_q1 = `&lt;div id='Q${currentNum}A1'&gt;${A1}&lt;/div&gt`;
    template_head += template_q1;
    let js_template_q1 = `(!Q${currentNum}A1.classList.contains('chosen') && `;
    js_template_head += js_template_q1;
  }

    if (A2_CHECK.checked) {
      let template_q2 = `&lt;div id='Q${currentNum}A2'&gt;${A1} RIGHT &lt;/div&gt`;
      template_head += template_q2;
      let js_template_q2 = `(Q${currentNum}A2.classList.contains('chosen') && `;
      js_template_head += js_template_q2;
    } else {
      let template_q2 = `&lt;div id='Q${currentNum}A2'&gt;${A1}&lt;/div&gt`;
      template_head += template_q2;
      let js_template_q2 = `(!Q${currentNum}A2.classList.contains('chosen') && `;
      js_template_head += js_template_q2;
    }

    if (A3_CHECK.checked) {
      let template_q3 = `&lt;div id='Q${currentNum}A3'&gt;${A1} RIGHT &lt;/div&gt`;
      template_head += template_q3;
      let js_template_q3 = `(Q${currentNum}A3.classList.contains('chosen') && `;
      js_template_head += js_template_q3;
    } else {
      let template_q3 = `&lt;div id='Q${currentNum}A3'&gt;${A1}&lt;/div&gt`;
      template_head += template_q3;
      let js_template_q3 = `(!Q${currentNum}A3.classList.contains('chosen') && `;
      js_template_head += js_template_q3;
    }

    if (A4_CHECK.checked) {
      let template_q4 = `&lt;div id='Q${currentNum}A4'&gt;${A1} RIGHT &lt;/div&gt`;
      template_head += template_q4;
      let js_template_q4 = `(Q${currentNum}A4.classList.contains('chosen')) {`;
      js_template_head += js_template_q4;
    } else {
      let template_q4 = `&lt;div id='Q${currentNum}A4'&gt;${A1}&lt;/div&gt`;
      template_head += template_q4;
      let js_template_q4 = `(!Q${currentNum}A4.classList.contains('chosen')) {`;
      js_template_head += js_template_q4;
    }

  let template = template_head + template_end;
  let js_template = js_template_head + js_template_end;

  ALL_Q.push(template);
  ALL_JS.push(js_template);
  
  let div = document.createElement('div');
  div.innerHTML = template;
  HTML.appendChild(div);

  let div_js = document.createElement('div');
  div_js.innerHTML = js_template;
  JS_CODE.appendChild(div_js);
}

