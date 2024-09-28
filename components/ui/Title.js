import React from "react";
import { StyleSheet, Text } from "react-native";

export const Title = ({ children }) => {
  return <Text style={styles.title}>{children}</Text>;
};

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#cec4a5",
    textAlign: "center",
    borderWidth: 2,
    borderColor: "#cec4a5",
    padding: 12,
  },
});
