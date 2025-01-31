
<template>
    <div class="game">
        <div class="table">
            <!-- 选择颜色 -->
            <div class="table-row all-balls">
                <div v-for="(clrStr, index) in Colors.slice(0, 6)"
                    :key="index">
                    <div class="ball"
                        :class="{
                          [clrStr]: true,
                          used: state.game.table[state.game.round].indexOf(index) > -1,
                          picked: picked === index,
                          picking: picked !== null,
                          breath
                        }"
                        @click="pickColor(index)"></div>
                </div>
            </div>
            <div v-for="(col, i) in state.game.table"
                :key="i"
                class="table-row"
                :class="{
                  locked: state.game.round > i,
                  current: state.game.round == i,
                  blink: picked !== null
                }">
                <!-- 提示 -->
                <div class="table-ceil table-tips">
                    <div class="table-tips-balls">
                        <div v-for="(item, index) in computedTips[i]"
                            :key="index"
                            class="table-tips-ball ball"
                            :class="Colors[item] || 'empty'"></div>
                    </div>
                </div>
                <!-- 表格 -->
                <div v-for="(item, j) in col"
                    :key="j"
                    class="table-ceil">
                    <div v-if="i <= state.game.round"
                        class="table-ball ball"
                        :class="Colors[item] || 'empty'"
                        @click="i === state.game.round && isGaming && onClickBall(j)"></div>
                </div>
            </div>
            <!-- 答案列 -->
            <div class="table-row answer">
                <div class="table-ceil help"
                    @click="help">
                    <!-- 空占位 -->
                    <span @click="setDialog('help')">帮助</span>
                </div>
                <div v-for="(item, j) in state.game.answer"
                    :key="j"
                    class="table-ceil">
                    <div class="table-ball ball answer"
                        :class="!isGaming && (Colors[item] || 'empty')">
                        <span v-if="isGaming">?</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="buttons">
            <button class="btn-reset"
                @click="setDialog('reset')">Re.</button>
            <button v-show="isGaming"
                class="btn-validate"
                :disabled="!isFill"
                @click="validate">
                <span v-if="!isFill">请填充当前行</span>
                <span v-else-if="state.game.round < 5">试试吧</span>
                <span v-else>最后一次！确认。</span>
            </button>
        </div>
    </div>
    <Dialog :operations="dialogOptions[dialog.status].operations"
        :visible="dialog.status !== 'hidden'"
        @close="dialog.status = 'hidden'">
        {{ dialogOptions[dialog.status].content }}
    </Dialog>
</template>

<script setup>
import Game, { GameStatus } from '../util/Game';
import { computed, reactive, ref, watch } from 'vue';
import Dialog from './Dialog.vue';

const Colors = [
  'red',
  'green',
  'orange',
  'blue',
  'pink',
  'purple',
  'orange', //
  'white', //
];

const state = reactive({
  game: new Game(),
});

const dialog = reactive({
  status: 'hidden',
});
const closeDialog = () => {
  dialog.status = 'hidden';
};
const setDialog = (type) => {
  dialog.status = type;
};
const dialogOptions = {
  win: {
    content: '推理正确',
    operations: [
      {
        label: '好的',
        handler: closeDialog,
      },
    ],
  },
  fail: {
    content: '推理错误',
    operations: [
      {
        label: '好的',
        handler: closeDialog,
      },
    ],
  },
  reset: {
    content: '重新开始？',
    operations: [
      {
        label: '返回',
        handler: closeDialog,
      },
      {
        label: '确定',
        bgColor: '#fa8c16',
        handler() {
          state.game = new Game();
          closeDialog();
        },
      },
    ],
  },
  help: {
    content: `【目标】推理出顶部的4个问号球的颜色和位置。

【提示】在每行的左侧：
  1. 橙色表示颜色和位置均正确的个数，
  2. 白色为颜色正确但位置不正确的个数。`,
    operations: [
      {
        label: '明白了',
        handler: closeDialog,
      },
    ],
  },
  hidden: {},
};

const picked = ref(null);
const pickColor = (colorIndex) => {
  if (colorIndex === picked.value) {
    // cancel pick
    picked.value = null;
    return;
  }
  const exist = currentCol.value.indexOf(colorIndex);
  if (exist > -1) {
    currentCol.value[exist] = null;
  } else {
    picked.value = colorIndex;
  }
};

const breath = ref(false);
const onClickBall = (pos) => {
  if (picked.value === null) {
    // no picking
    if (state.game.get(pos) === null) {
      breath.value = true;
      setTimeout(() => {
        breath.value = false;
      }, 800);
    } else {
      state.game.set(pos, null);
    }
    // @deprecated
    // next
    // state.game.setNext(pos);
  } else {
    // picking
    state.game.set(pos, picked.value);
    picked.value = null;
  }
};

const validate = () => {
  state.game.validate();
};

const computedTips = computed(() => {
  return state.game.tips.map((tip) => {
    if (!tip) return new Array(4).fill(null);
    const [result, countOfSameColor] = tip;
    return [...new Array(result).fill(6), ...new Array(countOfSameColor - result).fill(7), ...new Array(4 - countOfSameColor).fill(null)];
  });
});

const currentCol = computed(() => {
  return state.game.table[state.game.round];
});

const isGaming = computed(() => {
  return state.game.status === GameStatus.Gaming;
});

const isFill = computed(() => {
  return currentCol.value.every((x) => x !== null);
});

watch(isGaming, () => {
  if (state.game.status === GameStatus.Win) {
    setDialog('win');
  } else if (state.game.status === GameStatus.Fail) {
    setDialog('fail');
  }
});
</script>

<style scoped lang="scss">
$gray: #d9d9d9;
$white: #fff;
$blue: #096dd9;
$red: #ff4d4f;
$yellow: #fadb14;
$orange: #fa8c16;
$green: #7cb305;
$pink: #f759ab;
$purple: #722ed1;

.game {
  // height: 100vh;
  min-height: calc(100vh - 100px);
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.table {
  /* background: black; */
  max-width: 80%;
  max-height: 80%;
  min-width: 300px;
  /* height: 500px; */
  display: flex;
  flex-direction: column-reverse;
  .table-row {
    background: #fafafa;
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: space-around;
    border: 1px solid #eee;
    border-radius: 10px;
    margin-top: 10px;
    overflow: hidden;
    &.locked {
      background: #f0f0f0;
    }
    &.answer {
      background: #f0f0f0;
    }
    &.current {
      border: 1px solid $orange;

      &.blink {
        @keyframes blink {
          from {
          }
          to {
            box-shadow: 0 0 5px $orange;
          }
        }
        animation: blink 0.4s infinite alternate;
      }
    }
  }
  .table-ceil {
    width: 25%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .table-ball {
    color: #ddd;
    font-weight: bold;
    height: 30px;
    width: 30px;
    border-radius: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 10px #ccc;
    border: 2px solid #fff;
  }
  .table-tips {
    border-right: 1px solid #0001;
    display: flex;
    flex-wrap: wrap;
    background: #f0f0f0;
    .table-tips-balls {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      width: 40px;
      .table-tips-ball {
        width: 10px;
        height: 10px;
        border-radius: 15px;
        margin: 4px;
      }
    }
  }

  .table-tips-balls {
    .ball.empty {
      box-shadow: inset 0 0 4px #ccc;
      border: none;
    }
    .ball {
      border: 0.5px solid #ccc;
      box-shadow: none;
    }
  }
}

.help {
  color: #888;
}
.all-balls {
  height: 50px !important;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #eee !important;
  border: 1px solid #ddd !important;
  .ball {
    border-radius: 15px;
    height: 15px;
    width: 15px;
    box-shadow: 0 0 10px #bbb;
    border: 1px solid #eee !important;
    transition: all 0.3s;
    &.used {
      transform: scale(0.6);
      opacity: 0.4;
    }
    &.picking {
      opacity: 0.4;
    }
    &.breath,
    &.picked {
      opacity: 1;
      @keyframes breath {
        from {
          transform: scale(1);
        }
        to {
          transform: scale(1.6);
        }
      }
      animation: breath 0.4s infinite alternate;
    }
  }
}

.ball {
  &.answer {
    background: #fff;
  }
  &.empty {
    box-shadow: inset 0 0 6px #0002;
    transform: scale(1.1);
  }
  &.blue {
    background: $blue;
  }
  &.red {
    background: $red;
  }
  &.yellow {
    background: $yellow;
  }
  &.orange {
    background: $orange;
  }
  &.green {
    background: $green;
  }
  &.pink {
    background: $pink;
  }
  &.white {
    background: $white;
  }
  &.purple {
    background: $purple;
  }
}

.buttons {
  margin-top: 10px;
}
button {
  /* padding: 10px; */
  outline: 0;
  border: 0;
  border-radius: 10px;
  height: 60px;
  color: #fff;
  font-size: 16px;
  border: 1px solid #eee;
}
.btn-reset {
  width: 60px;
  background: $orange;
  margin-right: 10px;
}
.btn-validate {
  width: 230px;
  background: $green;
  &:disabled {
    background: #bfbfbf;
  }
}
</style>
