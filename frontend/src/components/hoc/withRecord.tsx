import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { gqlCollectionGet, gqlCollectionUpdate, gqlCollectionDelete } from '../../services/gql/Collection';



export type UpdateThisRecord = {
    item: object,
    fields?: string,
}


interface WrappedComponentProps {
    match: {
        params: {
            recordId: string
        }
    },
    fields: string
}


const withRecord = (
    recordType: string, 
    fields?: string,
) => (WrappedComponent : React.FunctionComponent<any>) => {
    const Component = ({
        match,
        fields,
        ...props
    }: WrappedComponentProps) => {
        const history = useHistory();
        const [error, setError] = React.useState(false);
        const [loading, setLoading] = React.useState(true);
        const [record, setRecord] = React.useState(undefined);

        let numberRegex = /^\d+$/
        let rawLocationEnd = history.location.pathname.split('/').at(-1) as string

        const searchId = (history.location.search !== '' && history.location.search.includes('id')) ? history.location.search.split('id=')[1] : 0
        const locationId = (numberRegex.test(rawLocationEnd)) ? parseInt(rawLocationEnd) : 0

        const thisId = match.params.recordId || searchId || locationId

        // fetch
        const fetchThisRecord = async () => {
            setLoading(true)
            let res = await gqlCollectionGet({ collection: recordType, id: thisId, fields})
            if (res && !res.error) {
                setRecord(res.data)
            } else {
                setError(res.error)
            }
            setLoading(false)
        }

        //update
        const updateThisRecord = async ({ item, fields } : UpdateThisRecord) => {
            setLoading(true)
            let res = await gqlCollectionUpdate({ collection: recordType, id: thisId, item, fields })
            if (res && !res.error) {
                setRecord(res.data)
            } else {
                setError(res.error)
            }
            setLoading(false)
        }

        //delete
        const deleteThisRecord = async () => {
            setLoading(true)
            let res = await gqlCollectionDelete({ collection: recordType, id: thisId })
            if (res && !res.error) {
                setRecord(undefined)
            } else {
                setError(res.error)
            }
            setLoading(false)
        }


        useEffect(() => {
            if (thisId !== undefined) {
                if (!record) {
                    fetchThisRecord()
                }
            }
        }, [thisId]) // eslint-disable-line react-hooks/exhaustive-deps

        
        return (
            <WrappedComponent
                loading={loading}
                error={error}
                record={record}
                fetchRecord={fetchThisRecord}
                updateRecord={updateThisRecord}
                deleteRecord={deleteThisRecord}
                {...props}
            />
        )
    }

    // Append match to component
    Component.defaultProps = {
        match: {
            params: {
                recordId: null,
            },
        },
        fields
    };

    return Component
}


export default withRecord 