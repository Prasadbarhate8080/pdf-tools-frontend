import { dbConnect } from "@/db/dbConnect";
import { blogModel } from "@/models/blogModel";
import { NextResponse } from "next/server";

export async function POST(request)
{
    try {
        await dbConnect();
        const body = await request.json();
        const data = body.data;
        const newBlog = new blogModel({
            title: data.title,
            description: data.description,
            slug: data.slug,
            content: data.content,
            imageUrl: data.imageUrl,
            ToolName: data.toolName
        })
        const saveBlog = await newBlog.save();
        if(saveBlog)        
            return NextResponse.json({message:'Blog added successfully',status:200})
        
    } catch (error) {
        console.log("in catch")
        return NextResponse.json({message:error.message,status:500})
    }
}