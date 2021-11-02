"use strict";

class Cell {
  constructor(x,y,value=0) {
    this._x = x;
    this._y = y;
    this._value = value;
  }

  // Getters

  get coords() {
    return [this._x,this._y];
  }
  get value() {
    return this._value;
  }
  get x() {
    return this._x;
  }
  get y() {
    return this._y;
  }

  // Setters

  set coords(coords) {
    this._x = coords[0];
    this._y = coords[1];
    return this._coords;
  }
  set value(value) {
    this._value = value;
    return this._value;
  }
  set x(x) {
    this._x = x;
    return this._x;
  }
  set y(y) {
    this._y = y;
    return this._y;
  }

  static genRandCell() {
    pass;
  }
  static createGrid() {
  }
}

class Board {
  constructor(x, y){
    let grid = createEmptyMatrix(x, y);
    this.x = x;
    this.y = y;
    // for (let i = 0; i < grid.length; i++) {
    //   for (let j = 0; j < grid[i].length; j++) {
    //     grid[i][j] = new Cell(i,j);
    //   }
    // }
    var rands;
    for (let i = 0; i < 2; i++) {
      rands = [Math.floor(Math.random() * x), Math.floor(Math.random() * y)];
      grid[rands[0]][rands[1]] = new Cell(rands[0],rands[1],2);
    }
    this._boardGrid = grid;
  }

  get grid() {
    return this._boardGrid;
  }

  genCell() {
    let x, y;
    for (let i = 0; i < 10000000; i++) {
      x = Math.floor(Math.random() * this.x), y = Math.floor(Math.random() * this.y);
      if (this.grid[x][y] == undefined) {
        this.grid[x][y] = new Cell(x, y, 2);
        break;
      }
    }
  }

  matchUp() {
    let grid = this._boardGrid;
    for (let x = 0; x < grid.length; x++) {
      for (let y = 1; y < grid[x].length; y++) {
        if (y < 1) continue;
        let current = grid[x][y];
        let previous = grid[x][y-1];
        console.log(x, y);

        if (current == undefined)
          continue;
        else if (previous == undefined) {
          grid[x][y-1] = current;
          grid[x][y] = undefined;
          console.log(y >=1);
          if (y >= 1) y -= 2;
        } else if (previous.value == current.value) {
          grid[x][y-1].value = current.value + previous.value;
          grid[x][y] = undefined;
        }
      }
    }
    console.log(grid);
    this.clear("use");
    this.clear("text");
    this.genCell();
    this.draw();
  }

  matchDown() {
    let grid = this._boardGrid;
    for (let x = grid.length - 1; x >= 0; x--) {
      for (let y = grid.length - 2; y >= 0; y--) {
        if (y >= grid.length - 1) continue;
        let current = grid[x][y];
        let previous = grid[x][y+1];
        console.log(x, y);

        if (current == undefined)
          continue;
        else if (previous == undefined) {
          grid[x][y+1] = current;
          grid[x][y] = undefined;
          console.log(y < grid.length - 1);
          if (y < grid.length - 1) y += 2;
        } else if (previous.value == current.value) {
          grid[x][y+1].value = current.value + previous.value;
          grid[x][y] = undefined;
        }
      }
    }
    console.log(grid);
    this.clear("use");
    this.clear("text");
    this.genCell();
    this.draw();
  }

  matchLeft() {
    let grid = this._boardGrid;
    for (let x = 1; x < grid.length; x++) {
      if (x < 1) continue;
      for (let y = 0; y < grid[x].length; y++) {
        let current = grid[x][y];
        let previous = grid[x-1][y];
        console.log(x, y);

        if (current == undefined)
          continue;
        else if (previous == undefined) {
          grid[x-1][y] = current;
          grid[x][y] = undefined;
          console.log(x >=1);
          if (x >= 1) {
            x -= 2;
            break;
          }
        } else if (previous.value == current.value) {
          grid[x-1][y].value = current.value + previous.value;
          grid[x][y] = undefined;
        }
      }
    }
    console.log(grid);
    this.clear("use");
    this.clear("text");
    this.genCell();
    this.draw();
  }

  matchRight() {
    let grid = this._boardGrid;
    for (let x = grid.length - 2; x >= 0; x--) {
      if (x > grid.length - 2) continue;
      for (let y = grid[x].length - 1; y >= 0; y--) {
        let current = grid[x][y];
        let previous = grid[x+1][y];
        console.log(x, y);

        if (current == undefined)
          continue;
        else if (previous == undefined) {
          grid[x+1][y] = current;
          grid[x][y] = undefined;
          console.log(x <= grid.length - 2);
          if (x <= grid.length - 2) {
            x += 2;
            break;
          }
        } else if (previous.value == current.value) {
          grid[x+1][y].value = current.value + previous.value;
          grid[x][y] = undefined;
        }
      }
    }
    console.log(grid);
    this.clear("use");
    this.clear("text");
    this.genCell();
    this.draw();
  }

  clear(tag) {
    let elems = document.getElementsByTagName(tag);
    console.log(elems);
    Array.prototype.slice.call(elems).forEach((item) => {
      item.remove();
    });
  }

  static setSVG(elem, x, y, attrs={}, innerText="") {
    let svgElem = document.createElementNS("http://www.w3.org/2000/svg", elem);
    svgElem.setAttribute("x", x.toString());
    svgElem.setAttribute("y", y.toString());
    for (let i in attrs) {
      svgElem.setAttribute(i, attrs[i]);
    }
    let txt = document.createTextNode(innerText);
    svgElem.appendChild(txt);
    return svgElem;
  }

  draw() {
    let svg = document.getElementsByTagName("svg")[0];
      for (let i = 0; i < this.grid.length; i++) {
        for (let j = 0; j < this.grid[i].length; j++) {
          if (this.grid[i][j] == undefined) continue;
          let x = 100 * i, y = 100 * j;
          svg.appendChild(Board.setSVG("use", x, y, {href:"#tile", class:"tile"}));
          svg.appendChild(Board.setSVG("text", x + 100 / 2, y + 100 / 2, {class:"text", "dominant-baseline":"middle", "text-anchor":"middle"}, this.grid[i][j].value.toString()));
        }
      }
    }
}

var board = new Board(4, 4);

function loadApp() {
  board.draw();
  activateKeys();
}

function activateKeys() {
  document.addEventListener("keydown", function(event) {
    switch(event.key) {
      case "ArrowUp":
      board.matchUp();
        break;
      case "ArrowDown":
        board.matchDown();
        break;
      case "ArrowLeft":
        board.matchLeft();
        break;
      case "ArrowRight":
        board.matchRight();
        break;
    }
  });
}

function createEmptyMatrix(x, y) {
  let arr = new Array(x);
  for (let i = 0; i < x; i++) {
    arr[i] = new Array(y);
  }
  return arr;
}
var _ = selector => document.querySelector(selector);
