/// amount of used space (5000 kb limit)
const {
  size
} = new Blob(Object.values(localStorage))
console.log(size)
const localStorageSpace = () => {
  let allStrings = '';
  for (const key of Object.keys(window.localStorage)) {
    allStrings += window.localStorage[key];
  }
  return allStrings ? 3 + ((allStrings.length * 16) / (8 * 1024)) + ' KB' : 'Empty (0 KB)';
};
console.log(localStorageSpace())

//////////////////////
let HTML = document.getElementById('code');
let JS_CODE = document.getElementById('js-code');
let QNUM = document.getElementById('q-num');
const SEND_BUTTON = document.getElementById('send');
const ALL_Q = [];
const ALL_JS = [];
let qCounter = 1;

qCounter = localStorage.getItem('counter');
HTML.innerHTML = localStorage.getItem('code');
JS_CODE.innerHTML = localStorage.getItem('js-code');
QNUM.innerHTML = localStorage.getItem('counter');

SEND_BUTTON.addEventListener('click', constructor);

function constructor() {
  if (qCounter == null) {
    qCounter = 1;
  }
  const Q = document.getElementById('question').value;
  const IMG = document.getElementById('img').value;
  const IMG_ALT = document.getElementById('img-alt').value;
  const A1 = document.getElementById('a1').value;
  const A2 = document.getElementById('a2').value;
  const A3 = document.getElementById('a3').value;
  const A4 = document.getElementById('a4').value;
  const A1_CHECK = document.getElementById('a1-checked');
  const A2_CHECK = document.getElementById('a2-checked');
  const A3_CHECK = document.getElementById('a3-checked');
  const A4_CHECK = document.getElementById('a4-checked');
  const ALL_Q_LEN = ALL_Q.length;
  let template_head;
  
  if (IMG === '') {
    template_head = `&lt;div id='q${qCounter}' class='questions every-q hidden-q'&gt; &lt;div class='q-desc'&gt;${Q}&lt;/div&gt; `;
  } else {
    template_head = `&lt;div id='q${qCounter}' class='questions every-q hidden-q'&gt; &lt;div class='q-desc'&gt;${Q}&lt;/div&gt;&lt;img class='test-img' src='${IMG}' alt='${IMG_ALT}'&gt;`;
  }

  let template_end = `&lt;div class='next-q'&gt;Принять ответ&lt;/div&gt;&lt;/div&gt; `;
  let js_template_head = `
    const Q${qCounter}A1 = document.getElementById('Q${qCounter}A1');
    const Q${qCounter}A2 = document.getElementById('Q${qCounter}A2');
    const Q${qCounter}A3 = document.getElementById('Q${qCounter}A3');
    const Q${qCounter}A4 = document.getElementById('Q${qCounter}A4');
    if `;
  let js_template_end = `score++;
        console.log('yes${qCounter}');
    }`;

  //FOR QUESTIONS WITH 2 ANSWERS
  if (A3 === '') {
    js_template_head = `
    const Q${qCounter}A1 = document.getElementById('Q${qCounter}A1');
    const Q${qCounter}A2 = document.getElementById('Q${qCounter}A2');
    if `;
    if (A1_CHECK.checked) {
    let template_q1 = `&lt;div class='q-var' id='Q${qCounter}A1'&gt;&lt;i class="far fa-circle"&gt;&lt;/i&gt; ${A1} &lt;span class='right-answer'&gt;&lt;i class="fas fa-check-square"&gt;&lt;/i&gt;&lt;/span&gt;&lt;/div&gt;`;
    template_head += template_q1;
    let js_template_q1 = `(Q${qCounter}A1.classList.contains('chosen') && `;
    js_template_head += js_template_q1;
  } else {
    let template_q1 = `&lt;div class='q-var' id='Q${qCounter}A1'&gt;&lt;i class="far fa-circle"&gt;&lt;/i&gt; ${A1}&lt;/div&gt`;
    template_head += template_q1;
    let js_template_q1 = `(!Q${qCounter}A1.classList.contains('chosen') && `;
    js_template_head += js_template_q1;
  }
    if (A2_CHECK.checked) {
      let template_q2 = `&lt;div class='q-var' id='Q${qCounter}A2'&gt;&lt;i class="far fa-circle"&gt;&lt;/i&gt; ${A2} &lt;span class='right-answer'&gt;&lt;i class="fas fa-check-square"&gt;&lt;/i&gt;&lt;/span&gt;&lt;/div&gt;`;
      template_head += template_q2;
      let js_template_q2 = `(Q${qCounter}A2.classList.contains('chosen'))) {`;
      js_template_head += js_template_q2;
    } else {
      let template_q2 = `&lt;div class='q-var' id='Q${qCounter}A2'&gt;&lt;i class="far fa-circle"&gt;&lt;/i&gt; ${A2}&lt;/div&gt`;
      template_head += template_q2;
      let js_template_q2 = `(!Q${qCounter}A2.classList.contains('chosen'))) {`;
      js_template_head += js_template_q2;
    } 
  }

  // FOR QUESTIONS WITH 3 ANSWERS
  if (A4 === '' && (A3 !== '')) {
    js_template_head = `
    const Q${qCounter}A1 = document.getElementById('Q${qCounter}A1');
    const Q${qCounter}A2 = document.getElementById('Q${qCounter}A2');
    const Q${qCounter}A3 = document.getElementById('Q${qCounter}A3');
    if `;
    if (A1_CHECK.checked) {
    let template_q1 = `&lt;div class='q-var' id='Q${qCounter}A1'&gt;&lt;i class="far fa-circle"&gt;&lt;/i&gt; ${A1} &lt;span class='right-answer'&gt;&lt;i class="fas fa-check-square"&gt;&lt;/i&gt;&lt;/span&gt;&lt;/div&gt;`;
    template_head += template_q1;
    let js_template_q1 = `(Q${qCounter}A1.classList.contains('chosen') && `;
    js_template_head += js_template_q1;
  } else {
    let template_q1 = `&lt;div class='q-var' id='Q${qCounter}A1'&gt;&lt;i class="far fa-circle"&gt;&lt;/i&gt; ${A1}&lt;/div&gt;`;
    template_head += template_q1;
    let js_template_q1 = `(!Q${qCounter}A1.classList.contains('chosen') && `;
    js_template_head += js_template_q1;
  }
    if (A2_CHECK.checked) {
      let template_q2 = `&lt;div class='q-var' id='Q${qCounter}A2'&gt;&lt;i class="far fa-circle"&gt;&lt;/i&gt; ${A2} &lt;span class='right-answer'&gt;&lt;i class="fas fa-check-square"&gt;&lt;/i&gt;&lt;/span&gt;&lt;/div&gt;`;
      template_head += template_q2;
      let js_template_q2 = `(Q${qCounter}A2.classList.contains('chosen')) && `;
      js_template_head += js_template_q2;
    } else {
      let template_q2 = `&lt;div class='q-var' id='Q${qCounter}A2'&gt;&lt;i class="far fa-circle"&gt;&lt;/i&gt; ${A2}&lt;/div&gt`;
      template_head += template_q2;
      let js_template_q2 = `(!Q${qCounter}A2.classList.contains('chosen')) && `;
      js_template_head += js_template_q2;
    }
    if (A3_CHECK.checked) {
      let template_q3 = `&lt;div class='q-var' id='Q${qCounter}A3'&gt;&lt;i class="far fa-circle"&gt;&lt;/i&gt; ${A3} &lt;span class='right-answer'&gt;&lt;i class="fas fa-check-square"&gt;&lt;/i&gt;&lt;/span&gt;&lt;/div&gt`;
      template_head += template_q3;
      let js_template_q3 = `(Q${qCounter}A3.classList.contains('chosen'))) {`;
      js_template_head += js_template_q3;
    } else {
      let template_q3 = `&lt;div class='q-var' id='Q${qCounter}A3'&gt;&lt;i class="far fa-circle"&gt;&lt;/i&gt; ${A3}&lt;/div&gt`;
      template_head += template_q3;
      let js_template_q3 = `(!Q${qCounter}A3.classList.contains('chosen'))) {`;
      js_template_head += js_template_q3;
    } 
  }

  // FOR QUESTIONS WITH 4 ANSWERS
  if (A4 !== '') {
    console.log('ya')
    js_template_head = `
    const Q${qCounter}A1 = document.getElementById('Q${qCounter}A1');
    const Q${qCounter}A2 = document.getElementById('Q${qCounter}A2');
    const Q${qCounter}A3 = document.getElementById('Q${qCounter}A3');
    const Q${qCounter}A4 = document.getElementById('Q${qCounter}A4');
    if `;
  if (A1_CHECK.checked) {
    let template_q1 = `&lt;div class='q-var' id='Q${qCounter}A1'&gt;&lt;i class="far fa-circle"&gt;&lt;/i&gt; ${A1} &lt;span class='right-answer'&gt;&lt;i class="fas fa-check-square"&gt;&lt;/i&gt;&lt;/span&gt;&lt;/div&gt;`;
    template_head += template_q1;
    let js_template_q1 = `(Q${qCounter}A1.classList.contains('chosen') && `;
    js_template_head += js_template_q1;
  } else {
    let template_q1 = `&lt;div class='q-var' id='Q${qCounter}A1'&gt;&lt;i class="far fa-circle"&gt;&lt;/i&gt; ${A1}&lt;/div&gt;`;
    template_head += template_q1;
    let js_template_q1 = `(!Q${qCounter}A1.classList.contains('chosen') && `;
    js_template_head += js_template_q1;
  }

    if (A2_CHECK.checked) {
      let template_q2 = `&lt;div class='q-var' id='Q${qCounter}A2'&gt;&lt;i class="far fa-circle"&gt;&lt;/i&gt; ${A2} &lt;span class='right-answer'&gt;&lt;i class="fas fa-check-square"&gt;&lt;/i&gt;&lt;/span&gt;&lt;/div&gt;`;
      template_head += template_q2;
      let js_template_q2 = `(Q${qCounter}A2.classList.contains('chosen')) && `;
      js_template_head += js_template_q2;
    } else {
      let template_q2 = `&lt;div class='q-var' id='Q${qCounter}A2'&gt;&lt;i class="far fa-circle"&gt;&lt;/i&gt; ${A2}&lt;/div&gt`;
      template_head += template_q2;
      let js_template_q2 = `(!Q${qCounter}A2.classList.contains('chosen')) && `;
      js_template_head += js_template_q2;
    }

    if (A3_CHECK.checked) {
      let template_q3 = `&lt;div class='q-var' id='Q${qCounter}A3'&gt;&lt;i class="far fa-circle"&gt;&lt;/i&gt; ${A3} &lt;span class='right-answer'&gt;&lt;i class="fas fa-check-square"&gt;&lt;/i&gt;&lt;/span&gt;&lt;/div&gt;`;
      template_head += template_q3;
      let js_template_q3 = `(Q${qCounter}A3.classList.contains('chosen')) && `;
      js_template_head += js_template_q3;
    } else {
      let template_q3 = `&lt;div class='q-var' id='Q${qCounter}A3'&gt;&lt;i class="far fa-circle"&gt;&lt;/i&gt; ${A3}&lt;/div&gt`;
      template_head += template_q3;
      let js_template_q3 = `(!Q${qCounter}A3.classList.contains('chosen')) && `;
      js_template_head += js_template_q3;
    }

    if (A4_CHECK.checked) {
      let template_q4 = `&lt;div class='q-var' id='Q${qCounter}A4'&gt;&lt;i class="far fa-circle"&gt;&lt;/i&gt; ${A4} &lt;span class='right-answer'&gt;&lt;i class="fas fa-check-square"&gt;&lt;/i&gt;&lt;/span&gt;&lt;/div&gt;`;
      template_head += template_q4;
      let js_template_q4 = `(Q${qCounter}A4.classList.contains('chosen'))) {`;
      js_template_head += js_template_q4;
    } else {
      let template_q4 = `&lt;div class='q-var' id='Q${qCounter}A4'&gt;&lt;i class="far fa-circle"&gt;&lt;/i&gt; ${A4}&lt;/div&gt`;
      template_head += template_q4;
      let js_template_q4 = `(!Q${qCounter}A4.classList.contains('chosen'))) {`;
      js_template_head += js_template_q4;
    } 
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
  qCounter++;
  QNUM.innerHTML = qCounter;
  localStorage.setItem('code', HTML.innerHTML);
  localStorage.setItem('js-code', JS_CODE.innerHTML);
  localStorage.setItem('counter', qCounter);

  clearInputs();
  resetButtonsNames();
}

function clearInputs() {
  document.getElementById('question').value = '';
  document.getElementById('a1').value = '';
  document.getElementById('a2').value = '';
  document.getElementById('a3').value = '';
  document.getElementById('a4').value = '';
}

document.getElementById('reset').addEventListener('click', reset);

function reset() {
  localStorage.clear();
  location.reload();
}

document.getElementById('copy-html').addEventListener('click', сopyHtml);

function сopyHtml(){
    let r = document.createRange();
    r.selectNode(document.getElementById('code'));
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(r);
    try {
        document.execCommand('copy');
        window.getSelection().removeAllRanges();
        document.getElementById('copy-html').innerHTML = 'Скопировано';
    } catch (err) {
        console.log('Unable to copy!');
    }
}

document.getElementById('copy-js').addEventListener('click', сopyJs);

function сopyJs(){
    let r = document.createRange();
    r.selectNode(document.getElementById('js-code'));
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(r);
    try {
        document.execCommand('copy');
        window.getSelection().removeAllRanges();
        document.getElementById('copy-js').innerHTML = 'Скопировано';
    } catch (err) {
        console.log('Unable to copy!');
    }
}

function resetButtonsNames() {
  document.getElementById('copy-html').innerHTML = 'Копировать HTML';
  document.getElementById('copy-js').innerHTML = 'Копировать JS';
}

//////// GENERATE FULL CODE (in progress)
// const HTML_HEAD = "&lt;div id='test-desc'&gt; &lt;div id='test-status'&gt;&lt;/div&gt; &lt;/div&gt; &lt;div id='regime'&gt; &lt;p&gt;Выберите режим, в котором хотите пройти &lt;i&gt;CES&lt;/i&gt; тест:&lt;/p&gt; &lt;div class='regime-buttons'&gt; &lt;div id='choose-wisely'&gt; &lt;div id='training'&gt; &lt;div class='regime-img'&gt;&lt;img src='https://sea-man.org/icons/training.png' alt='Тренировка - CES тест'&gt;&lt;/div&gt; &lt;div class='regime-name'&gt;Тренировочный&lt;/div&gt; &lt;/div&gt; &lt;div id='exam'&gt; &lt;div class='regime-img'&gt;&lt;img src='https://sea-man.org/icons/exam.png' alt='Аттестация - CES тест'&gt;&lt;/div&gt; &lt;div class='regime-name'&gt;Аттестация&lt;/div&gt; &lt;/div&gt; &lt;/div&gt; &lt;/div&gt; &lt;div id='answ' onclick='document.location='https://sea-man.org/testy/ogranichennoe-prostranstvo''&gt;&lt;div class='regime-name'&gt;&lt;i class='fas fa-question'&gt;&lt;/i&gt; &lt;a href='https://sea-man.org/testy/ogranichennoe-prostranstvo'&gt;Ответы&lt;/a&gt;&lt;/div&gt;&lt;/div&gt;&lt;style&gt;#answ{max-width: 40em;margin: 0 auto;position:relative;top:5px}&lt;/style&gt; &lt;/div&gt; &lt;div id='start-test' class='hidden-q'&gt;Начать тест&lt;/div&gt; &lt;div id='qWrapper'&gt;";

// const HTML_END = "&lt;div id='note' class='hidden-q'&gt;* В некоторых вопросах теста может быть несколько правильных ответов.&lt;/div&gt; &lt;div id='result' class='hidden-q'&gt; &lt;div class='results'&gt; &lt;div class='result-img'&gt; &lt;div class='trophy'&gt;&lt;img src='https://sea-man.org/js/trophy.png'&gt;&lt;/div&gt; &lt;/div&gt; &lt;div class='result-text'&gt; &lt;div class='your-result'&gt;&lt;i&gt;'CBT тест'&lt;/i&gt; пройден! Ваш результат:&lt;/div&gt; &lt;div id='points'&gt;&lt;/div&gt; &lt;div id='score-points'&gt;&lt;/div&gt; &lt;/div&gt; &lt;/div&gt; &lt;div class='social'&gt;[social]&lt;/div&gt; &lt;div class='try-again'&gt;&lt;a class='restart' href='#' onclick='window.location.reload(true);'&gt;Пройти CBT тест еще раз&lt;/a&gt; &lt;/div&gt; &lt;/div&gt; &lt;div&gt; &lt;script src='https://sea-man.org/js/tests/cbt_stressMan.js'&gt;&lt;/script&gt; &lt;/div&gt;";

// const JS_HEAD = "* [lestrangeqq@gmail.com 2021] */  let parentElement = document.querySelector('#parent'); let allQuestions = document.querySelectorAll('.every-q'); let end = document.querySelector('.end'); let testStatus = document.getElementById('test-status'); const TESTNAME = 'cbt_stressMan'; const TRAINING = document.getElementById('training'); TRAINING.addEventListener('click', trainingRegime); const EXAM = document.getElementById('exam'); EXAM.addEventListener('click', examRegime); const HINT = document.getElementById('hint'); HINT.addEventListener('click', showAnswer); const CHECK = document.getElementById('check-results'); const REGIME = document.getElementById('regime'); const START = document.getElementById('start-test'); const H1 = document.querySelector('h1'); const TESTDESC = document.getElementById('test-desc'); const HEADER = document.querySelector('header'); const MAINAREA = document.querySelector('main'); const RESULT = document.getElementById('result'); const BODY = document.querySelector('body'); const QNUMBER = document.getElementById('q-number'); const CLOSE = document.getElementById('close'); const CURRENTQ = document.getElementById('current-q'); const TOTALQ = document.getElementById('total-q'); const NOTE = document.getElementById('note'); const TIMER = document.getElementById('q-time'); const MISC = document.getElementById('misc'); const SCORE = document.getElementById('score-points'); let minutesBlock = document.getElementById('minutes'); let secondsBlock = document.getElementById('seconds'); let amountOfQ = document.querySelectorAll('.questions'); let amountOfA = document.querySelectorAll('q-var'); CLOSE.addEventListener('click', closeTest); const NEXTQ = document.querySelectorAll('.next-q').forEach(item =&gt; { item.addEventListener('click', nextQ) }); let score = 0; let q = 0; let finish = 0; let s = 0; let qNum = 1; const POINTS = document.getElementById('points'); function checkRecords() { if(localStorage.getItem(TESTNAME + '_res') == null) { testStatus.innerHTML = '&lt;i class='fas fa-info-circle'&gt;&lt;/i&gt; Похоже вы в первый раз будете проходить данный тест. Удачи!'; } else { testStatus.innerHTML = '&lt;i class='fas fa-info-circle'&gt;&lt;/i&gt; Вы уже пытались пройти этот тест, и ваш лучший результат был &lt;b&gt;' + localStorage.getItem(TESTNAME) + '&lt;/b&gt; правильных ответов.'; } } checkRecords(); document.querySelectorAll('.q-var').forEach(input =&gt; input.addEventListener('click', myFunc));  function myFunc() { this.classList.toggle('chosen'); this.firstChild.classList.toggle('checked-circle'); } CHECK.addEventListener('click', checkResults); function checkResults() { finish++;"

// const JS_END = "this.parentElement.classList.add('hidden-q'); this.parentElement.classList.add('answered-q'); let qwrapper = document.getElementById('qWrapper'); qwrapper.prepend(RESULT); RESULT.classList.remove('hidden-q'); NOTE.classList.add('hidden-q'); START.innerHTML = 'Показать результат'; TIMER.style.opacity = '0'; HINT.style.display = 'none'; CHECK.style.display = 'none'; let percent = Math.round(score / 42 * 100); if((localStorage.getItem(TESTNAME + '_res') == null) || (percent &gt; localStorage.getItem(TESTNAME + '_res'))) { localStorage.setItem(TESTNAME + '_res', percent); localStorage.setItem(TESTNAME, score + ' (' + percent + '%)'); } checkRecords(); scroll(0,0); POINTS.innerHTML = 'Вы дали ' + score + ' (' + percent + '%)' + ' правильных ответов.'; let answeredQ = document.querySelectorAll('.answered-q'); let nextQbutton = document.querySelectorAll('.next-q'); let answeredQlength = 42; showAnswer(); for(i=0; i&lt;answeredQlength; i++) { answeredQ[i].classList.remove('hidden-q'); answeredQ[i].classList.add('disable-activity'); nextQbutton[i].classList.add('hidden-q'); } } START.addEventListener('click', startTest); NEXTQ.addEventListener('click', nextQ); function trainingRegime() { if (EXAM.classList.contains('choised-regime')) { EXAM.classList.remove('choised-regime'); } this.classList.add('choised-regime'); HINT.style.display = 'inline'; START.classList.remove('hidden-q'); } function examRegime() { if (TRAINING.classList.contains('choised-regime')) { TRAINING.classList.remove('choised-regime'); } this.classList.add('choised-regime'); HINT.style.display = 'none'; START.classList.remove('hidden-q'); } function startTest() { TRAINING.classList.add('hidden-q'); REGIME.classList.add('hidden-q'); EXAM.classList.add('hidden-q'); START.classList.add('hidden-q'); H1.classList.add('hidden-q'); TESTDESC.classList.add('hidden-q'); HEADER.classList.add('hidden-q'); document.querySelector('footer').classList.add('hidden-q') document.querySelector('#test-chat').classList.add('hidden-q'); MAINAREA.classList.add('q-middle'); BODY.classList.add('blue-screen'); QNUMBER.classList.remove('hidden-q'); CLOSE.classList.remove('hidden-q'); NOTE.classList.remove('hidden-q'); TIMER.classList.remove('hidden-q'); TOTALQ.innerHTML = 42; if (qNum &gt; 1) { document.querySelector('.bookmark').classList.remove('hidden-q'); document.getElementById('q1').classList.add('hidden-q'); document.getElementById('q1').style.display = 'none'; let checkAllQ = document.querySelector('.bookmark'); checkAllQ.classList.remove('bookmark'); } else { q++; document.getElementById('q1').classList.remove('hidden-q'); } if (s == 0) { s++; let minLeft = 59; let secLeft = 59; let timer60 = setInterval(startTimer, 1000); function startTimer() { if (minLeft &gt;= 0) { secLeft = secLeft - 1; if (secLeft == 0) { minLeft = minLeft - 1; secLeft = 59; } } if ((minLeft == -1) && (secLeft == 59)) { secondsBlock.innerHTML = 0; minutesBlock.innerHTML = 0; clearInterval(timer60); alert('Время вышло! Нажмите ОК чтобы начать тест заново.'); location.reload(); } else { secondsBlock.innerHTML = secLeft; minutesBlock.innerHTML = minLeft; } } } if (finish == 0 && qNum == 1) { document.getElementById('q1').classList.remove('hidden-q'); document.getElementById('q1').classList.remove('bookmark'); START.innerHTML = 'Продолжить'; } if (finish &gt; 0) { NOTE.classList.add('hidden-q'); RESULT.classList.remove('hidden-q'); } } function closeTest() { if (finish == 0) { if (qNum == 1) { document.getElementById('q1').classList.add('hidden-q'); document.getElementById('q1').classList.add('bookmark'); } else { let hideThisQ = document.querySelector('.every-q:not(.hidden-q)'); hideThisQ.classList.add('hidden-q'); hideThisQ.classList.add('bookmark'); } } else { START.classList.remove('hidden-q'); H1.classList.remove('hidden-q'); TESTDESC.classList.remove('hidden-q'); HEADER.classList.remove('hidden-q'); document.querySelector('footer').classList.remove('hidden-q') document.querySelector('#test-chat').classList.remove('hidden-q'); MAINAREA.classList.remove('q-middle'); BODY.classList.remove('blue-screen'); QNUMBER.classList.add('hidden-q'); CLOSE.classList.add('hidden-q'); NOTE.classList.add('hidden-q'); TIMER.classList.add('hidden-q'); } if (finish == 1) { RESULT.style.display = 'block'; START.style.display = 'none'; } START.classList.remove('hidden-q'); H1.classList.remove('hidden-q'); TESTDESC.classList.remove('hidden-q'); HEADER.classList.remove('hidden-q'); document.querySelector('footer').classList.remove('hidden-q') document.querySelector('#test-chat').classList.remove('hidden-q'); MAINAREA.classList.remove('q-middle'); BODY.classList.remove('blue-screen'); QNUMBER.classList.add('hidden-q'); CLOSE.classList.add('hidden-q'); NOTE.classList.add('hidden-q'); RESULT.classList.add('hidden-q'); TIMER.classList.add('hidden-q'); } function nextQ() { qNum++; this.parentElement.classList.add('hidden-q'); this.parentElement.nextElementSibling.classList.remove('hidden-q'); this.parentElement.classList.add('answered-q'); CURRENTQ.innerHTML = qNum; document.body.scrollTop = 0; document.documentElement.scrollTop = 0; HINT.classList.remove('active'); let answers = document.querySelectorAll('.right-answer'); answers.forEach(item =&gt; { item.style.display = 'none'; }); } function showAnswer() { HINT.classList.add('active'); let answers = document.querySelectorAll('.right-answer'); answers.forEach(item =&gt; { item.style.display = 'inline'; }); }";

/* document.getElementById('test').addEventListener('click', genFullHtml);

function genFullHtml() {
  let full_html = HTML_HEAD+HTML.innerHTML+HTML_END;
  HTML.innerHTML = full_html;

  let full_js = JS_HEAD+JS_CODE.innerHTML+JS_END;
  JS_CODE.innerHTML = full_js;
} */
