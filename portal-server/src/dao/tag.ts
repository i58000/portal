import Tag from "@src/entity/Tag";
import { createQueryBuilder, getRepository, FindOperator } from "typeorm";

export const find = async ({ name, id }): Promise<Tag[]> => {
  let query = createQueryBuilder(Tag, "t");
  if (id) query = query.andWhere("t.id = :id", { id });
  if (name) query = query.andWhere("t.name = :name", { name });
  return await query.getMany();
};

export const findMany = async (names: string[]) => {
  let query = createQueryBuilder(Tag, "t");
  query.where(`t.name in ('${names.join("','")}')`);
  return await query.getMany();
};

interface TagParams {
  type: Tag["type"];
  color: Tag["color"];
  name: Tag["name"];
  description: Tag["description"];
}

export const insert = async (
  param: TagParams | TagParams[]
): Promise<Tag | Tag[]> => {
  const repo = getRepository(Tag);
  if (Array.isArray(param)) {
    const existed = await findMany(param.map(({ name }) => name));
    if (existed.length > 0) throw new Error("已存在相同name的tag");
    const temps = [];
    param.forEach(({ type, color, name, description }) => {
      temps.push(new Tag({ name, color, type, description }));
    });
    const newEntities = await repo.save(temps);
    return newEntities;
  } else {
    const existed = await findMany([param.name]);
    if (existed.length > 0) throw new Error("已存在相同name的tag");
    const newEntity = await repo.save(new Tag(param));
    return newEntity;
  }
};

export const remove = async (id): Promise<Tag[]> => {
  const repo = getRepository(Tag);
  const tags = await repo.find({ id: new FindOperator("equal", id) });
  const result = await repo.remove(tags);
  return result;
};

export const update = async (
  id,
  { name, color, type, description }
): Promise<Tag> => {
  const repo = getRepository(Tag);
  const tag = await repo.findOne({ id: new FindOperator("equal", id) });

  if (name) tag.name = name;
  if (color) tag.color = color;
  if (type) tag.type = type;
  if (description) tag.description = description;

  return await repo.save(tag);
};
