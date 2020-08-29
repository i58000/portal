<template>
  <div class="blog-list">
    <div class="dialogs" v-if="isAdmin">
      <a-modal
        title="编辑标签"
        :maskClosable="false"
        :visible="visibleUpdateArticleTagsDialog"
        :confirm-loading="isUpdating"
        @ok="updateArticle"
        @cancel="onCancelUpdateArticle"
      >
        <TagsEditor v-if="visibleUpdateArticleTagsDialog" :tags="valueTags" @change="onChangeTags" />
      </a-modal>
    </div>
    <a-list item-layout="vertical" size="large" :pagination="pagination" :data-source="listData">
      <!-- <div slot="footer"><b>ant design vue</b> footer part</div> -->
      <a-list-item slot="renderItem" key="item.title" slot-scope="item">
        <template v-if="isAdmin">
          <span
            slot="actions"
            key="editTags"
            @click="visibleUpdateArticleTagsDialog = true; target = item"
          >
            <a-icon type="edit" style="margin-right: 8px" />编辑标签
          </span>

          <a-popconfirm
            ok-text="Yes"
            @confirm="editTop(item, valueTop)"
            @visibleChange="$event ? (valueTop = item.top) : undefined"
            slot="actions"
          >
            <a-input-number slot="title" v-model="valueTop" :min="0"></a-input-number>
            <span key="editTop">
              <a-icon type="to-top" style="margin-right: 8px" />置顶
            </span>
          </a-popconfirm>
          <a-popconfirm
            title="Are you sure delete this article?"
            ok-text="Yes"
            cancel-text="No"
            @confirm="deleteArticle(item)"
            slot="actions"
          >
            <span key="delete">
              <a-icon type="delete" style="margin-right: 8px" />删除
            </span>
          </a-popconfirm>
        </template>

        <!-- <img slot="extra"
                    style="max-height: 100px; max-width: 200px"
                    alt="logo"
        src="@/assets/888539cc615b2ce576236d98d6ebc317.jpeg" />-->
        <a-list-item-meta>
          <div slot="description" class="published-at">Published at <span class="primary-color-1">{{parseDate(item.created_at)}}</span></div>
          <div slot="description" class="tags" v-if="item.tags.length > 0">
            <a-tag v-for="tag in intersection(item)" :key="tag.id" :color="tag.color">{{tag.name}}</a-tag>
          </div>
          <!-- <a-avatar slot="avatar"
                        style="padding: 5px"
          :src="item.avatar" />-->
          <router-link
            @click.native="scrollToTop"
            slot="title"
            :to="$route.path + '/article/' + item.id"
          >
            <span class="title">{{ item.title }}</span>
          </router-link>
        </a-list-item-meta>
        <div class="content">{{ item.content }}</div>
      </a-list-item>
    </a-list>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import {
  List,
  Avatar,
  Icon,
  Button,
  Modal,
  Tag,
  Popconfirm,
  InputNumber,
  Input
} from "ant-design-vue";
import { state, query, getTags, update, remove, newTag, create } from "./store";
import TagsEditor from "./TagsEditor.vue";
import parseDate from "@/util/parseDate";

export default Vue.extend({
  components: {
    "a-list": List,
    "a-list-item": List.Item,
    "a-list-item-meta": List.Item.Meta,
    "a-avatar": Avatar,
    "a-icon": Icon,
    "a-button": Button,
    "a-button-group": Button.Group,
    "a-input-number": InputNumber,
    "a-modal": Modal,
    "a-tag": Tag,
    "a-popconfirm": Popconfirm,
    "a-input": Input,
    TagsEditor
  },
  data() {
    return {
      visibleUpdateArticleTagsDialog: false,
      isUpdating: false,
      valueTop: 0,
      newValueTags: [] as any[],
      target: null
    };
  },
  computed: {
    pagination() {
      return {
        size: "small",
        showSizeChanger: true,
        // hideOnSinglePage: true,
        total: state.pager.total,
        pageSize: state.pager.size,
        current: state.pager.current,
        onShowSizeChange: (current: number, size: number) => {
          state.pager.size = size;
          state.pager.current = current;
          query({
            size: size,
            index: 0
          });
        },
        onChange: (current: number, size: number) => {
          console.log(current);
          state.pager.current = current;
          query({
            size: size,
            index: current - 1
          });
          this.scrollToTop();
        }
      };
    },
    isAdmin(): boolean {
      return this.$store.account?.id === 10000;
    },
    listData(): Array<any> {
      return state.articles.map(
        ({ id, title, content, tags, top, created_at }: any) => {
          return {
            created_at,
            top,
            id,
            title,
            avatar: "./cat.svg",
            tags,
            content: content && content.substr(0, 60) + "..."
          };
        }
      );
    },
    allTags(): Array<any> {
      return state.tags;
    },
    valueTags(): Array<any> {
      return this.target ? this.target?.tags : [];
    }
  },
  created() {
    query();
    getTags();
  },
  methods: {
    parseDate,
    intersection(item: any) {
      return this.allTags.filter(
        x => item.tags.findIndex(y => x.id === y.id) >= 0
      );
    },
    scrollToTop() {
      document
        .querySelector(".scroller")
        ?.scrollTo({ top: 0, behavior: "smooth" });
    },
    async deleteArticle(item: any) {
      console.log(item);
      const res = await remove(item.id);
      if (res.length === 1) location.reload();
    },
    async editTop(item: any, valueTop: number) {
      const article = await update(item.id, { top: valueTop });
      if (article.top === valueTop) location.reload();
    },
    async updateArticle() {
      const res = await update(this.target?.id, { tags: this.newValueTags });
      this.onCancelUpdateArticle();
    },
    onChangeTags(tags: Array<any>) {
      this.newValueTags = tags;
    },
    onCancelUpdateArticle() {
      this.visibleUpdateArticleTagsDialog = false;
      this.target = null;
      this.newValueTags = [];
    }
  }
});
</script>
<style lang="scss" scoped>
.blog-list {
  ::v-deep .ant-list-pagination {
    float: left;
    margin-top: 40px;
  }
  ::v-deep .ant-list-item {
    padding: 26px 0 6px 0;
  }
  .content {
    margin-left: 47px;
  }
}

.title {
  font-size: 26px;
}
.published-at{
  font-size: 10px;
}
.tags{
  margin-top: 10px;;
}
.primary-color {
  color: $primary-color;
}
</style>
