import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm";

@Entity("cocktail")
export class Cocktail {
  
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column("varchar", { length: 100, name: "name", unique: true })
  name!: string;

  @Column("text", { name: "description" })
  description!: string;

  @Column("text", { name: "image_url" }) 
  imageUrl!: string;

  @Column("simple-array", { name: "ingredients" })
  ingredients!: string[];

  @Column("text", { name: "instructions" })
  instructions!: string;

  @CreateDateColumn({ name: "created_at" }) 
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at" }) 
  updatedAt!: Date;

  @DeleteDateColumn({ name: "deleted_at" }) 
  deletedAt?: Date; 
}