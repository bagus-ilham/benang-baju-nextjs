import Product from "@/db/models/Products";
import { NextResponse } from "next/server";

export const GET = async (
  request: Request,
  { params }: { params: { slug: string } }
) => {
  try {
    const data = await Product.getProductBySlug(params.slug);
    // console.log(data);

    return NextResponse.json(data);
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "Not Found") {
        return NextResponse.json(
          {
            message: "Product Not Found",
          },
          { status: 404 }
        );
      }
    }

    NextResponse.json(
      {
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
};
