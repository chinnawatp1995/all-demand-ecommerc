import {memo} from 'react';
import {TextInput as RNTextInput, View, Text, TouchableOpacity} from 'react-native';
import styles from './styles';
import { useState, useRef } from 'react';

// Functional component
const MultiLineTextInput = ({
  label,
  labelColor,
  placeholder,
  placeholderTextColor,
  leftIcon,
  rightIcon,
  backgroundColor,
  textInputValueColor,
  onTextChange,
  error,
  touched,
  errorText,
  errorTextColor='red',
  handleBlur,
  onRightIconPress,
  hiddenText,
  editable=true,
  numberOfLines=4,
  multiline=true,
}) => {
  // Returning
  

  return (
    <>
      
      <Text style={[styles.label, {color: labelColor}]}>{label}</Text>
        
      <View
        style={[styles.textInputWrapper, {backgroundColor: editable ? backgroundColor: '#b3b3b3'},
        {borderColor: (error && touched) && 'red'} , {borderWidth: (error && touched) && 1}
      ]}>
        {leftIcon && (
          <View style={[styles.textInputIconWrapper]}>{leftIcon}</View>
        )}
        
        <RNTextInput
          
          onChangeText={(text) => onTextChange(text)}
          placeholder={placeholder}
          style={[styles.textInput, {color: textInputValueColor}]}
          placeholderTextColor={placeholderTextColor}
          secureTextEntry={hiddenText}
          onBlur={handleBlur}
          editable={editable}
          multiline={multiline}
          numberOfLines={numberOfLines}
        />

        {rightIcon && (
          <TouchableOpacity onPress={onRightIconPress}>
            <View
              style={[
                styles.textInputIconWrapperWithRightZero,
                styles.textInputIconWrapper,
              ]}>

              {rightIcon}
                
            </View>
          </TouchableOpacity>
        )}  
      </View>

      {(error && touched) && ( <Text style={[styles.errorText, {color: errorTextColor}]}>{errorText}</Text> )}
    </>
  );
};

// Exporting
export default memo(MultiLineTextInput);
