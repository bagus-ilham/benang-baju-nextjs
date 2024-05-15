import { ObjectId } from "mongodb";
import { z } from "zod";
import db from "../config/mongodbConnection";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";

interface Users {
  _id: ObjectId;
  name: string;
  username: string;
  email: string;
  password: string;
}

interface NewUser {
  name: string;
  username: string;
  email: string;
  password: string;
}

interface Login {
  email: string;
  password: string;
}

const UserValidations = z.object({
  name: z.string(),
  username: z.string(),
  email: z.string().email("Must be email format"),
  password: z.string().min(5),
});

const LoginValidations = z.object({
  email: z.string().email("Must be email format"),
  password: z.string().min(5),
});

class Users {
  static async register(newUser: NewUser) {
    try {
      const validation = UserValidations.safeParse(newUser);
      if (!validation.success) {
        const errors = validation.error;
        throw errors;
      }

      const dataDbEmail = await db
        .collection("Users")
        .findOne({ email: newUser.email });

      const dataDbUsername = await db
        .collection("Users")
        .findOne({ username: newUser.username });

      if (dataDbUsername || dataDbEmail) {
        throw new Error("Username or Email already exists");
      }
      const user = {
        ...newUser,
        password: bcrypt.hashSync(newUser.password, 10),
      };

      await db.collection("Users").insertOne(user);
      return NextResponse.json(
        {
          message: "Register Success",
        },
        { status: 201 }
      );
    } catch (error) {
      throw error;
    }
  }

  static async login(data: Login) {
    try {
      const validation = LoginValidations.safeParse({
        email: data.email,
        password: data.password,
      });
      // console.log(validation)
      if (!validation.success) {
        const errors = validation.error;
        // console.log(errors);
        throw errors;
      }
      const user = await db.collection("Users").findOne({ email: data.email });
      const isMatch = bcrypt.compareSync(data.password, user.password);
      if (!user || !isMatch) throw new Error("Invalid Username or Password");

      const access_token = jwt.sign(
        {
          id: user._id,
          username: user.username,
          email: user.email,
        },
        process.env.SECRET as string
      );

      cookies().set("Authorization", `Bearer ${access_token}`);

      return access_token;
    } catch (error) {
      throw error;
    }
  }

  static async getAllUsers() {
    try {
      const data = await db.collection("Users").find().toArray();
      return data;
    } catch (error) {
      throw error;
    }
  }

  static async getUserById(id: string) {
    try {
      const data = await db
        .collection("Users")
        .findOne({ _id: new ObjectId(id) });
      return data;
    } catch (error) {
      throw error;
    }
  }

  static async getWishlist(id: string) {
    try {
      const data = await db.collection("Wishlists");
    } catch (error) {
      throw error;
    }
  }
}

export default Users;
