import { useEffect, useState } from "react";
import { QueryList } from '../interfaces/Queries'
import { gqlCollectionIndex } from "../services/gql/Collection";


const defaultPageLength = 100


const useAllRecords = (
    pageLength: number,
    { collection, fields, options } : QueryList,
) => {
    const [loading, setLoading] = useState(false);
    const [records, setRecords] = useState([])
    const [totalPages, setTotalPages] = useState(0)

    useEffect(() => {
        setLoading(true)

        gqlCollectionIndex({ collection, fields, options })
            .then((response) => {

                setRecords(response.data)

                if (response.data && response.data && response.data.length > 0) {
                    if (pageLength) {
                        setTotalPages(Math.ceil(response.data.length / pageLength))
                    } else {
                        setTotalPages(Math.ceil(response.data.length / defaultPageLength))
                    }
                } else {
                    setTotalPages(0)
                }
            })
            .catch((e) => {
                console.error(e)
            })
            .finally(() => {
                setLoading(false)
            })
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return { loading, records, totalPages }
}


export default useAllRecords
