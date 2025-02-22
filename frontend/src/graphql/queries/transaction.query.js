import { gql } from "@apollo/client";

export const GET_TRANSACTIONS=gql`
    query GetTransactions{
        transactions{
            _id
            amount
            paymentType
            description
            category
            location
            date
        }
    }
`
export const GET_TRANSACTION=gql`
    query GetTransaction($transactionId:ID!){
        transaction(transactionId:$transactionId){
            _id
            amount
            paymentType
            description
            category
            location
            date
        }
    }
`