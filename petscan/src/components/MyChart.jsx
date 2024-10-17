import PropTypes from 'prop-types';

const MyChart = ({ minValue, maxValue, currentValue }) => {

    const getDotStyle = () => {
        if (currentValue < minValue || currentValue > maxValue) {
            return { left: '50%', backgroundColor: 'red' };
        }
        return { left: '50%', backgroundColor: '#04A7C8' };
    };

    return (
        <div className="outer-border">
            <div className="left-border">
                {currentValue < minValue && (
                    <div className="dot" style={getDotStyle()}></div>
                )}
            </div>

            <div className="center-border">
                {currentValue >= minValue && currentValue <= maxValue && (
                    <div className="dot" style={getDotStyle()}></div>
                )}
            </div>

            <div className="right-border">
                {currentValue > maxValue && (
                    <div className="dot" style={getDotStyle()}></div>
                )}
            </div>

            <div className="min-line"></div>
            <div className="max-line"></div>
        </div>
    );
};

MyChart.propTypes = {
    minValue: PropTypes.number.isRequired,
    maxValue: PropTypes.number.isRequired,
    currentValue: PropTypes.number.isRequired
};

export default MyChart;