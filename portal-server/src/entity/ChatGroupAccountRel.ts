import { Entity, Column, ManyToMany, JoinTable, ManyToOne, JoinColumn } from "typeorm";
import BaseEntity from './BaseEntity'
import ChatGroup from './ChatGroup'

@Entity({
    name: 'chat_group_account_rel'
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
        type: 'int'
    })
    unread: number;

    @ManyToOne(type => ChatGroup, group => group.groupAccountRels)
    @JoinColumn({name: 'group_id'})
    group: ChatGroup;

    constructor() {
        super()
    }

}