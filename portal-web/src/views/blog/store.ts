import Vue from "vue";
import {
  queryArticle,
  updateArticle,
  deleteArticle,
  createArticle,
  updateTag as apiUpdateTag,
  deleteTag as apiDeleteTag
} from "@/api/article";
import { queryTag, createTag } from "@/api/tag";

export const state = Vue.observable({
  pager: {
    current: 1,
    size: 10,
    total: 0
  },

  articles: [],
  searcher: {
    title: undefined,
    tags: undefined
  },
  tags: []
} as any);

export const query = async (
  { index, size }: any = { index: 0, size: state.pager.size }
) => {
  const { title, tags } = state.searcher;
  const { data, total } = await queryArticle({
    pager: { index, size },
    title,
    tags
  });
  state.articles = data;
  state.pager.total = total;
  return { data, total };
};

export const create = async (title: string) => {
  return await createArticle(title);
};

export const getTags = async () => {
  state.tags = await queryTag();
};

export const newTag = async (tagName: string) => {
  const tag = await createTag(tagName);
  state.tags.push(tag);
  return tag;
};

export const update = async (id: number, { top, tags }: any = {}) => {
  const article = await updateArticle(id, { top, tags });
  const index = state.articles.findIndex(x => x.id === id);
  Vue.set(state.articles, index, article);
  return article;
};

export const remove = async (id: number) => {
  const result = await deleteArticle(id);
  return result;
};

export const updateTag = async (
  id: number,
  { name, color, type, description }: any = {}
) => {
  const tag = await apiUpdateTag(id, { name, color, type, description });
  const index = state.tags.findIndex(x => x.id === id);
  Vue.set(state.tags, index, tag);
  return tag;
};

export const deleteTag = async (id: number) => {
  const result = await apiDeleteTag(id);
  const index = state.tags.findIndex(x => x.name === result[0].name);
  Vue.delete(state.tags, index);
  return result[0];
};
