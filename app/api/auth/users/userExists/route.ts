// For Connection
import ConnectToDb from "@/Utils/connectToDb";

// For Schema
import userSchema from "@/Schema/userSchema";

import { NextResponse } from "next/server";


export async function POST(req:Request){
    try {

        await ConnectToDb()

        const {email} = await req.json()
        const userCheck = await userSchema.findOne({email})

        if(!userCheck){
            return NextResponse.json({
                success:false,
            }, {status:404})
        }
        return NextResponse.json({userCheck}, {status:200})

    } catch (error) {
        return NextResponse.json({
            error:error
        }, {status:500})
    }
}