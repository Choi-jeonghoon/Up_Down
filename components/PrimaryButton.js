import React from "react";
import { Text, View, Pressable, StyleSheet } from "react-native";

export const PrimaryButton = ({ children, onPress }) => {
  return (
    <View style={styles.outContainer}>
      {/* Pressable: 터치 가능한 영역을 만들기 위한 컴포넌트 */}
      <Pressable
        style={({ pressed }) =>
          // pressed: 사용자가 버튼을 누르고 있을 때의 상태
          pressed ? [styles.inContainer, styles.pressed] : styles.inContainer
        }
        // 버튼이 클릭되었을 때의 이벤트 핸들러
        onPress={onPress}
        // 안드로이드에서 물결 효과를 주기 위해 android_ripple 속성 사용
        // color: 물결 효과의 색상을 설정
        android_ripple={{ color: "#640233" }}
      >
        {/* 버튼의 텍스트 */}
        <Text style={styles.buttonText}>{children}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  outContainer: {
    borderRadius: 28,
    margin: 4,
    overflow: "hidden",
  },
  inContainer: {
    backgroundColor: "#72063c",
    paddingVertical: 8,
    paddingHorizontal: 16,
    margin: 4,
    //안드로이드에만 그림자 효과
    elevation: 2,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  pressed: {
    opacity: 0.75,
  },
});
