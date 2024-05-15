import Products from "@/db/models/Products"
import { NextResponse } from "next/server"

export async function GET() {
    try {
        console.log("masuk api")
        const data = await Products.getAllProducts()
        // console.log(data)
        return NextResponse.json({
            data: data
        })
    } catch (error) {
		return NextResponse.json(
			{
				message: `Internal Server Error`,
			},
			{ status: 500 }
		);
    }
}