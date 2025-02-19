import passport from "passport"
import bcrypt from "bcryptjs"

import User from "../models/user.model.js"
import { GraphQLLocalStrategy } from "graphql-passport"

export const configurePassport=async()=>{
    passport.serializeUser((user,done)=>{
        console.log("Serializing User")
        done(null,user.id)
    });

    passport.deserializeUser(async(id,done)=>{
        console.log("Deserializing User")
        try{
            const user= await User.findById(id)
            done(null,user)
        }catch(err){
            done(err)
        }
    });

    passport.use(
        new GraphQLLocalStrategy(async(username,password,done)=>{
            try{
                const user=await User.findOne({username})
                if(!user){
                    return done(null,false, {message: "Invalid credentials"})
                }
                const validPassword=await bcrypt.compare(password,user.password)
                if(!validPassword){
                    return done(null,false, {message: "Password credentials invalid"})
                }
                return done(null,user)
            }catch(err){
                return done(err)
            }
        })
    )

}