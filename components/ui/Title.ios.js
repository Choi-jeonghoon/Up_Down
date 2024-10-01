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
    //borderWidth: Platform.OS === "android" ? 2 : 0, //아래 방식으로도 가능하다.
    //borderWidth: Platform.select({ ios: 0, android: 2 }),
    borderWidth: 2, // 또는 파일명을 00.ios.js 로 만들어서 플랫폼별로 만들수도있다.
    borderColor: "#cec4a5",
    padding: 12,
    maxWidth: "80%",
    width: 300,
  },
});
