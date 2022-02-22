import { gql } from "@apollo/client";


export const MODAL_PROPS = gql`
	query ModalProps {
		modalProps @client
	}
`