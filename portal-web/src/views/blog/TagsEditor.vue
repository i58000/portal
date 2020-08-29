<template>
  <div>
    <!-- <div class="selected">
            <a-tag v-for="item in tags"
                :key="item.name"
                :color="item.color">
                {{item.name}}
            </a-tag>
    </div>-->
    <div class="all">
      <a-tag
        class="tag"
        v-for="item in allTags"
        :key="item.name"
        :class="{isChecked: isChecked(item) }"
        :color="isChecked(item) ? item.color : undefined"
        @click="handleChange(item)"
      >{{item.name}}</a-tag>
      <NewTag class="new-tag" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Tag, Input, Icon, message } from "ant-design-vue";
import NewTag from "./NewTag.vue";
import { state } from "./store";
export default Vue.extend({
  components: {
    "a-input": Input,
    "a-icon": Icon,
    "a-checkable-tag": Tag.CheckableTag,
    "a-tag": Tag,
    NewTag
  },
  props: {
    tags: {
      type: Array
    }
  },
  data() {
    return {
      selectedTags: [] as any[]
    };
  },
  computed: {
    allTags() {
      return state.tags;
    }
  },
  created() {
    this.selectedTags = this.tags;
  },
  methods: {
    handleChange(tag: any) {
      const { selectedTags } = this;
      const nextSelectedTags = !this.isChecked(tag)
        ? [...selectedTags, tag]
        : selectedTags.filter(t => t.name !== tag.name);
      console.log("You are interested in: ", nextSelectedTags);
      this.selectedTags = nextSelectedTags;
      this.$emit("change", this.selectedTags);
    },
    isChecked(tag: any) {
      return !!this.selectedTags.find(x => x.name === tag.name);
    }
  }
});
</script>


<style lang="scss" scoped>
.tag {
  margin-top: 10px;
  cursor: pointer;
  border-style: dashed;
  &.isChecked {
    border-style: solid;
    font-weight: bold;
  }
}
.new-tag {
  ::v-deep .ant-tag,
  ::v-deep .ant-input {
    margin-top: 10px;
  }
}
</style>
