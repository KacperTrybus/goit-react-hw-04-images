import '../styles.css';
import PropTypes from 'prop-types';

const Button = ({ onClick, showButton }) => {
  return (
    showButton && (
      <button type="button" className="btn" onClick={onClick}>
        Load More
      </button>
    )
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  showButton: PropTypes.bool.isRequired,
};

export default Button;
