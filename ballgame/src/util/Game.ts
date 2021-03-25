export const Color = {
  RED: "RED",
  GREEN: "GREEN",
  YELLOW: "YELLOW",
  BLUE: "BLUE",
  ORANGE: "ORANGE",
  PINK: "PINK",
};

export const Colors = Object.keys(Color);

const COUNT_COLOR = Colors.length;

export const GameStatus = {
  Gaming: "Gaming",
  Win: "Win",
  Fail: "Fail",
};

const MAX_ROUND = 6;

export default class Game {
  constructor(answer) {
    this.answer = answer || _createAnswer();
    this.table = [
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ];
    this.tips = [null, null, null, null, null, null];
    this.round = 0;
    this.status = GameStatus.Gaming;
    console.log(this);
  }

  validate() {
    const attempt = this.table[this.round];
    if (attempt.some((x) => x === null)) {
      return false;
    }
    const [result, countOfSameColor] = _validate(this.answer, attempt);
    this.tips[this.round] = [result, countOfSameColor];
    if (result === 4) {
      this.status = GameStatus.Win;
    } else if (this.round >= MAX_ROUND - 1) {
      this.status = GameStatus.Fail;
    } else {
      this.round++;
    }
    return true;
  }

  get(pos) {
    return this.table[this.round][pos];
  }
  set(pos, colorIndex) {
    this.table[this.round][pos] = colorIndex;
  }
  setNext(pos) {
    const currentRow = this.table[this.round];
    const oldValue = currentRow[pos];

    let result = oldValue;
    if (oldValue === null) {
      result = 0;
    }
    while (currentRow.indexOf(result) !== -1) {
      result = (result + 1) % (COUNT_COLOR + 1);
    }

    this.table[this.round][pos] = result === 6 ? null : result;
  }
}

function _validate(a1, a2) {
  let result = 0;
  let countOfSameColor = 0;
  const map = {};
  for (let i = 0; i < a1.length; i++) {
    if (a1[i] === a2[i]) {
      result++;
    } else {
      if (map[a1[i]] < 0) {
        countOfSameColor++;
      }
      map[a1[i]] = (map[a1[i]] || 0) + 1;

      if (map[a2[i]] > 0) {
        countOfSameColor++;
      }
      map[a2[i]] = (map[a2[i]] || 0) - 1;
      map[a2[i]];
    }
  }
  countOfSameColor += result;
  return [result, countOfSameColor];
}

function _createAnswer() {
  const len = COUNT_COLOR;
  const usableSet = new Set([0, 1, 2, 3, 4, 5]);
  const result = [];
  // 取4个
  for (let i = 0; i < 4; i++) {
    const target = [...usableSet][random(len - i)];
    usableSet.delete(target);
    result.push(target);
  }
  return result;
}

function random(len) {
  return Math.floor(Math.random() * len); //可均衡获取0到len-1的随机整数。
}
