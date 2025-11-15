import { dbConnect } from "@/db/dbConnect";
import { blogModel } from "@/models/blogModel";
import { NextResponse } from "next/server";

export async function GET(request){
    try {
        await   dbConnect();
        let blogPosts = await blogModel.find({ToolName:"merge"});
        if(!blogPosts)
            return NextResponse.json({message:"no posts found",status:404})
        return NextResponse.json({posts:blogPosts,status:200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({message:"Internal server error",status:500})
    }
}