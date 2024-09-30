import React from "react";
import { StyleSheet, Text } from "react-native";
import Colors from "../../constants/colors";

export const InstructionText = ({ children, style }) => {
  return <Text style={[styles.inputContaierText, style]}>{children}</Text>;
};

const styles = StyleSheet.create({
  inputContaierText: {
    color: Colors.accent500,
    fontSize: 20,
  },
});
