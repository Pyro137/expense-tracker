import {users} from "../dummyData/data.js"
import User from "../models/user.model.js";

const userResolver={
    Mutation:{
        signUp:async(_,{input},context)=>{
            try{
                const {username,name,password,gender}=input;
                if (!username||!name||!password||!gender){
                    throw new Error("All fields are required")
                }
                const existingUser=users.find((user)=>user.username===username)
                if (existingUser){
                    throw new Error("Username already exists")
                }
                const salt =bcrypt.genSalt(10)
                const hashedPassword= await bcrypt.hashSync(password,salt)

                const boyPicture= `https://avatar.iran.liara.run/public/boy?username=${username}`
                const girlPicture= `https://avatar.iran.liara.run/public/girl?username=${username}`
                
                const newUser=User.create({
                    username,
                    name,
                    password: hashedPassword,
                    gender,
                    profilePicture: gender==="male"?boyPicture:girlPicture,
                })
                await newUser.save()
                await context.login(newUser)
                return newUser;

            }catch(err){
                console.log("SignUp failed ", err)
                throw new Error("SignUp failed",err.message)
            }
        },
        login:async(_,{input},context)=>{
            try{
            const {username,password}=input;
            const {user}= await context.authenticate("graphql-local",{username,password})
            if(!user){
                throw new Error("Invalid credentials")
            }
            await context.login(user)
            return user
        }catch(err){
                throw new Error("Login failed",err.message)
            }
        },
        logout: async(_,_,context)=>{
            await context.logout()
            req.session.destroy((error)=>{
                if(error){
                    console.log("Error destroying session", error)
                }
                res.clearCookie("connect.sid")
                return null
            })
            return {message:"Log out successfully"}
        }
    },
    Query:{ 
        authUser:async(_,_,context)=>{
            try{
                const user=await context.getUser();
                return user
            }catch(err){
                console.log("Failed in aAuthUser user.resolver ", err)
                throw new Error("Failed to fetch user")
            }
        },
        user:async(_,{userId})=>{
            try{
                const user = await User.findById(userId);
                return user
            }catch(err){
                console.log("Failed in user user.resolver ", err)
                throw new Error("Failed to fetch user")
            }
        }
    },


}

export default userResolver