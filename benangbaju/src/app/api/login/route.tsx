import Users from "@/db/models/Users";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    const access_token = await Users.login(body);
    
    return Response.json(
      {
        access_token,
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof ZodError) {
      const errPath = error.issues[0].path[0];
      const { message } = error.issues[0];
      return NextResponse.json(
        {
          message: `${errPath} ${message}`,
        },
        { status: 400 }
      );
    }
    if (error instanceof Error) {
      if (error.message === "Invalid Username or Password")
        return NextResponse.json(
          {
            message: error.message,
          },
          { status: 400 }
        );
    }
    return NextResponse.json(
      {
        message: `Internal Server Error`,
      },
      { status: 500 }
    );
  }
};
