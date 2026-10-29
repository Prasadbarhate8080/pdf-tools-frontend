import { dbConnect } from "@/db/dbConnect";
import { contactModel } from "@/models/contactModel";
import { NextResponse } from "next/server";

export async function GET(request){
    try {
        await   dbConnect();
        let messages = await contactModel.find()
        if(!messages)
            return NextResponse.json({message:"no messages",status:404})
        return NextResponse.json({messages:messages,status:200})
        
    } catch (error) {
        console.log(error)
        return NextResponse.json({message:"Internal server error",status:500})
    }
}