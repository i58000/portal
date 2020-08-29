import {
  Entity,
  Column,
  OneToMany,
  JoinTable,
  ManyToMany,
  ManyToOne,
  JoinColumn
} from "typeorm";
import BaseEntity from "./BaseEntity";
import Tag from "./Tag";
import Account from "./Account";

@Entity({
  name: "article"
})
export default class Article extends BaseEntity {
  @Column({
    type: "int"
  })
  top: number;

  @Column({
    type: "varchar"
  })
  title: string;

  @Column({
    type: "longtext",
    select: false
  })
  content: string;

  @ManyToMany(type => Tag, tag => tag.articles, {
    cascade: ["insert", "update"]
  })
  @JoinTable({
    name: "article_tag_rel",
    joinColumn: { name: "article_id", referencedColumnName: "id" },
    inverseJoinColumn: { name: "tag_id", referencedColumnName: "id" }
  })
  tags: Tag[];

  @ManyToOne(type => Account)
  @JoinColumn({ name: "created_by" })
  account: Account;

  // @Column({})

  constructor({ id, title, tags, account }: any = {}) {
    super();
    this.id = id;
    this.title = title;
    this.tags = tags;
    this.account = account
  }
}
