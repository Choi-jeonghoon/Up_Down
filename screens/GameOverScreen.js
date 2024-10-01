import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  ScrollView,
} from "react-native";
import { Title } from "../components/ui/Title";
import Colors from "../constants/Colors";
import { PrimaryButton } from "../components/ui/PrimaryButton";

export const GameOverScreen = ({
  roundsNumber,
  userNumber,
  onStartNewGame,
}) => {
  const { width, height } = useWindowDimensions();

  let imageSzie = 300;

  if (width < 400) {
    imageSzie - 150;
  }

  if (height < 400) {
    imageSzie = 100;
  }

  const imageStyle = {
    width: imageSzie,
    height: imageSzie,
    borderRadius: imageSzie / 2,
  };

  return (
    <ScrollView style={styles.screen}>
      <View style={styles.rootContainer}>
        <Title>GAME OVER!</Title>
        <View style={[styles.imageContainer, imageStyle]}>
          <Image
            style={styles.image}
            source={require("../assets/images/success.png")}
          />
        </View>
        <Text style={styles.summaryText}>
          당신의 휴대폰은 <Text style={styles.highlight}>{roundsNumber}</Text>{" "}
          번의 라운드만에 숫자{" "}
          <Text style={styles.highlight}>{userNumber}</Text>를 맞혔습니다.
        </Text>
        <PrimaryButton onPress={onStartNewGame}>Start New Game</PrimaryButton>
      </View>
    </ScrollView>
  );
};

// const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  rootContainer: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    // width: deviceWidth < 380 ? 150 : 300,
    // height: deviceWidth < 380 ? 150 : 300,
    // borderRadius: deviceWidth < 380 ? 75 : 150,
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
