import { dbConnect } from "@/db/dbConnect";
import { blogModel } from "@/models/blogModel";
import { NextResponse } from "next/server";

export async function GET(request,{ params }) {
    const slug = params.slug
    console.log(slug);
    try {
        await dbConnect();
        const post = await blogModel.findOne({ slug: slug });
        if(!post)
            return NextResponse.json({ message:"post not found",status:404})
        return NextResponse.json({ post: post }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'Error fetching post' }, { status: 500 });
    }
}