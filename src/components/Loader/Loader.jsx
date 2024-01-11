import React from 'react';
import { Audio } from 'react-loader-spinner';
import '../styles.css';
import PropTypes from 'prop-types';

const Loader = ({ loading }) => {
  return loading ? (
    <div className="loader-container">
      <Audio type="Oval" color="#00BFFF" height={50} width={50} />
    </div>
  ) : null;
};

Loader.propTypes = {
  loading: PropTypes.bool.isRequired,
};

export default Loader;
