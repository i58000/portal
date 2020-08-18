<template>
    <div class="my-profile">
        <div class="avatar">
            <a-avatar :size="64"
                icon="user" />
            <div class="text">
                <div class="name">AN JINSHUO</div>
                <div class="description">小小铲屎官</div>
            </div>
        </div>

        <div class="tags">
            <a-tag class="tag"
                :color="colors[index%colors.length]"
                v-for="(item, index) in tags"
                :key="index">
                {{item}}
            </a-tag>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Tag, Avatar } from 'ant-design-vue';

export default Vue.extend({
  components: {
    'a-tag': Tag,
    'a-avatar': Avatar
  },
  data() {
    return {
      colors: ['pink', 'red', 'orange', 'green', 'cyan', 'blue', 'purple'],
      tags: [
        'Javascript',
        'Typescript',
        'Java',
        'Node.js',
        'koa',
        'express',
        'TypeORM',
        'Vue',
        'antd',
        'Websocket',
        'MySQL',
        'Spring',
        'Springboot',
        'Kafka',
        'Zookeeper',
        'Flink',
        '精通上述单词的拼写',
        '前端切图仔',
        '服务端CRUD工程师',
        '香槟色英短安全蛋之父',
        '某司首席铲屎官',
        '浙大CS吊车尾'
      ]
    };
  }
});
</script>


<style lang="scss" scoped>
.my-profile {
  display: flex;
  flex-direction: column;
  .avatar {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 30px 0 20px 0;
    .text {
      text-align: center;
      .name {
        margin-top: 10px;
        font-weight: bold;
        font-size: $font-size-base;
      }
      .description {
        font-size: 10px;
        color: $text-color-secondary;
      }
    }
  }
  .tags {
    .tag {
      margin: 8px 8px 0 0;
    }
  }
}
</style>
