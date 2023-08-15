import {View, StatusBar} from 'react-native';
import React from 'react';
import {getStatusBarHeight} from 'react-native-status-bar-height';

// Functional component
const Statusbar = ({backgroundColor, ...props}) => {
  // Returning
  return (
    <View style={[{height: getStatusBarHeight(), backgroundColor}]}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
};

// Exporting
export default Statusbar;
