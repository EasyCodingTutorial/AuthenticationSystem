// For Connection
import ConnectToDb from "@/Utils/connectToDb";

// For Schema
import userSchema from "@/Schema/userSchema";

import { NextResponse } from "next/server";

import bcrypt from 'bcryptjs'


export async function POST(req:Request){

    try {
        // For Connection
    await ConnectToDb()
    const {name, email, password, aboutYou, message, isAdmin } = await req.json()

    // Lets Hash The Password
    const hassedPassword = await bcrypt.hash(password, 10)


    const newUser = await userSchema.create({
        name, email, password:hassedPassword, aboutYou , isAdmin:isAdmin || false, message
    })

    if(newUser){
        return NextResponse.json({
            success:true,
        }, {status:200})
    }else{
        return NextResponse.json({
            success:false,
        }, {status:501})
    }
    } catch (error) {
        return NextResponse.json({
            error:error
        }, {status:500})
    }

}