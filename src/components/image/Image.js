import React from 'react';
import {StyleSheet, ViewPropTypes} from 'react-native';
import PropTypes from 'prop-types';
import FastImage from 'react-native-fast-image';

const styles = StyleSheet.create({
  image: {
    aspectRatio: 16 / 9,
  },
});

const Image = ({style, uri}) => {
  return (
    <FastImage
      style={[styles.image, style]}
      source={{
        uri,
        priority: FastImage.priority.low,
      }}
      resizeMode={FastImage.resizeMode.cover}
    />
  );
};

Image.propTypes = {
  uri: PropTypes.string.isRequired,
  style: ViewPropTypes.style,
};

Image.defaultProps = {
  style: null,
};

export default Image;
