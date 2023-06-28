import React from "react";
import PropTypes from "prop-types";

function Loading(props) {
    return props.loading ? <i className="fa fa-spinner fa-spin m-2" /> : null;
}

export default Loading;

Loading.propTypes = {
    loading: PropTypes.bool,
};
