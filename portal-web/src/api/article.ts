import axios from "axios";

export const queryArticle = async (
  { pager, title, tags }: any = { size: 10 }
) => {
  tags = tags?.join(",");
  const resp = await axios.get("/api/v1/article/", {
    params: {
      title,
      tags,
      pager
    }
  });
  // if (resp.data.code === 0) {
  const { data, total } = resp.data;

  return { data, total };
};

export const getArticle = async (id: number) => {
  const resp = await axios.get("/api/v1/article/", {
    params: {
      id
    }
  });
  return resp.data.data[0];
};

export const updateArticle = async (
  id: number,
  { content, top, tags, title }: any
) => {
  if (tags) {
    tags = tags.map((x: any) => x.name);
    tags = tags.join(",");
  }
  const resp = await axios.post("/api/v1/article/update", {
    id,
    content,
    top,
    tags,
    title
  });
  if (resp.status === 200) {
    return resp.data.article;
  } else {
    throw new Error(resp.data);
  }
};

export const createArticle = async (title: string) => {
  const resp = await axios.post("/api/v1/article/create", {
    title
  });
  if (resp.status === 200) {
    return resp.data.article;
  } else {
    throw new Error(resp.data);
  }
};

export const deleteArticle = async (id: number) => {
  const resp = await axios.post("/api/v1/article/delete", {
    id
  });
  if (resp.status === 200) {
    return resp.data.result;
  } else {
    throw new Error(resp.data);
  }
};

export const updateTag = async (
  id: number,
  { name, color, description, type }: any
) => {
  const resp = await axios.post("/api/v1/tag/update", {
    id,
    name,
    color,
    description,
    type
  });
  if (resp.status === 200) {
    return resp.data.tag;
  } else {
    throw new Error(resp.data);
  }
};

export const deleteTag = async (id: number) => {
  const resp = await axios.post("/api/v1/tag/delete", {
    id
  });
  if (resp.status === 200) {
    return resp.data.result;
  } else {
    throw new Error(resp.data);
  }
};
