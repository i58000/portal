<template>
    <teleport to="body">
        <div ref="el"
            class="dialog"
            @click="onClickMask">
            <div v-show="visible"
                class="container"
                @click.stop>
                <div class="content">
                    <slot></slot>
                    {{ }}
                </div>
                <div class="footer">
                    <button v-for="(op, index) in operations"
                        :key="index"
                        :style="{background: op.bgColor}"
                        @click="op.handler">{{ op.label }}</button>
                </div>
            </div>
        </div>
    </teleport>
</template>

<script>
import { computed, ref, watch } from 'vue';
export default {
  emits: ['close'],
  props: {
    operations: Array,
    visible: Boolean,
  },
  setup(props, { emit }) {
    const onClickMask = () => {
      emit('close');
    };
    const el = ref(null);
    const _visible = computed(() => props.visible);
    watch(_visible, (v) => {
      console.log(v);
      const style = el.value.style;
      if (v) {
        Object.assign(style, {
          visibility: 'visible',
          opacity: 0,
        });
        setTimeout(() => {
          Object.assign(style, {
            opacity: 1,
          });
        }, 0);
      } else {
        Object.assign(style, {
          opacity: 0,
        });
        setTimeout(() => {
          Object.assign(style, {
            opacity: 0,
            visibility: 'hidden',
          });
        }, 300);
      }
    });
    return {
      onClickMask,
      el,
    };
  },
};
</script>

<style lang="scss" scoped>
.dialog {
  transition: 0.3s;
  visibility: hidden;
  opacity: 0;
  position: fixed;
  height: 100%;
  width: 100%;
  background: #0006;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  .container {
    height: fit-content;
    // min-height: 120px;
    width: calc(100vw - 100px);
    min-width: 200px;
    max-width: 80vw;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 0 40px #0002;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: auto;
    .content {
      padding: 20px;
      white-space: pre-wrap;
      color: #666;
      font-size: 14px;
    }
    .footer {
      height: 70px;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0 10px;
    }
  }
}
button {
  outline: 0;
  padding: 0px 20px;
  height: 36px;
  color: #fff;
  border: 1px solid #999;
  background: #aaa;
  border-radius: 6px;
  margin: 0 10px 10px;
}
</style>
