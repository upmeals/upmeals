import _ from "lodash";
import PropTypes from "prop-types";
import React, { useCallback, useEffect, useState } from "react";

import { useHistory } from 'react-router-dom';

import withAPI, { APIPropTypes } from "./withAPI";



export const WithRecordPropTypes = {
    reloadRecord: PropTypes.func.isRequired,
    updateRecord: PropTypes.func.isRequired,
    record: PropTypes.object.isRequired,
    match: PropTypes.object,
    removeRecord: PropTypes.func.isRequired,
    removeOtherRecord: PropTypes.func.isRequired,
};


const WrapperPropTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            recordId: PropTypes.string,
        }).isRequired,
    }),
    ...APIPropTypes,
};


const defaultOptions = {
    include: [],
    fields: {},
    Loader: null,
    loadOnMount: true,
    ErrorHandler: null,
    redirectToAfterError: null,
    allowEarlyDisplay: true,
};



const withRecord = (recordType, options = {}) => (WrappedComponent) => {
    const {
        allowEarlyDisplay,
        include,
        fields,
        Loader,
        loadOnMount,
        ErrorHandler,
        redirectToAfterError,
    } = _.defaults(options, defaultOptions);
    const Component = ({
        entities,
        recordId,
        fetchRecord,
        match,
        removeRecord,
        updateRecord,
        ...props
    }) => {
        const history = useHistory();
        const [error, setError] = useState(false);
        const [ready, setReady] = useState(false);
        
        const searchId = (history.location.search !== '' && history.location.search.includes('id')) ? history.location.search.split('?id=')[1] : undefined
        const thisId = recordId || match.params.recordId || searchId;

        const loadRecord = useCallback(
            () => fetchRecord(recordType, thisId, { include, fields }),
            [fetchRecord, thisId]
        );

        const updateThisRecord = (attributes, relationships) =>
            updateRecord(recordType, thisId, attributes, relationships);

        const removeThisRecord = () => removeRecord(recordType, thisId);

        const resetError = () => setError(false);

        const collection = entities[recordType] || {};
        const record = props.record || collection[thisId];

        useEffect(() => {
            if (thisId) {
                setReady(false);
                if (!record || loadOnMount) {
                    loadRecord()
                        .then((response) => {
                            if (response.error) {
                                throw response.payload;
                            }
                        })
                        .catch(setError)
                        .finally(() => setReady(true));
                } else {
                    setReady(true);
                }
            }
        }, [thisId, loadRecord]); // eslint-disable-line react-hooks/exhaustive-deps

        if (!thisId) {
            return null;
        }

        if (error && ErrorHandler) {
            let props = {
                open: error ? true : false,
                error: error,
                resetError,
                redirectToOnClose: redirectToAfterError,
            };
            return <ErrorHandler {...props} />;
        }

        let defaultComponent = ready || !Loader ? null : <Loader />;

        try {
            if (!record || (!ready && !allowEarlyDisplay)) {
                return defaultComponent;
            }
            return (
                <WrappedComponent
                    entities={entities}
                    record={record}
                    reloadRecord={loadRecord}
                    updateRecord={updateThisRecord}
                    removeRecord={removeThisRecord}
                    removeOtherRecord={removeRecord}
                    fetchRecord={fetchRecord}
                    ready={ready}
                    {...props}
                />
            );
        } catch (_) {
            return defaultComponent;
        }
    };

    Component.propTypes = WrapperPropTypes;

    Component.defaultProps = {
        match: {
            params: {
                recordId: null,
            },
        },
    };

    const connected = withAPI(Component);
    connected.displayName = `withRecord('${recordType}')(${WrappedComponent.displayName || "Component"
        })`;
    return connected;
};



export default withRecord;
