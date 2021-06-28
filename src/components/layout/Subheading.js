import PropTypes from "prop-types";

function Subheading({ content }) {
	return <h2>{content}</h2>;
}

Subheading.propTypes = {
	content: PropTypes.string.isRequired,
};

export default Subheading;