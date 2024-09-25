import React from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";
import { PrimaryButton } from "../components/PrimaryButton";

export const StartGameScreen = () => {
  return (
    <View style={styles.inputContaier}>
      <TextInput
        style={styles.numberInput}
        maxLength={2}
        keyboardType="number-pad"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <View style={styles.buttonsContaier}>
        <View style={styles.buttonContaier}>
          <PrimaryButton>Reset</PrimaryButton>
        </View>

        <View style={styles.buttonContaier}>
          <PrimaryButton>Confirm</PrimaryButton>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContaier: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
    marginHorizontal: 24,
    padding: 16,
    backgroundColor: "#4e0329",
    borderRadius: 8,
    //안드로이드 그림자 효과
    elevation: 4,
    //ios 그림자 효과
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 1,
  },
  numberInput: {
    height: 50,
    width: 50,
    fontSize: 32,
    borderColor: "#ddb52f",
    borderBottomWidth: 1,
    color: "#ddb52f",
    marginVertical: 8,
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonsContaier: {
    flexDirection: "row",
  },
  buttonContaier: {
    flex: 1,
  },
});
