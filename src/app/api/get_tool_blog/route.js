import { dbConnect } from "@/db/dbConnect";
import { blogModel } from "@/models/blogModel";
import { NextResponse } from "next/server";

export async function GET(request){
    try {
        await dbConnect()
        let searchParams = request.nextUrl.searchParams.get('toolName')
        let toolName = searchParams.get("toolName")
        let blogPosts = await blogModel.find({toolName:toolName})
        if(!blogPosts)
            return NextResponse.json({Message:"No posts found",status:404})
        return NextResponse.json({posts:blogPosts,status:200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({message:"internma server error",status:500})
    }
}