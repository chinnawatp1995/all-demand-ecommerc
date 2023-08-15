import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import TextInput from '../components/inputs/TextInput'
import Button from '../components/buttons/Button'
import { LightThemeColors as theme } from '../config/Colors'

const EditTextInput = (props) => {
  return (
    <View>
      <TextInput 
        label={props.route.params.label}
        placeholder={props.route.params.placeholder}
        defaultValue={props.route.params.defaultValue}
        onTextChange={props.route.params.onTextChange}
        error={props.route.params.error}
        touched={props.route.params.touched}
        errorText={props.route.params.errorText}
        handleBlur={props.route.params.handleBlur}
      />

      <Button
        label='ยืนยัน'
        labelColor={theme.primary}
        backgroundColor={theme.accent}
        onPress={props.route.params.handleSubmit}
        disabled={props.route.params.error}
      />
    </View>
  )
}

export default EditTextInput

const styles = StyleSheet.create({})