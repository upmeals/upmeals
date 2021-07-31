import {
    addRelated,
    apiCleanRecord as cleanRecord,
    attachToRecord,
    createRecord,
    fetchRecord,
    indexAll,
    indexRecords,
    indexRelatedRecords,
    rawDelete,
    rawPost,
    removeRecord,
    setRecord,
    updateRecord,
} from '../../store/ducks/api/operations';
import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

const mapState = (state) => ({ entities: state.api.entities });
const mapDispatch = (dispatch) =>
    bindActionCreators(
        {
            addRelated,
            attachToRecord,
            cleanRecord,
            createRecord,
            fetchRecord,
            indexAll,
            indexRecords,
            indexRelatedRecords,
            rawDelete,
            rawPost,
            removeRecord,
            setRecord,
            updateRecord,
        },
        dispatch
    );

export const APIPropTypes = {
    addRelated: PropTypes.func.isRequired,
    attachToRecord: PropTypes.func.isRequired,
    cleanRecord: PropTypes.func.isRequired,
    createRecord: PropTypes.func.isRequired,
    entities: PropTypes.object.isRequired,
    fetchRecord: PropTypes.func.isRequired,
    indexAll: PropTypes.func.isRequired,
    indexRecords: PropTypes.func.isRequired,
    removeRecord: PropTypes.func.isRequired,
    setRecord: PropTypes.func.isRequired,
    updateRecord: PropTypes.func.isRequired,
    indexRelatedRecords: PropTypes.func.isRequired,
    rawDelete: PropTypes.func.isRequired,
    rawPost: PropTypes.func.isRequired,
};

const withAPI = (WrappedComponent) => {
    const Component = (props) => <WrappedComponent {...props} />;
    const component = connect(mapState, mapDispatch)(Component);
    component.displayName = `withAPI(${WrappedComponent.displayName || "WrappedComponent"
        })`;
    return component;
};

export default withAPI;
