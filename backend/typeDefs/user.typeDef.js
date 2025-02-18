const userTypeDef=`#graphql
    type User {
        _id:ID!
        username:String!
        email:String!
        password:String!
        profilePicture:String
        gender:String!
    }

    type Query{
        users:[User!]
        authUser:User
        user(userId:ID!):User
    }

    type Mutation{
        signUp(input:SignUpInput!):User
        login(input:LoginInput!):User
        logout:LogoutResponse
    }

    input SignUpInput{
        username:String!
        email:String!
        password:String!
        gender:String!
    }
    input LoginInput{
        email:String!
        password:String!
    }

    type LogoutResponse{
        message:String!
    }

`
export default userTypeDef