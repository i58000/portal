import { find, insert, remove, update } from "@src/dao/tag";

export const queryTag = async ({
  id,
  name
}: {
  id?: number;
  name?: string;
} = {}) => {
  const results = await find({ id, name });
  return results;
};

export const createTags = async (
  tags: [
    {
      name?: string;
      color?: string;
      type?: string;
      description?: string;
    }
  ]
) => {
  const params = [];
  tags.forEach(({ name, type, color, description }) => {
    params.push({
      name,
      type: type || "article",
      color: color,
      description: description || "tag's description here"
    });
  });
  const results = await insert(params);
  return results;
};

export const deleteTag = async id => {
  const result = await remove(id);
  return result;
};

export const updateTag = async ({ id, name, color, type, description }) => {
  return await update(id, {
    name,
    color,
    type,
    description
  });
};
