import { gql } from "@apollo/client";

export const SIGN_UP = gql`
	mutation SignUp($input: SignUpInput!) {
		signup(input: $input) {
			_id
			name
			username
		}
	},    
`;

export const LOGIN = gql`
    mutation Login($input: LoginInput!) {
        login(input: $input) {
            _id
            username
            name
        }
}
`

export const LOG_OUT = gql`
    mutation LogOut {
        logout{
            message
        }
    }
`

