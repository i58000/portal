<template>
  <div class="searcher">
    <a-input-search placeholder="search article" @search="onSearch" />
    <!-- <div class="tags-wrapper"> -->
    <div class="tags">
      <a-tag
        v-for="item in tags"
        :key="item.id"
        class="tag"
        :class="{ isChecked: isChecked(item) }"
        :color="isChecked(item) ? item.color : undefined"
        @click="isEditing ? editTag(item) : onFilter(item)"
      >{{item.name}}</a-tag>
      <NewTag v-if="isEditing" class="new-tag" />
    </div>
    <!-- </div> -->

    <div class="clear">
      <a-tooltip placement="top" title="清除搜索条件">
        <a-button
          shape="circle"
          icon="close"
          size="small"
          type="dashed"
          style="line-height: 16px;"
          @click="selectedTags = []; clear()"
        />
      </a-tooltip>
    </div>
    <div class="operation" v-if="isAdmin">
      <a-button
        icon="edit"
        size="small"
        @click="isEditing = !isEditing; clear()"
      >{{ isEditing ? "退出编辑" : "编辑标签" }}</a-button>

      <a-modal
        title="编辑标签"
        :maskClosable="false"
        :visible="target !== null"
        :confirm-loading="isUpdating"
        @ok="handleOk"
        @cancel="handleCancel"
      >
        <a-form
          class="form"
          v-if="target !== null"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 16 }"
        >
          <a-form-item label="id">
            <a-input :value="target.id" disabled />
          </a-form-item>
          <a-form-item label="name">
            <a-input v-model="target.name" />
          </a-form-item>
          <a-form-item label="color">
            <a-input v-model="target.color" />
          </a-form-item>
          <a-form-item label="type">
            <a-input v-model="target.type" />
          </a-form-item>
          <a-form-item label="description">
            <a-input v-model="target.description" />
          </a-form-item>
          <a-form-item label="delete">
            <a-button type="danger" @click="onDelete">DELETE</a-button>
          </a-form-item>
        </a-form>
      </a-modal>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import {
  Input,
  Tag,
  Button,
  Tooltip,
  Modal,
  Form,
  message
} from "ant-design-vue";
import { state, query, updateTag, deleteTag } from "./store";
import NewTag from "./NewTag.vue";
export default Vue.extend({
  components: {
    "a-input-search": Input.Search,
    "a-tag": Tag,
    "a-button": Button,
    "a-tooltip": Tooltip,
    "a-modal": Modal,
    "a-form": Form,
    "a-form-item": Form.Item,
    "a-input": Input,
    NewTag
  },
  data() {
    return {
      selectedTags: [] as string[],
      isEditing: false,
      target: null,
      isUpdating: false
    };
  },
  computed: {
    tags() {
      return state.tags;
    },
    isAdmin() {
      return this.$store.account?.id === 10000;
    }
  },
  methods: {
    isChecked(item: any) {
      if (this.isEditing) return true;
      return this.selectedTags.some((name: string) => name === item.name);
    },
    // searcher
    onSearch(title: string) {
      state.searcher.title = title;
      query();
    },
    onFilter(item: any) {
      const i = this.selectedTags.indexOf(item.name);
      if (i > -1) {
        this.selectedTags.splice(i, 1);
      } else {
        this.selectedTags.push(item.name);
      }
      state.searcher.tags = this.selectedTags;
      query();
    },
    clear() {
      state.searcher.tags = undefined;
      state.searcher.title = undefined;
      query();
    },

    // tags
    async onDelete() {
      this.isUpdating = true;
      const res = await deleteTag(this.target?.id);
      if (res.name === this.target?.name) {
        this.handleCancel();
      } else {
        message.error("fail");
        this.isUpdating = false;
      }
    },
    editTag(item: any) {
      this.target = JSON.parse(JSON.stringify(item));
    },
    async handleOk() {
      this.isUpdating = true;
      const res = await updateTag(this.target?.id, this.target);
      if (res.id === this.target?.id) {
        this.handleCancel();
      } else {
        message.error("fail");
        this.isUpdating = false;
      }
    },
    handleCancel() {
      this.target = null;
      this.isUpdating = false;
    }
  }
});
</script>


<style lang="scss" scoped>
.tags {
  height: 100%;
  display: inline-flex;
  width: calc(100% - 30px);
  flex-wrap: wrap;

  .tag {
    margin-top: 10px;
    cursor: pointer;
    border-style: dashed;
    &.isChecked {
      border-style: solid;
      font-weight: bold;
    }
  }
}
.clear {
  float: right;
  display: inline-flex;
  width: 30px;
  margin-top: 10px;
}
.operation {
  margin-top: 10px;
  display: flex;
}
.form .ant-form-item {
  margin-bottom: 10px;
}
.new-tag {
  margin-top: 10px;
}
</style>

