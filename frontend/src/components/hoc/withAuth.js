import {
    register,
    login,
    logoutUser,
    fetchProfile,
    updateProfile,
    refreshToken
} from '../../store/ducks/user/operations';
import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

const mapState = (state) => ({ user: state.user });
const mapDispatch = (dispatch) =>
    bindActionCreators(
        {
            register,
            login,
            logoutUser,
            fetchProfile,
            updateProfile,
            refreshToken
        },
        dispatch
    );

export const APIPropTypes = {
    register: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
    logoutUser: PropTypes.func.isRequired,
    fetchProfile: PropTypes.func.isRequired,
    updateProfile: PropTypes.func.isRequired,
    refreshToken: PropTypes.func.isRequired,
};

const withAuth = (WrappedComponent) => {
    const Component = (props) => <WrappedComponent {...props} />;
    const component = connect(mapState, mapDispatch)(Component);
    component.displayName = `withAuth(${WrappedComponent.displayName || "WrappedComponent"
        })`;
    return component;
};

export default withAuth;
