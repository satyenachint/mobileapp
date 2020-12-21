import React from 'react';
import {View} from 'react-native';
import Text from '../text';
import PropTypes from 'prop-types';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {error: null, errorInfo: null};
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
  }

  render() {
    if (this.state.errorInfo) {
      return (
        <View>
          <Text variant="h4">Something went wrong.</Text>
          <View>
            <Text>{this.state.error && this.state.error.toString()}</Text>
            <Text>{this.state.errorInfo.componentStack}</Text>
          </View>
        </View>
      );
    }
    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ErrorBoundary;
