import { Entity, Column } from "typeorm";
import BaseEntity from './BaseEntity'

@Entity({
    name: 'bi_page_view'
})
export default class PageView extends BaseEntity {

    @Column({
        type: 'int'
    })
    accountId: number;

    @Column({
        type: 'timestamp'
    })
    timestamp: Date;

    constructor() {
        super()
        this.timestamp = new Date()
    }

}