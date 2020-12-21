import React from 'react';
import PropTypes from 'prop-types';
import {Text as RNText, ViewPropTypes} from 'react-native';
import styles from './styles';

const Text = ({variant, style, ...props}) => {
  return <RNText style={[styles[variant], style]} {...props} />;
};

Text.propTypes = {
  variant: PropTypes.oneOf([
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'subtitle1',
    'subtitle2',
    'body1',
    'body2',
    'button',
    'caption',
    'overline',
    'error',
    'inlineError',
    'label',
  ]),
  style: ViewPropTypes.style,
};

Text.defaultProps = {
  variant: 'body1',
  style: null,
};

export default Text;
