import { dbConnect } from "@/db/dbConnect";
import { blogModel } from "@/models/blogModel";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        const url = new URL(request.url);
        const toolName = url.searchParams.get("toolName");
        await dbConnect()
        let blogPosts = await blogModel.find({ ToolName: toolName }).select("-content");
        console.log("blog posts:", blogPosts)
        if (!blogPosts)
            return NextResponse.json({ message: "no posts found", status: 404 })
        return NextResponse.json({ posts: blogPosts, status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "Internal server error", status: 500 })
    }


}