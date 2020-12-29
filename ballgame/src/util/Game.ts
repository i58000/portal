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

    set(pos, val) {
        this.table[this.round][pos] = val;
    }

    setNext(pos) {
        const oldValue = this.table[this.round][pos];
        this.table[this.round][pos] =
            oldValue === null ? 0 : (oldValue + 1) % COUNT_COLOR;
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
    return [random(len), random(len), random(len), random(len)];
}

function random(len) {
    return Math.floor(Math.random() * len); //可均衡获取0到9的随机整数。
}

