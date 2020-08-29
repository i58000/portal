import {
  Entity,
  Column,
  ManyToOne,
  JoinTable,
  ManyToMany,
  PrimaryColumn
} from "typeorm";
import BaseEntity from "./BaseEntity";
import Article from "./Article";

@Entity({
  name: "tag"
})
export default class Tag extends BaseEntity {
  @Column({
    type: "varchar",
    unique: true
  })
  name: string;

  @Column({
    type: "varchar"
  })
  description: string;

  @Column({
    type: "varchar"
  })
  color: string;

  @Column({
    type: "varchar"
  })
  type: string;

  //   @ManyToMany(type => Article, { cascade: true })
  //   @JoinTable({
  //     name: "article_tag_rel",
  //     joinColumn: { name: "article_id", referencedColumnName: "id" },
  //     inverseJoinColumn: { name: "article_id", referencedColumnName: "id" }
  //   })
  //   article: Article;

  @ManyToMany(type => Article, article => article.tags, {
    // cascade: ["insert", "update"]
  })
  articles: Article[];

  constructor({ id, name, color, type, description }: any = {}) {
    super();
    this.id = id;
    this.name = name;
    this.color = color;
    this.type = type;
    this.description = description;
  }
}
