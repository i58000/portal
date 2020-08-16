import { Entity, Column, OneToMany, JoinTable } from "typeorm";
import BaseEntity from './BaseEntity'
import ChatMessage from "./ChatMessage";
import ChatGroupAccountRel from './ChatGroupAccountRel';

@Entity({
    name: "account"
})
export default class Account extends BaseEntity {

    @Column({
        type: 'varchar'
    })
    username: string;

    @Column({
        type: 'varchar',
        select: false
    })
    password: string;

    @Column({
        type: 'varchar'
    })
    nickname: string;

    @Column({
        type: 'varchar'
    })
    email: string;


    @OneToMany(type => ChatMessage, message => message.account)
    messages: ChatMessage[];


    constructor({ username, password, email }: any = {}) {
        super()
        this.username = username;
        this.password = password;
        this.email = email || "";
        this.nickname = username;
    }

}