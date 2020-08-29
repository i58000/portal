import axios from "axios";

export const queryTag = async () => {
  const resp = await axios.get("/api/v1/tag/");
  const { tags } = resp.data;
  return tags;
};

export const createTag = async (tagname: string) => {
  const resp = await axios.post("/api/v1/tag/create", {
    name: tagname
  });
  const { tag } = resp.data;
  return tag;
};
