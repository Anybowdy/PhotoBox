import React, { FC, ReactNode } from 'react';
import { KeyboardAvoidingView, StyleSheet, ScrollView } from 'react-native';

interface Props {
  children: ReactNode;
}

const ScrollableAvoidView: FC<Props> = ({ children }) => {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior='padding'
      keyboardVerticalOffset={-150}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps='handled'
      >
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ScrollableAvoidView;

const styles = StyleSheet.create({});
