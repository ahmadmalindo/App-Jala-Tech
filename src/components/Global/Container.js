import React from 'react';
import {StyleSheet, StatusBar, KeyboardAvoidingView, Platform} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Container = ({barStyle, children, backgroundColor, keyboardVerticalOffset}) => {
  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} enabled={true} style={styles.container} keyboardVerticalOffset={keyboardVerticalOffset}>
        <SafeAreaView style={[styles.container, {backgroundColor: backgroundColor}]}>
            <StatusBar barStyle={barStyle} backgroundColor={backgroundColor}/>
            {children}
        </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default Container;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
