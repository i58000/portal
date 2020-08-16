import { Entity, Column, ManyToMany, JoinTable, OneToMany } from "typeorm";
import BaseEntity from './BaseEntity'
import Account from './Account';
import ChatMessage from "./ChatMessage";
import ChatGroupAccountRel from './ChatGroupAccountRel';

@Entity({
    name: 'chat_group'
})
export default class ChatGroup extends BaseEntity {

    @Column({
        type: 'varchar'
    })
    title: number;

    @Column({
        type: 'varchar'
    })
    type: string;

    @ManyToMany(type => Account, { cascade: true })
    @JoinTable({
        name: 'chat_group_account_rel',
        joinColumn: { name: 'group_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'account_id', referencedColumnName: 'id' }
    })
    accounts: Account[];

    @OneToMany(type => ChatMessage, message => message.group)
    messages: ChatMessage[];

    @OneToMany(type => ChatGroupAccountRel, rel => rel.group)
    groupAccountRels: ChatGroupAccountRel[];

    constructor({ title, type }: any = {}) {
        super()
        this.title = title;
        this.type = type || 'default'
    }

}