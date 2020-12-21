import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import Text from '../text/Text';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const Loader = ({title}) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#000000" />
      {Boolean(title) && <Text>{title}</Text>}
    </View>
  );
};

Loader.propTypes = {
  title: PropTypes.string,
};

Loader.defaultProps = {
  title: null,
};

export default Loader;
