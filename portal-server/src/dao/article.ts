import Article from "@src/entity/Article";
import { createQueryBuilder, getRepository } from "typeorm";

export const find = async (
  { id, tags, pager, title },
  selectContent = false
): Promise<any> => {
  console.log(id, tags, pager);
  let query = createQueryBuilder(Article, "a");
  query.leftJoinAndSelect("a.tags", "t");
  query.leftJoinAndSelect("a.account", "ac");

  if (selectContent) {
    query.addSelect("a.content");
  }

  if (id) query = query.andWhere("a.id = :id", { id });

  if (tags) {
    query.andWhere(qb => {
      const subQuery = createQueryBuilder(Article, "aa").leftJoinAndSelect(
        "aa.tags",
        "tt"
      );
      subQuery.andWhere(`tt.name in ('${tags.join("','")}')`);

      subQuery.select("aa.id");

      subQuery.groupBy("aa.id");

      subQuery.andHaving(`count(tt.name) = ${tags.length}`);

      return "a.id in " + `( ${subQuery.getQuery()} )`;
    });
  }

  if (title) {
    query.andWhere("a.title like :title", { title: `%${title}%` });
  }

  if (pager) {
    query.skip(pager.size * pager.index).take(pager.size);
  }

  query.addOrderBy("a.top", "DESC");
  query.addOrderBy("a.created_at", "DESC");

  console.log("sql", query.getSql());
  const total = await query.getCount();
  const data = await query.getMany();
  // console.log("total data", total, data);

  return { data, total };
};

export const insert = async ({ account, title, tags }): Promise<Article> => {
  const repo = getRepository(Article);
  const temp = new Article({
    account,
    title,
    tags
  });
  console.log(temp);
  const newEntity = await repo.save(temp);
  return newEntity;
};

export const remove = async (ids: number[]): Promise<Article[]> => {
  const repo = getRepository(Article);
  const articles = await repo.findByIds(ids);
  const result = await repo.remove(articles);
  return result;
};

export const update = async (
  id,
  { title, content, tags, top }
): Promise<Article> => {
  let query = createQueryBuilder(Article, "a");
  query.leftJoinAndSelect("a.tags", "t");
  query.whereInIds([id]);
  const article = await query.getOne();

  if (tags) {
    article.tags = tags;
  }
  if (top !== undefined) {
    article.top = top;
  }

  if (title) article.title = title;
  if (content) article.content = content;

  return await getRepository(Article).save(article);
};
