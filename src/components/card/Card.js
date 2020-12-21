import React from 'react';
import {View, StyleSheet, ViewPropTypes} from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 12,
    marginVertical: 8,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: 'white',
    elevation: 2,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 2,
    shadowOpacity: 0.24,
  },
});

const Card = ({children, style}) => {
  return <View style={[styles.card, style]}>{children}</View>;
};

Card.propTypes = {
  children: PropTypes.node,
  style: ViewPropTypes.style,
};

Card.defaultProps = {
  children: null,
  style: null,
};

export default Card;
