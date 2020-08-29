import { Pager } from "@src/util/Pager";
import { find, insert, remove, update } from "@src/dao/article";
import { findMany } from "@src/dao/tag";
import Tag from "@src/entity/Tag";
import Account from "@src/entity/Account";

export const queryArticle = async (
  {
    id,
    tags,
    pager,
    title
  }: {
    id?: number;
    tags?: string[];
    pager: Pager;
    title: string;
  },
  selectContent
) => {
  return await find({ id, tags, pager, title }, selectContent);
};

export const createArticle = async ({
  account,
  title,
  tags
}: {
  title: string;
  tags?: string[];
  account: Account;
}) => {
  const result = await insert({
    account,
    title,
    tags: tags && (await _getTagEntities(tags))
  });
  return result;
};

export const deleteArticle = async ({ id }: { id: number }) => {
  return await remove([id]);
};

export const updateArticle = async ({
  id,
  title,
  content,
  tags,
  top
}: {
  id: number;
  title?: string;
  content?: string;
  tags?: string[];
  top?: number;
}) => {
  return await update(id, {
    title,
    content,
    tags: tags && (await _getTagEntities(tags)),
    top
  });
};

async function _getTagEntities(tags) {
  // 找到已经有的tags
  const tagsExist = await findMany(tags);
  // new出没有的tags
  const tagsNew = tags.filter(str => tagsExist.every(x => x.name !== str));
  // 赋值给tags
  const results = tagsExist.concat(
    tagsNew.map(name => {
      return new Tag({ name, type: "article" });
    })
  );
  return results;
}
