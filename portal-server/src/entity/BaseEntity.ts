import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

export default class BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'timestamp'
    })
    created_at: Date;

    @Column({
        type: 'int'
    })
    created_by: number;

    @Column({
        type: 'timestamp'
    })
    updated_at: Date;

    @Column({
        type: 'int'
    })
    updated_by: number;

    constructor() {
        const cur = new Date();
        this.created_at = cur
        this.created_by = 0
        this.updated_at = cur
        this.updated_by = 0
    }
}