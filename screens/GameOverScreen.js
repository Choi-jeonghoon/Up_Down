import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Title } from "../components/ui/Title";
import Colors from "../constants/Colors";
import { PrimaryButton } from "../components/ui/PrimaryButton";

export const GameOverScreen = ({
  roundsNumber,
  userNumber,
  onStartNewGame,
}) => {
  return (
    <View style={styles.rootContainer}>
      <Title>GAME OVER!</Title>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require("../assets/images/success.png")}
        />
      </View>
      <Text style={styles.summaryText}>
        당신의 휴대폰은 <Text style={styles.highlight}>{roundsNumber}</Text>{" "}
        번의 라운드만에 숫자 <Text style={styles.highlight}>{userNumber}</Text>
        를 맞혔습니다.
      </Text>
      <PrimaryButton onPress={onStartNewGame}>Start New Game</PrimaryButton>
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    width: 400,
    height: 400,
    borderRadius: 200,
    borderWidth: 3,
    borderColor: Colors.primary800,
    overflow: "hidden",
    margin: 36,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  summaryText: {
    fontFamily: "open-sans",
    fontSize: 15,
    textAlign: "center",
    marginVertical: 20,
  },
  highlight: {
    fontFamily: "open-sans-blod",
    color: Colors.primary500,
  },
});
