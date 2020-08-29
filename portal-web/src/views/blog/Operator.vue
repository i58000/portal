<template>
  <div class="operator" v-if="isAdmin">
    <a-button-group>
      <a-button @click="visibleCreateArticleDialog = true" icon="edit" type="primary">写点啥</a-button>
    </a-button-group>
    <a-modal
      title="新增文章"
      :maskClosable="false"
      :visible="visibleCreateArticleDialog"
      :confirm-loading="isCreating"
      @ok="createArticle"
      @cancel="visibleCreateArticleDialog = false"
    >
      <a-input placeholder="标题" v-model="newArticleTitle" />
    </a-modal>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Button, Modal, Input, message } from "ant-design-vue";
import { create, state } from "./store";

export default Vue.extend({
  components: {
    "a-button": Button,
    "a-button-group": Button.Group,
    "a-input": Input,
    "a-modal": Modal
  },
  props: {},
  data() {
    return {
      newArticleTitle: "",
      visibleCreateArticleDialog: false,
      isCreating: false
    };
  },
  computed: {
    isAdmin() {
      return this.$store.account?.id === 10000;
    }
  },
  methods: {
    async createArticle() {
      this.isCreating = true;
      try {
        const article = await create(this.newArticleTitle);
        this.visibleCreateArticleDialog = false;
        this.newArticleTitle = "";
        this.$router.push("/blog/article/" + article.id);
      } catch (err) {
        message.error(err.response.data.error);
      }
      this.isCreating = false;
    }
  }
});
</script>
