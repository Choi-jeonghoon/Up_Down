import {
  ImageBackground,
  StyleSheet,
  SafeAreaView,
  View,
  Text,
} from "react-native";
import { StartGameScreen } from "./screens/StartGameScreen";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect, useState } from "react";
import { GameScreen } from "./screens/GameScreen";
import Colors from "./constants/colors";
import { GameOverScreen } from "./screens/GameOverScreen";

// 스플래시 화면 자동 숨김 방지
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [gamIsOver, setGameIsOver] = useState(false);
  const [appIsReady, setAppIsReady] = useState(false);
  //const [isLoading, setIsLoading] = useState(true); // 로딩 상태

  const [fontsLoaded] = useFonts({
    "Open-Sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "Open-Sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });

  // useEffect(() => {
  //   if (fontsLoaded) {
  //     setTimeout(() => {
  //       setAppIsReady(true);
  //       setIsLoading(false); // 3초 후 로딩 상태를 해제
  //       SplashScreen.hideAsync(); // 스플래시 화면 숨기기
  //     }, 3000); // 3초 지연
  //   }
  // }, [fontsLoaded]);

  useEffect(() => {
    if (fontsLoaded) {
      setAppIsReady(true);
      // 폰트가 로드된 후 스플래시 화면 숨김
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    // 폰트 로드가 완료되지 않았을 때 로딩 문구 표시
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>loading...</Text>
      </View>
    );
  }

  const pickNumberHandler = (pickeNumber) => {
    setUserNumber(pickeNumber);
    setGameIsOver(false); // 게임 시작할 때는 게임이 끝나지 않음
  };

  const GameOverHandler = () => {
    setGameIsOver(true); // 게임이 끝나면 true로 설정
  };

  let screen = <StartGameScreen onPickNumber={pickNumberHandler} />;

  if (userNumber) {
    screen = (
      <GameScreen userNumber={userNumber} onGameOver={GameOverHandler} />
    );
  }
  if (gamIsOver && userNumber) {
    screen = <GameOverScreen />;
  }

  return (
    <LinearGradient
      colors={[Colors.primary100, Colors.primary200]}
      style={styles.rootScreen}
    >
      <ImageBackground
        source={require("./assets/images/background.png")}
        resizeMode="cover"
        style={styles.rootScreen}
        imageStyle={styles.backFroundImage}
      >
        <SafeAreaView style={styles.rootScreen} onLayout={onLayoutRootView}>
          {screen}
        </SafeAreaView>
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  backFroundImage: {
    opacity: 0.15,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
  },
  loadingText: {
    fontSize: 24,
    color: "white",
  },
});
