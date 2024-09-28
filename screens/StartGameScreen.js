import React, { useState } from "react";
import { Alert, StyleSheet, TextInput, View } from "react-native";
import { PrimaryButton } from "../components/PrimaryButton";
import Colors from "../constants/colors";

export const StartGameScreen = ({ onPickNumber }) => {
  const [enterNumber, setEnterNumber] = useState("");

  const numberInputHandler = (enteredText) => {
    setEnterNumber(enteredText);
  };

  const resetInputHandler = () => {
    setEnterNumber("");
  };
  //유효성 검사 로직
  const confirmInputHandler = () => {
    const choseNumber = parseInt(enterNumber);

    if (isNaN(choseNumber) || choseNumber <= 0 || choseNumber > 99) {
      Alert.alert("경고", "1부터 99까지의 숫자만 입력해주세요!!!", [
        {
          text: "Okay",
          style: "destructive",
          onPress: () => resetInputHandler(),
        },
      ]);
      return;
    }

    onPickNumber(choseNumber);
  };
  return (
    <View style={styles.inputContaier}>
      <TextInput
        style={styles.numberInput}
        maxLength={2}
        keyboardType="number-pad"
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={numberInputHandler}
        value={enterNumber}
      />
      <View style={styles.buttonsContaier}>
        <View style={styles.buttonContaier}>
          <PrimaryButton onPress={resetInputHandler}>Reset</PrimaryButton>
        </View>

        <View style={styles.buttonContaier}>
          <PrimaryButton onPress={confirmInputHandler}>Confirm</PrimaryButton>
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
    backgroundColor: Colors.primary600,
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
    borderColor: Colors.accent500,
    borderBottomWidth: 1,
    color: Colors.accent500,
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
