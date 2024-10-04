import { BadRequestException } from "@nestjs/common";
import { Expose } from "class-transformer";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

export interface CreateDiscount {
    name: string;
    amount?: number;
    code: string;
}

@Entity()
export class Discount {
    static DEFAULT_AMOUNT = 1500;

    @CreateDateColumn()
    @Expose({ groups: ['group_discounts'] })
    createdAt: Date;

    @PrimaryGeneratedColumn()
    @Expose({ groups: ['group_discounts'] })
    id: string;

    @Column({
        type: 'int',
      })
    @Expose({ groups: ['group_discounts'] })
    private amount: number;

    @Column()
    @Expose({ groups: ['group_discounts'] })
    private name: string;

    @Column()
    @Expose({ groups: ['group_discounts'] })
    private code: string;

    public constructor(discount?: CreateDiscount) {
        if (!discount) {
            return;
        }
        this.verifyCreateDiscountIsValid(discount);

        this.name = discount.name;
        this.amount = discount.amount || Discount.DEFAULT_AMOUNT;
        this.code = discount.code;
    }

    private verifyCreateDiscountIsValid(discount: CreateDiscount): void {
        if (!discount.name || !discount.code) {
            throw new BadRequestException('Name and code are required');
        }
    }

    getAmount(): number {
        return this.amount;
    }
}