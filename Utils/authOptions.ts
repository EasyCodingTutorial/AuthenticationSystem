// For Connection
import ConnectToDb from "./connectToDb"

import userSchema from "@/Schema/userSchema"

import bcrypt from 'bcryptjs'

import {Jwt} from 'next-auth/jwt'


import { NextAuthOptions, SessionStrategy } from "next-auth"

 import CredentialsProvider from "next-auth/providers/credentials"

type CustomSessionStrategy = SessionStrategy | 'jwt'

export const authOptions: NextAuthOptions = {
    providers:[
        CredentialsProvider({
           credentials:{},
           async authorize(credentials){
            const {email, password} = credentials as {email: string, password:string,}

            try {
               await ConnectToDb()

               // Checking Email ID
               const userEmailCheck = await userSchema.findOne({email})

               if(!userEmailCheck){
                return null
               }

                 //Now For Password
                 const isPasswordCorrect = await bcrypt.compare(password, userEmailCheck.password)

                 if(!isPasswordCorrect){
                    return null
                 }

                //  if Email & Password are Correct Then Return Users Data
                return {
                     id: userEmailCheck._id.toString(),
                     email: userEmailCheck.email,
                     name: userEmailCheck.name,
                     isAdmin:userEmailCheck.isAdmin
                }
            } catch (error) {
                 console.log('Auth Error =>', error)
                 return null
            }

           }
        })
    ],
    session: {
        strategy:'jwt' as CustomSessionStrategy,
    },
    callbacks:{
        async jwt({token, user}){
          if(user){
            token.isAdmin = user.isAdmin;
            token.id = user.id
          }
          return token;
        },
        async session({session,token}){
            session.user.isAdmin = token.isAdmin as boolean;
            session.user.id = token.id as string
            return session
        }
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages:{
        signIn: '/',
        signOut:'/',

    }

}
