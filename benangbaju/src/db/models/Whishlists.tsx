import { NextResponse } from "next/server";
import db from "../config/mongodbConnection";

interface WishlistInput {
  _id: string;
  userId: string;
  productId: string;
}

class Whishlists {
  static async getAll() {
    try {
      const data = await db.collection("Whislists").find().toArray();

      return NextResponse.json({
        data,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async addWishList(data: WishlistInput) {
    try {
      const res = await db.collection("Whislists").insertOne(data);

      return NextResponse.json(
        {
          res,
        },
        { status: 201 }
      );
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

export default Whishlists;
