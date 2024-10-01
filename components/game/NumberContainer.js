import React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import Colors from "../../constants/Colors";

export const NumberContainer = ({ children }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.numberText}>{children}</Text>
    </View>
  );
};
const deviceWidth = Dimensions.get("window").width;
console.log(deviceWidth);

const styles = StyleSheet.create({
  container: {
    borderWidth: 4,
    borderColor: Colors.primary600,
    padding: deviceWidth < 450 ? 12 : 24,
    margin: deviceWidth < 450 ? 24 : 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  numberText: {
    color: Colors.primary600,
    fontSize: deviceWidth < 380 ? 22 : 36,
    // fontWeight: "bold",
    fontFamily: "open-sans-bold",
  },
});
