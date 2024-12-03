let cardCount = 4; // стандартное количество карточек
let numbers = [];
let nowOpen = 0; //сейчас карточек открыто текущих
let nowOpenAll = 0; // карточек открыто всего
let lastNumber = 0; //последнее открытое число
let lastElement = this;

document.addEventListener('DOMContentLoaded', function () {

})


function shuffle(arr) {
  var j, temp;
  for (let i = arr.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp;
  }
  return arr;
}


function deleteElements() {
  let panel__cards = document.getElementById('panel__cards');
  while (panel__cards.firstChild) {
    panel__cards.removeChild(panel__cards.firstChild);
  }
  numbers = [];
  nowOpen = 0;
  nowOpenAll = 0;
  lastNumber = 0;
  lastElement = this;

}

function checkValue() {
  cardCount = Number(document.getElementById('cardCount').value);
  if (cardCount < 2 || cardCount > 12 || cardCount % 2 === 1) {
    cardCount = 4;
    document.getElementById('cardCount').value = 4;
  }
}

function createNumbers() {
  for (let i = 0; i < cardCount * cardCount; i++) {
    // numbers[i]=i%(cardCount*cardCount/2);
    numbers.push(i % (cardCount * cardCount / 2) + 1);
  }
  shuffle(numbers);

}

// function clickElement () {
//     this.classList.add("card__open");
// }


function closeCards() {
  //Закрыть карточки
  let allCards = document.querySelectorAll('.card');
  for (let i = 0; i < allCards.length; i++) {
    if (!allCards[i].classList.contains('disabled')) {
      allCards[i].classList.remove('card__open');
    }
  }
  panel__cards.classList.remove("disabled");
}

function createElements() {
  let panel__cards = document.getElementById('panel__cards');
  let tmp = 0;
  for (let j = 0; j < cardCount; j++) {
    let div__row = document.createElement('div');
    div__row.classList.add('row');
    for (let i = 0; i < cardCount; i++) {
      let div = document.createElement('div');
      div.textContent = numbers[tmp++];
      div.classList.add('card');
      div.classList.add('col-' + Math.trunc(12 / cardCount));
      div.addEventListener('click', function clickElement() {
        // closeCards();
        nowOpen += 1;
        this.classList.add("card__open");

        if (lastNumber === this.innerHTML) {
          // && !this.classList.contains("card__open")) {
          this.classList.add("disabled");
          lastElement.classList.add("disabled");
          lastElement.classList.add("card__open");

          lastNumber = 0; //последнее открытое число
          lastElement = undefined;

        }
        lastNumber = this.innerHTML;
        lastElement = this;

        if (nowOpen === 2) {
          panel__cards.classList.add("disabled");
          window.setTimeout(closeCards, 1000);
          nowOpen = 0;
          lastNumber = 0;
          lastElement = undefined;
        }
        
        // проверяем на конец игры
        let allCards = document.querySelectorAll('.card');
        nowOpenAll = 0;
        for (let i = 0; i < allCards.length; i++) {
          if (allCards[i].classList.contains('disabled')) {
            nowOpenAll++;
          }
        }
        if (nowOpenAll === (cardCount * cardCount)) {
          document.querySelector(".panel__date").style.display = "none";
          document.querySelector(".panel__cards").style.display = "none";
          document.querySelector(".panel__win").style.display = "block";
        }
      })
      div__row.append(div);
    }
    panel__cards.append(div__row);
  }
}


function startGame() {
  // Удаляем старые элементы
  deleteElements();
  //Проверяем ввод пользователя (число от 2 до 10, четное. Иначе 4)
  checkValue();
  //делаем массив с числами
  createNumbers();
  //Строим нужное количество элементов
  createElements();


}



