import React, {useEffect} from 'react';
import {
  View,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  BackHandler,
} from 'react-native';
// import Text from '../../components/text/Text';
import BackIcon from '../../assets/icons/back.svg';
import {SafeAreaView} from 'react-native-safe-area-context';
import {WebView} from 'react-native-webview';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  elevate: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 8,
    elevation: 2,
    minHeight: 56,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 2,
    shadowOpacity: 0.24,
  },
});

const LinkModal = ({closeModal, uri}) => {
  useEffect(() => {
    const backAction = () => {
      closeModal();
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.elevate}>
        <TouchableOpacity onPress={closeModal}>
          <BackIcon fill="black" height={30} width={30} />
        </TouchableOpacity>
      </View>
      <WebView source={{uri}} />
    </SafeAreaView>
  );
};

LinkModal.propTypes = {
  uri: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default LinkModal;
