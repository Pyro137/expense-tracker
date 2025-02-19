import { transactions, users } from "../dummyData/data.js"
import Transaction from "../models/transaction.model.js"
const transactionResolver={
    Query:{
        transactions:async(_,_,context)=>{
            try{
                const userId =await context.getUser()._id
                if(!userId){
                    throw new Error("User not authenticated")
                }
                const transactions=Transaction.find({ userId: userId})
                return transactions
            }catch(error){
                console.log("Error in transaction transaction.resolver ",error.message)
                throw new Error(error.message)
            }
        },
        transaction:async(_,args,context)=>{
            try{
                const userId = await context.getUser()._id
                if(!userId){
                    throw new Error("User not authenticated")
                }
                const transaction=await Transaction.findById(args.id)
                if(!transaction){
                    throw new Error("Transaction not found")
                }
                if(transaction.userId.toString()!== userId.toString()){
                    throw new Error("Unauthorized to view this transaction")
                }
                return transaction
            }catch(error){
                console.log("Error in transaction transaction.resolver ",error.message)
                throw new Error(error.message)
            }
        }
    },
    Mutation:{
        createTransaction:async(_,{input},context)=>{
            try{
                const newTransaction =Transaction.create({
                    ...input,
                    userId: await context.getUser()._id
                })
                await newTransaction.save()
                return newTransaction
            }catch(error){
                console.log("Error in transaction createTransaction.resolver ",error.message)
                throw new Error(error.message)
            }
        },
        updateTransaction:async(_,{input})=>{
            try{
                const updateTransaction =Transaction.findById(input.transactionId,input,{new:true})
                return updateTransaction
            }catch(error){
                console.log("Error in transaction updateTransaction.resolver ",error.message)
                throw new Error(error.message)
            }
        },
        deleteTransaction:async(_,{transactionId})=>{
            try{
                const deletedTransaction = await Transaction.findByIdAndDelete(transactionId)
                if(!deletedTransaction){
                    throw new Error("Transaction not found")
                }
                return deletedTransaction
            }catch(error){
                console.log("Error in transaction deleteTransaction.resolver ",error.message)
                throw new Error(error.message)
            }
        }
    }
}
export default transactionResolver
const {description,paymentType,category,amount,date,location}=input