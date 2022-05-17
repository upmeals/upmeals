import { gql } from "@apollo/client";


export const IS_LOGGED_IN = gql`
  	query IsUserLoggedIn {
    	isLoggedIn @client
  	}
`;

export const CURRENT_USER = gql`
  	query CurrentUserVar {
    	currentUser @client
  	}
`;

export const OTP = gql`
  	query OtpVar {
    	otp @client
  	}
`;