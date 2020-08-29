<template>
  <div class="blog-article">
    <Breadcrumb :current="title" />

    <div class="container">
      <!-- 标题 -->
      <div class="title">
        <a-spin v-if="loading">
          <a-icon slot="indicator" type="loading" style="font-size: 24px" spin />
        </a-spin>
        <transition name="pop">
          <span v-if="!loading">
            <span v-if="isEditing">
              <a-input v-model="titleEditing" class="title-input"></a-input>
            </span>
            <span v-else>{{title}}</span>
          </span>
        </transition>
      </div>

      <!-- 描述信息 -->
      <div class="meta">
        <div v-if="!loading">
          published at
          <span class="primary-color">{{createdAt}}</span>, by
          <span class="primary-color">{{author}}</span>
        </div>
      </div>

      <div class="operation" v-if="!loading && isAuthor">
        <a-button-group>
          <template v-if="isEditing">
            <a-button @click="togglePreview">
              <span v-if="isPreview">取消预览</span>
              <span v-else>预览</span>
            </a-button>
            <a-button @click="cancel">取消</a-button>
            <a-button @click="save" :loading="isSaving" type="primary">保存</a-button>
          </template>
          <template v-else>
            <a-button @click="edit" type="primary">编辑</a-button>
          </template>
        </a-button-group>
      </div>

      <!-- 正文 -->
      <a-skeleton
        :loading="loading"
        active
        :title="{width:'80%'}"
        :paragraph="{ rows: 10, width: ['40%','60%','70%','20%','90%','70%','90%','100%','50%'] }"
      >
        <!-- <transition name="fade"
        mode="out-in">-->
        <template v-if="isEditing">
          <article v-if="isPreview" class="content github-markdown" v-html="markedPreview"></article>
          <div class="editor" v-else>
            <textarea v-model="contentEditing"></textarea>
          </div>
        </template>
        <article v-else class="content github-markdown" v-html="marked"></article>
        <!-- </transition> -->
      </a-skeleton>
      <div class="meta footer">
        updated at
        <span class="primary-color">{{updatedAt}}</span>
      </div>
    </div>
  </div>
</template>



<script lang="ts">
import Vue from "vue";
import Breadcrumb from "./Breadcrumb.vue";
import marked from "marked";
import { Skeleton, Spin, Icon, Button, message, Input } from "ant-design-vue";
import CollapseTransition from "@/components/collapse-transition";
import { getArticle, updateArticle } from "@/api/article";
import { state } from "./store";
import parseDate from "@/util/parseDate";
export default Vue.extend({
  components: {
    "a-skeleton": Skeleton,
    "a-spin": Spin,
    "a-icon": Icon,
    "a-button": Button,
    "a-button-group": Button.Group,
    "a-input": Input,
    Breadcrumb,
    CollapseTransition
  },
  props: {
    id: {
      type: String
    }
  },
  data() {
    return {
      article: {} as any,
      isEditing: false,
      isPreview: false,
      isSaving: false,
      contentEditing: "",
      titleEditing: ""
    };
  },
  computed: {
    isAuthor(): boolean {
      return this.$store.account.id === this.article.account?.id;
      // return state.isAdmin;
    },
    loading() {
      return this.marked === undefined || this.marked === null;
    },
    title(): string {
      return this.article.title;
    },
    content(): string {
      return this.article.content;
    },
    createdAt(): string {
      return parseDate(this.article.created_at);
    },
    updatedAt(): string {
      return parseDate(this.article.updated_at);
    },
    author(): string {
      return this.article.account?.nickname;
    },
    marked(): string {
      return this.content ? marked(this.content) : "";
    },
    markedPreview(): string {
      return this.contentEditing && marked(this.contentEditing);
    }
  },
  watch: {
    id: {
      immediate: true,
      async handler(val) {
        this.article = {};
        this.article = await getArticle(val);
      }
    }
  },
  methods: {
    cancel() {
      this.contentEditing = "";
      this.titleEditing = "";
      this.isEditing = false;
    },
    async save() {
      this.isSaving = true;
      try {
        const res = await updateArticle(Number(this.id), {
          content: this.contentEditing,
          title: this.titleEditing
        });
        this.article.content = this.contentEditing;
        this.article.title = this.titleEditing;
        this.cancel();
        message.success("save ok");
      } catch (err) {
        console.error(err);
        message.error("save error");
      } finally {
        this.isSaving = false;
      }
    },
    edit() {
      this.contentEditing = this.content;
      this.titleEditing = this.title;
      this.isEditing = true;
    },
    togglePreview() {
      this.isPreview = !this.isPreview;
    }
  }
});
</script>

<style lang="scss" scoped>
@import url("~@/styles/github-markdown.css");
.blog-article {
  height: calc(100% - 140px);
  .container {
    padding: 20px;
    // height: 100%;
    .title-input {
      color: $primary-color;
      text-align: center;
      font-size: 40px;
      font-weight: bold;
      height: 60px;
    }

    .title {
      height: 80px;
      text-align: center;
      font-size: 40px;
      font-weight: bold;
      color: $primary-color;
    }
    .meta {
      height: 50px;
      text-align: right;
      font-size: $font-size-secondary;
      color: $text-color-secondary;
    }
    .operation {
      height: 50px;
      text-align: right;
    }
    .editor {
      position: relative;
      min-height: 600px;
      width: 100%;
      height: 100%;
      textarea {
        padding: 30px;
        position: absolute;
        width: 100%;
        height: 100%;
        outline: 0;
        border: 1px solid $border-color-base;
        border-radius: $border-radius-base;
        font-size: 16px;
        /* 滚动槽 */
        &::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        &::-webkit-scrollbar-track {
          border-radius: 3px;
          background: rgba(0, 0, 0, 0.06);
          -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.08);
        }
        /* 滚动条滑块 */
        &::-webkit-scrollbar-thumb {
          border-radius: 3px;
          background: rgba(0, 0, 0, 0.12);
          -webkit-box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.2);
        }
      }
    }
    .footer {
      border-top: 1px dashed $border-color-base;
      padding-top: 10px;
      margin-top: 60px;
    }
  }
}
.primary-color {
  color: $primary-color;
}
</style>
