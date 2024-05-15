import { ObjectId } from "mongodb";
import { z } from "zod";
import db from "../config/mongodbConnection";

interface Products {
  _id: ObjectId;
  name: string;
  slug: string;
  description: string;
  excerpt: string;
  price: number;
  tags: [string];
  thumbnail: string;
  images: [string];
  createdAt: string;
  updatedAt: string;
}

interface NewProduct {
  name: string;
  slug: string;
  description: string;
  excerpt: string;
  price: number;
  tags: [string];
  thumbnail: string;
  images: [string];
  createdAt: string;
  updatedAt: string;
}

const ProductsValidations = z.object({
  name: z.string(),
  slug: z.string(),
  description: z.string(),
  excerpt: z.string(),
  price: z.number(),
  tags: z.array(z.string()),
  thumbnail: z.string(),
  images: z.array(z.string()),
  createdAt: z.string(),
  updatedAt: z.string(),
});

class Products {
  static async addProduct(newProduct: NewProduct) {
    try {
      const validation = ProductsValidations.safeParse(newProduct);
      if (!validation.success) {
        const errors = validation.error;
        throw errors;
      }
      const data = await db.collection("Products").insertOne(newProduct);
      return data;
    } catch (error) {
      throw error;
    }
  }

  static async getAllProducts() {
    try {
      const data = await db.collection("Products").find().toArray();
      return data;
    } catch (error) {
      throw error;
    }
  }

  static async getProductById(_id: string) {
    try {
      const data = await db
        .collection("Products")
        .findOne({ _id: new ObjectId(_id) });

      if (!data) throw new Error("Not Found");
      return data;
    } catch (error) {
      throw error;
    }
  }

  static async getProductBySlug(slug: string) {
    try {
      const data = await db.collection("Products").findOne({ slug });

      if (!data) throw new Error("Not Found");
      return data;
    } catch (error) {
      throw error;
    }
  }

  static async getByname(name: string) {
    try {
      const regname = new RegExp(`.*${name}.*`);

      const data = (
        await db.collection("Products").find({
          $or: [{ name: regname }, { slug: regname }],
        })
      ).toArray();

      return data;
    } catch (error) {
      throw error;
    }
  }
}

export default Products;
