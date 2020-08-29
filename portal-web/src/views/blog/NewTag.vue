<template>
    <span class="new-tag">
        <a-input v-if="inputVisible"
            ref="input"
            type="text"
            size="small"
            :style="{ width: '78px' }"
            v-model="inputValue"
            @blur="handleInputConfirm"
            @keyup.enter="handleInputConfirm" />
        <a-tag v-else
            style="background: #fff; borderStyle: dashed;"
            @click="inputVisible = true; $nextTick(()=>{$refs.input.focus()})">
            <a-icon type="plus" /> New Tag
        </a-tag>
    </span>
</template>

<script lang="ts">
import Vue from 'vue';
import { Tag, Icon, Input, message } from 'ant-design-vue';
import { state, newTag } from './store';
export default Vue.extend({
  components: {
    'a-tag': Tag,
    'a-icon': Icon,
    'a-input': Input
  },
  data() {
    return {
      inputValue: '',
      inputVisible: false
    };
  },
  computed: {
    allTags() {
      return state.tags;
    }
  },
  methods: {
    async handleInputConfirm() {
      if (this.allTags.some((x: any) => x.name === this.inputValue)) {
        message.error('标签名重复');
        return;
      }
      if (!this.inputValue) {
        message.warn('输入为空');
      } else {
        await newTag(this.inputValue);
      }

      this.inputValue = '';
      this.inputVisible = false;
    }
  }
});
</script>
