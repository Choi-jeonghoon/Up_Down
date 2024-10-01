import React, { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, View } from "react-native";
import { PrimaryButton } from "../components/ui/PrimaryButton";
import Colors from "../constants/Colors";
import { Title } from "../components/ui/Title";
import { Card } from "../components/ui/Card";
import { InstructionText } from "../components/ui/InstructionText";

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
    <View style={styles.screnContainer}>
      <Title>MyNumber</Title>
      <Card>
        <InstructionText>Enter a Number</InstructionText>
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
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  screnContainer: {
    flex: 1,
    marginTop: 100,
    alignItems: "center",
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
