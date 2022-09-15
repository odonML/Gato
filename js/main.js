const state = {
  jugadorUno: "X",
  jugadorDos: "O",
  arrBtns: [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ],
};

let d = document;
let btns = d.querySelectorAll("button");

btns.forEach((btn) => {
  btn.addEventListener("click", btnClicked);
});

function btnClicked(e) {
  this.disabled = true;
  switchBtn(this);
}

function switchBtn(t) {
  
  let active = d.querySelector(".active");
  if (active) {
    let value = active.innerText;
    active.classList.remove("active");
    t.textContent =
      value === state.jugadorUno ? state.jugadorDos : state.jugadorUno;
    t.classList.add("active");
  } else {
    t.textContent = state.jugadorUno;
    t.classList.add("active");
  }

  let x = t.getAttribute("data-x");
  let y = t.getAttribute("data-y");

  state.arrBtns[y][x] = t.innerText;

  searchWinner(t.innerText);
}

function searchRow(caracter, array) {
  let row = array.map((arr) => {
    let find = arr.filter((item) => item === caracter);
    return find.length === 3;
  });
  return row.includes(true);
}

function searchColumns(caracter, array) {
  let newArr = [[], [], []];
  array.forEach((arr, i) => {
    arr.forEach((item, j) => {
      newArr[j][i] = item;
    });
  });
  return searchRow(caracter, newArr);
}

function searchDiagonal(caracter, array) {
  let newArr = [...array];

  let oneDiagonal = [];
  array.forEach((arr, i) => {
    const item = arr[i];
    if (item === caracter) {
      oneDiagonal.push(item);
    }
  });

  let twoDiagonal = [];
  if (oneDiagonal.length < 3) {
    newArr.reverse().forEach((arr, i) => {
      const item = arr[i];
      if (item === caracter) {
        twoDiagonal.push(item);
      }
    });
  }
  return oneDiagonal.length === 3 || twoDiagonal.length === 3;
}

function searchWinner(caracter) {
  let winner = {
    row: false,
    columns: false,
    diagonal: false,
  };
  winner.row = searchRow(caracter, state.arrBtns);
  winner.columns = searchColumns(caracter, state.arrBtns);
  winner.diagonal = searchDiagonal(caracter, state.arrBtns);

  for (let key in winner) {
    if (winner[key]) {
      alert("hay un ganador");
      return;
    }
  }
}
