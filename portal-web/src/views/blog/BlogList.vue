<template>
  <div class="blog-list">
    <div class="operation" v-if="isAdmin">
      <a-button-group>
        <a-button @click="visibleCreateArticleDialog = true" icon="edit" type="primary">写点啥</a-button>
      </a-button-group>
      <a-modal
        title="新增文章"
        :visible="visibleCreateArticleDialog"
        :confirm-loading="isCreating"
        @ok="createArticle"
        @cancel="visibleCreateArticleDialog = false"
      >
        <a-input placeholder="标题" />
      </a-modal>
    </div>
    <a-list item-layout="vertical" size="large" :pagination="pagination" :data-source="listData">
      <!-- <div slot="footer"><b>ant design vue</b> footer part</div> -->
      <a-list-item slot="renderItem" key="item.title" slot-scope="item">
        <!-- <template v-for="{ type, text } in actions"
                slot="actions">
                <span :key="type">
                    <a-icon :type="type"
                        style="margin-right: 8px" />
                    {{ text }}
                </span>
        </template>-->
        <img
          slot="extra"
          style="max-height: 100px; max-width: 200px"
          alt="logo"
          src="@/assets/888539cc615b2ce576236d98d6ebc317.jpeg"
        />
        <a-list-item-meta :description="item.description">
          <a-avatar slot="avatar" style="padding: 5px" :src="item.avatar" />
          <router-link
            @click.native="scrollToTop"
            slot="title"
            :to="$route.path + '/article/' + item.href"
          >{{ item.title }}</router-link>
        </a-list-item-meta>
        <div class="content">{{ item.content }}</div>
      </a-list-item>
    </a-list>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { List, Avatar, Icon, Button, Modal, Input } from "ant-design-vue";
const listData: any[] = [];
for (let i = 0; i < 23; i++) {
  listData.push({
    href: "id123",
    title: `article title no.${i}`,
    avatar: "./cat.svg",
    description: "published at xxx by xxx",
    content:
      "Markdown is a simple text format whose goal is to be very easy to read and write, even when not converted to HTML."
  });
}
export default Vue.extend({
  components: {
    "a-list": List,
    "a-list-item": List.Item,
    "a-list-item-meta": List.Item.Meta,
    "a-avatar": Avatar,
    "a-icon": Icon,
    "a-button": Button,
    "a-button-group": Button.Group,
    "a-input": Input,
    "a-modal": Modal
  },
  data() {
    return {
      newArticleTitle: "",
      visibleCreateArticleDialog: false,
      isCreating: false,
      listData,
      pagination: {
        onChange: (page: any) => {
          console.log(page);
          this.scrollToTop();
        },
        pageSize: 7
      }
      // actions: [
      //   { type: 'star-o', text: '156' },
      //   { type: 'like-o', text: '156' },
      //   { type: 'message', text: '2' }
      // ]
    };
  },
  computed: {
    isAdmin(): boolean {
      // return this.$store.account?.id === 111 || this.$store.account?.id === 10000 || this.$store.account?.id === 20000;
      return true;
    }
  },
  methods: {
    scrollToTop() {
      document
        .querySelector(".scroller")
        ?.scrollTo({ top: 0, behavior: "smooth" });
    },
    async createArticle() {
      this.isCreating = true;
      setTimeout(() => {
        console.log("createArticle", this.newArticleTitle);
        this.visibleCreateArticleDialog = false;
        this.isCreating = false;
        this.newArticleTitle = "";
        // const article = await createArticle(this.newArticleTitle)
        const article = {
          id: 123123
        };
        this.$router.push("/blog/article/" + article.id);
      }, 2000);
    }
  }
});
</script>
<style lang="scss" scoped>
.blog-list {
  .operation {
    text-align: right;
    height: 50px;
  }
  ::v-deep .ant-list-pagination {
    float: left;
  }
  .content {
    margin-left: 47px;
  }
}
</style>
