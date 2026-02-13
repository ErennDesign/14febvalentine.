/**
 * Sen - Yol Seçme Oyunu
 * 5 soru: yanlış seçenekte buton kaçar, mesaj çıkar, Devam ile ilerlenir.
 * Finale: siyah ekran → Tıkla → sevgilison.png
 */

const QUESTIONS = {
  1: {
    wrong: 'b',
    message: 'Bu yola beraber yürümek için çıktık aşkım, geri dönmek yok.',
    correctNext: 2,
    correctMessage: null
  },
  2: {
    wrong: 'b',
    message: 'Hayırdır, başkası ne demek aşkım.',
    correctNext: 3,
    correctMessage: null
  },
  3: {
    wrong: 'b',
    message: 'Aşkım SAÇMALAMA ben bile okumadım dlkfmgklmdf.',
    correctNext: 4,
    correctMessage: 'Diğerini okumadın bile değil mi kljdflkmgklmdf? O zaman doğru seçim bu, devam edelim.',
  },
  4: {
    wrong: 'b',
    message: 'Böyle bir yol mevcut değil, geri dönüp diğer yolu seçmelisin aşkım.',
    correctNext: 5,
    correctMessage: null
  },
  5: {
    wrong: 'a',
    message: 'Tüm yollar değişirse seçeceğin yollar da değişir, seçtiğin yollara sadık kalmalısın aşkım',
    correctNext: 'finale',
    correctMessage: null
  }
};

function showScreen(screenId) {
  document.querySelectorAll('.screen').forEach(el => el.classList.remove('active'));
  const el = document.getElementById(screenId);
  if (el) el.classList.add('active');

  if (screenId === 'start-screen') resetChoiceScreens();
}

function resetChoiceScreens() {
  for (let q = 1; q <= 5; q++) {
    const screen = document.getElementById('choice-' + q + '-screen');
    if (!screen) continue;
    screen.querySelectorAll('.choice-buttons .btn').forEach(b => {
      b.classList.remove('run-away');
      b.disabled = false;
      b.style.pointerEvents = '';
    });
    const msg = screen.querySelector('.choice-message');
    if (msg) msg.hidden = true;
  }
}

function goToChoice(choiceNumber) {
  showScreen('choice-' + choiceNumber + '-screen');
}

function choose(qNum, option) {
  const config = QUESTIONS[qNum];
  const screen = document.getElementById('choice-' + qNum + '-screen');
  if (!screen || !config) return;

  const buttonsWrap = screen.querySelector('.choice-buttons');
  const messageWrap = screen.querySelector('.choice-message');
  const messageText = screen.querySelector('.choice-message-text');
  const devamBtn = screen.querySelector('.btn-devam');

  const isWrong = config.wrong === option;
  const clickedBtn = screen.querySelector('.choice-buttons .btn[data-option="' + option + '"]');

  if (isWrong) {
    clickedBtn.classList.add('run-away');
    clickedBtn.disabled = true;
    screen.querySelectorAll('.choice-buttons .btn').forEach(b => { b.style.pointerEvents = 'none'; });
    messageText.textContent = config.message;
    devamBtn.onclick = function() {
      showScreen(qNum === 5 ? 'finale-screen' : 'choice-' + (qNum + 1) + '-screen');
    };
    messageWrap.hidden = false;
  } else {
    if (config.correctMessage) {
      messageText.textContent = config.correctMessage;
      devamBtn.onclick = function() {
        showScreen(config.correctNext === 'finale' ? 'finale-screen' : 'choice-' + config.correctNext + '-screen');
      };
      messageWrap.hidden = false;
    } else {
      showScreen(config.correctNext === 'finale' ? 'finale-screen' : 'choice-' + config.correctNext + '-screen');
    }
  }
}

function showFinalePhoto() {
  showScreen('finale-photo-screen');
}

document.addEventListener('DOMContentLoaded', () => {
  showScreen('start-screen');
});
