import { dbConnect } from "@/db/dbConnect";
import { buttonClickModel } from "@/models/buttonClicksModel";
import { NextResponse } from "next/server";

export async function POST(request){
    try {
    await dbConnect()
    const body = await request.json()
    if(!body.eventName) return NextResponse.json({message:"event name is undefined",status:400})
    let event = await buttonClickModel.create({
      eventName : body.eventName
    })
    if (event) return NextResponse.json({ message: 'event added succesfully' }, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({message:"Internal server error",status:500})
    }
}