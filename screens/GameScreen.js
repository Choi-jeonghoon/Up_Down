import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { Title } from "../components/ui/Title";
import Colors from "../constants/colors";
import { NumberContainer } from "../components/game/NumberContainer";
import { PrimaryButton } from "../components/ui/PrimaryButton";

// min과 max 사이의 숫자 중, exclude 숫자를 제외한 랜덤 숫자를 생성하는 함수
const generateRandomBetween = (min, max, exclude) => {
  // min과 max 사이의 난수를 생성하고, 소수점 이하를 버려 정수로 만듦
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  // 만약 생성된 난수가 제외해야 하는 숫자와 같다면 다시 난수를 생성
  if (rndNum === exclude) {
    // 재귀적으로 함수 호출하여 새로운 숫자를 생성
    return generateRandomBetween(min, max, exclude);
  } else {
    // 제외 숫자가 아니면 해당 숫자를 반환
    return rndNum;
  }
};

// 예시 1: 1과 10 사이의 숫자 중, 5를 제외하고 랜덤 숫자 생성
// generateRandomBetween(1, 10, 5)의 경우 1에서 9 사이의 숫자 중 5는 절대 반환되지 않음
// 예: 3, 7, 1, 9 등

// 예시 2: 20과 30 사이의 숫자 중 25를 제외하고 랜덤 숫자 생성
// generateRandomBetween(20, 30, 25)의 경우 20에서 29 사이의 숫자 중 25는 반환되지 않음
// 예: 21, 28, 22 등

let minBoundary = 1;
let maxBoundary = 100;

export const GameScreen = ({ userNumber, onGameOver }) => {
  const initialGuess = generateRandomBetween(
    minBoundary,
    maxBoundary,
    userNumber
  );
  const [currentGuess, setCurrentGuess] = useState(initialGuess);

  useEffect(() => {
    if (currentGuess === userNumber) {
      onGameOver();
    }
  }, [currentGuess, userNumber, onGameOver]);

  const nextGuessHandler = (direction) => {
    if (
      (direction === "lower" && currentGuess < userNumber) ||
      (direction === "greater" && currentGuess > userNumber)
    ) {
      Alert.alert("Don't lie!!", "you know that this is Wrong...", [
        { text: "Srr!!", style: "cancel" },
      ]);
      return;
    }
    if (direction === "lower") {
      maxBoundary = currentGuess;
    } else {
      minBoundary = currentGuess + 1;
    }
    console.log("루프걸림", minBoundary, maxBoundary);
    /*
    LOG  루프걸림 35 35
    ERROR  RangeError: Maximum call stack size exceeded, js engine: hermes
    */
    const newRndNumber = generateRandomBetween(
      minBoundary,
      maxBoundary,
      currentGuess
    );
    setCurrentGuess(newRndNumber);
  };

  return (
    <View style={styles.screen}>
      <Title>GameScreen</Title>
      <NumberContainer>{currentGuess}</NumberContainer>
      <View>
        <Title>Higher or lower?</Title>
        <View>
          <PrimaryButton onPress={nextGuessHandler.bind(this, "lower")}>
            -
          </PrimaryButton>
          <PrimaryButton onPress={nextGuessHandler.bind(this, "greater")}>
            +
          </PrimaryButton>
        </View>
      </View>
      <View>{/* <Text>Log Rounds</Text> */}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 12,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: Colors.accent500,
    textAlign: "center",
    borderWidth: 2,
    borderColor: Colors.accent500,
    padding: 12,
  },
});
