import { Entity, Column, ManyToMany, JoinTable, ManyToOne, JoinColumn } from "typeorm";
import BaseEntity from './BaseEntity'
import Account from './Account'
import ChatGroup from "./ChatGroup";

@Entity({
    name: 'chat_message'
})
export default class ChatMessage extends BaseEntity {

    @Column({
        type: 'int'
    })
    account_id: number;

    @Column({
        type: 'int'
    })
    group_id: number;

    @Column({
        type: 'varchar'
    })
    type: string;

    @Column({
        type: 'text'
    })
    content: string;

    @Column({
        type: 'timestamp'
    })
    timestamp: Date;

    @Column({
        type: 'tinyint'
    })
    read: boolean;

    @ManyToOne(type => Account, account => account.messages, { cascade: true })
    @JoinTable({
        name: 'account'
    })
    @JoinColumn({ name: 'account_id' })
    account: Account;

    @ManyToOne(type => ChatGroup, group => group.messages, { cascade: true })
    @JoinTable({
        name: 'chat_group'
    })
    @JoinColumn({ name: 'group_id' })
    group: ChatGroup;

    constructor({ content, type, timestamp, group_id, account_id }: any = {}) {
        super()
        this.content = content;
        this.type = type || 'default';
        this.timestamp = timestamp;
        this.group_id = group_id;
        this.account_id = account_id
    }

}