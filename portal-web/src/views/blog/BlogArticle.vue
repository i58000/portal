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
          <span v-if="!loading">{{title}}</span>
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
    </div>
  </div>
</template>



<script lang="ts">
import Vue from "vue";
import Breadcrumb from "./Breadcrumb.vue";
import marked from "marked";
import { Skeleton, Spin, Icon, Button, message } from "ant-design-vue";
import CollapseTransition from "@/components/collapse-transition";
export default Vue.extend({
  components: {
    "a-skeleton": Skeleton,
    "a-spin": Spin,
    "a-icon": Icon,
    "a-button": Button,
    "a-button-group": Button.Group,
    Breadcrumb,
    CollapseTransition
  },
  props: {
    id: {}
  },
  data() {
    return {
      article: {} as any,
      isEditing: false,
      isPreview: false,
      isSaving: false,
      contentEditing: ""
    };
  },
  computed: {
    isAuthor(): boolean {
      // return this.$store.account.id === this.article.account.id;
      return true;
    },
    loading() {
      return !this.marked;
    },
    title(): string {
      return this.article.title;
    },
    content(): string {
      return this.article.content;
    },
    createdAt(): string {
      return (
        this.article.created_at?.toLocaleDateString() +
        " " +
        this.article.created_at?.toTimeString().substr(0, 5)
      );
    },
    updatedAt(): string {
      return (
        this.article.updated_at?.toLocaleDateString() +
        " " +
        this.article.updated_at?.toTimeString().substr(0, 5)
      );
    },
    author(): string {
      return this.article.account?.nickname;
    },
    marked(): string {
      return this.content && marked(this.content);
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
        this.article = await getBlogArticle(val);
      }
    }
  },
  methods: {
    cancel() {
      this.contentEditing = "";
      this.isEditing = false;
    },
    async save() {
      this.isSaving = true;
      // await save();
      setTimeout(() => {
        this.article.content = this.contentEditing;
        this.cancel();
        message.success("save ok");
        this.isSaving = false;
      }, 2000);
    },
    edit() {
      this.contentEditing = this.content;
      this.isEditing = true;
    },
    togglePreview() {
      this.isPreview = !this.isPreview;
    }
  }
});

const getBlogArticle = async (id: number) => {
  const article = {
    id: 123,
    title: "这是标题这是标题这是标题",
    content: `Marked - Markdown Parser
========================

[Marked] lets you convert [Markdown] into HTML.  Markdown is a simple text format whose goal is to be very easy to read and write, even when not converted to HTML.  This demo page will let you type anything you like and see how it gets converted.  Live.  No more waiting around.

How To Use The Demo
-------------------

1. Type in stuff on the left.
2. See the live updates on the right.

That's it.  Pretty simple.  There's also a drop-down option in the upper right to switch between various views:

- **Preview:**  A live display of the generated HTML as it would render in a browser.
- **HTML Source:**  The generated HTML before your browser makes it pretty.
- **Lexer Data:**  What [marked] uses internally, in case you like gory stuff like this.
- **Quick Reference:**  A brief run-down of how to format things using markdown.

Why Markdown?
-------------

It's easy.  It's not overly bloated, unlike HTML.  Also, as the creator of [markdown] says,

> The overriding design goal for Markdown's
> formatting syntax is to make it as readable
> as possible. The idea is that a
> Markdown-formatted document should be
> publishable as-is, as plain text, without
> looking like it's been marked up with tags
> or formatting instructions.

Ready to start writing?  Either start changing stuff on the left or
[clear everything](/demo/?text=) with a simple click.

[Marked]: https://github.com/markedjs/marked/
[Markdown]: http://daringfireball.net/projects/markdown/
`,
    created_at: new Date(),
    created_by: 111,
    updated_at: new Date(),
    updated_by: 111,
    account: {
      id: 111,
      nickname: "admin"
    }
  };
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(article);
      // reject();
    }, 2000);
  });
};
</script>

<style lang="scss" scoped>
@import url("~@/styles/github-markdown.css");
.blog-article {
  height: calc(100% - 140px);
  .container {
    padding: 20px;
    // height: 100%;

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
        padding: 30px;
        position: absolute;
        width: 100%;
        height: 100%;
        outline: 0;
        border: 0;
      }
    }
  }
}
.primary-color {
  color: $primary-color;
}
</style>
