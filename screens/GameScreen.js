import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Title } from "../components/Title";
import Colors from "../constants/colors";

export const GameScreen = () => {
  return (
    <View style={styles.screen}>
      <Title>GameScreen</Title>
      <Text>GUESS</Text>
      <View>
        <Text>Higer or Lower?</Text>
        <Text>+ -</Text>
      </View>
      <View>
        <Text>Log Rounds</Text>
      </View>
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
