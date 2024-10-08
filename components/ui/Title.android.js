import React from "react";
import { StyleSheet, Text, Platform } from "react-native";

export const Title = ({ children }) => {
  return <Text style={styles.title}>{children}</Text>;
};

const styles = StyleSheet.create({
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 30,
    fontWeight: "bold",
    color: "#cec4a5",
    textAlign: "center",
    borderWidth: 2,
    borderColor: "#cec4a5",
    padding: 12,
    maxWidth: "80%",
    width: 300,
  },
});
