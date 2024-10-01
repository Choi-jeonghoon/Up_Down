import React, { useState } from "react";
import {
  Alert,
  Dimensions,
  StyleSheet,
  TextInput,
  View,
  useWindowDimensions,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { PrimaryButton } from "../components/ui/PrimaryButton";
import Colors from "../constants/Colors";
import { Title } from "../components/ui/Title";
import { Card } from "../components/ui/Card";
import { InstructionText } from "../components/ui/InstructionText";

export const StartGameScreen = ({ onPickNumber }) => {
  const [enterNumber, setEnterNumber] = useState("");

  const { width, height } = useWindowDimensions();

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

  const marginTopDistance = height < 400 ? 30 : 100;
  return (
    <ScrollView style={styles.sceen}>
      <KeyboardAvoidingView style={styles.sceen} behavior="position">
        <View style={[styles.screnContainer, { marginTop: marginTopDistance }]}>
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
                <PrimaryButton onPress={confirmInputHandler}>
                  Confirm
                </PrimaryButton>
              </View>
            </View>
          </Card>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  sceen: {
    flex: 1,
  },
  screnContainer: {
    flex: 1,
    //marginTop: deviceHeight < 400 ? 30 : 100,
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
