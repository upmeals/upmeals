import { gql } from "@apollo/client";


export const IS_APP_READY = gql`
  	query IsAppReady {
    	isAppReady @client
  	}
`;

export const MEALS = gql`
	query Meals {
		meals @client
	}
`;