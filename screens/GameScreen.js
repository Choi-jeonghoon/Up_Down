import React, { useEffect, useMemo, useState } from "react";
import { Alert, FlatList, StyleSheet, Text, View } from "react-native";
import { Title } from "../components/ui/Title";
import { NumberContainer } from "../components/game/NumberContainer";
import { PrimaryButton } from "../components/ui/PrimaryButton";
import { Card } from "../components/ui/Card";
import { InstructionText } from "../components/ui/InstructionText";
import { Ionicons } from "@expo/vector-icons";
import { GuessLogItem } from "../components/game/GuessLogItem";

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
  //   const initialGuess = generateRandomBetween(
  //     minBoundary,
  //     maxBoundary,
  //     userNumber
  //   );

  /*
   @Memo
    const initialGuess = generateRandomBetween(1, 100, userNumber);

    장점: 코드가 단순하고 명료합니다. minBoundary와 maxBoundary가 이미 고정된 값이므로, 코드가 더 직관적입니다.
    단점: 만약 추후에 minBoundary와 maxBoundary 값이 바뀌어야 한다면, 코드의 여러 곳에서 수정을 해야 할 수 있습니다. 코드의 확장성이나 유지보수 측면에서 불리할 수 있습니다.

    장점: useMemo를 사용하면 컴포넌트가 다시 렌더링될 때 불필요한 재계산을 방지하고, userNumber 값이 변경될 때만 generateRandomBetween 함수가 호출됩니다. 이 방식은 성능 최적화와 효율적인 리렌더링을 지원합니다.
    단점: 사용하지 않아도 될 때에도 불필요한 복잡성이 추가될 수 있습니다. 즉, useMemo는 성능 최적화가 필요한 경우에만 사용하는 것이 좋습니다. 단순한 초기 값 설정에는 오버헤드일 수 있습니다.
  */

  const initialGuess = useMemo(
    () => generateRandomBetween(minBoundary, maxBoundary, userNumber),
    [userNumber]
  );

  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [guessRounds, setGuessRounds] = useState([initialGuess]);

  useEffect(() => {
    if (currentGuess === userNumber) {
      onGameOver(guessRounds.length);
    }
  }, [currentGuess, userNumber, onGameOver]);

  useEffect(() => {
    minBoundary = 1;
    maxBoundary = 100;
  }, []);

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
    setGuessRounds((prevGuessRounds) => [newRndNumber, ...prevGuessRounds]);
  };

  const guessRoundsListLength = guessRounds.length;

  return (
    <View style={styles.screen}>
      <Title>GameScreen</Title>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card>
        <InstructionText style={styles.instructionText}>
          Higher or lower?
        </InstructionText>
        <View style={styles.buttonsContaier}>
          <View style={styles.buttonContaier}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, "lower")}>
              <Ionicons name="remove" size={20} color="white" />
            </PrimaryButton>
          </View>
          <View style={styles.buttonContaier}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, "greater")}>
              <Ionicons name="add" size={20} color="white" />
            </PrimaryButton>
          </View>
        </View>
      </Card>
      <View style={styles.listContainer}>
        {/* 수동 map */}
        {/* {guessRound.map((guessRound) => (
          <Text key={guessRound}>{guessRound}</Text>
        ))} */}
        {/* FlatList 컴포넌트 활용 */}
        <FlatList
          data={guessRounds}
          renderItem={(itemData) => (
            <GuessLogItem
              roundNumber={guessRoundsListLength - itemData.index}
              guess={itemData.item}
            />
          )}
          keyExtractor={(item) => item}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 12,
    alignItems: "center",
  },
  instructionText: { marginBottom: 20 },
  buttonsContaier: {
    flexDirection: "row",
  },
  buttonContaier: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
    padding: 16,
  },
});
