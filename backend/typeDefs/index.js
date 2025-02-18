import { mergeTypeDefs } from "@graphql-tools/merge";

// typeDefs
import userTypeDef from "./user.typeDef.js";
import transactionTypeDef from "./transaction.typeDef.js";

const mergedTypeDefs = mergeTypeDefs([transactionTypeDef,userTypeDef])
export default mergedTypeDefs