import { BadRequestException } from "@nestjs/common";
import { Expose } from "class-transformer";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

export interface CreateProduct {
    name: string;
    price: number;
    stock?: number;
    isActive?: boolean;
    description: string;
}

export interface UpdateProduct extends CreateProduct{};

@Entity()
export class Product {
    static DEFAULT_STOCK = 0;
    static DEFAULT_ACTIVE = false;

    @CreateDateColumn()
    @Expose({ groups: ['group_products'] })
    createdAt: Date;

    @PrimaryGeneratedColumn()
    @Expose({ groups: ['group_products'] })
    id: string;

    @Column({
        type: 'int',
      })
    @Expose({ groups: ['group_products'] })
    price: number;

    @Column()
    @Expose({ groups: ['group_products'] })
    private name: string;

    @Column({
        type: 'int',
      })
    @Expose({ groups: ['group_products'] })
    private stock: number;

    @Column()
    @Expose({ groups: ['group_products'] })
    private isActive: boolean;

    @Column()
    @Expose({ groups: ['group_products'] })
    private description: string;

    public constructor(product?: CreateProduct) {
        if (!product) {
            return;
        }
        this.verifyCreateProductIsValid(product);

        this.name = product.name;
        this.price = product.price;
        this.isActive = product.isActive || Product.DEFAULT_ACTIVE;
        this.stock = product.stock || Product.DEFAULT_STOCK;
        this.description = product.description;
    }

    private verifyCreateProductIsValid(product: CreateProduct): void {
        if(!product.name || !product.price || !product.description){
            throw new BadRequestException('Product name, price and description are required');
        }
    }

    public update(product: UpdateProduct): void {
        this.verifyCreateProductIsValid(product);

        this.name = product.name;
        this.price = product.price;
        this.isActive = product.isActive || this.isActive;
        this.stock = product.stock || this.stock;
        this.description = product.description;
    }

    public decrementStock(quantity: number): void {
        if(quantity > this.stock){
            throw new BadRequestException('Quantity of items cannot exceed stock');
        }
        this.stock -= quantity;
    }

    public getName(): string {
        return this.name;
    }

    public getStock(): number {
        return this.stock;
    }
}