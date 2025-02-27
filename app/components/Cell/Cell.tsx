import React from "react";
import { Pressable } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { CellProps } from "./types";

export const Cell: React.FC<CellProps> = React.memo(
  ({ isDisabled, isPath, onPress }) => {
    const scale = useSharedValue(1);
    const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ scale: scale.value }],
    }));

    const handlePressIn = () => {
      scale.value = withSpring(0.9);
    };

    const handlePressOut = () => {
      scale.value = withSpring(1);
      onPress();
    };
    return (
      <Animated.View
        style={[animatedStyle]}
        className={`h-10 w-10 my-1 border border-gray-700 rounded ${
          isDisabled ? "bg-gray-400" : isPath ? "bg-green-300" : "bg-yellow-100"
        }`}
      >
        <Pressable
          className="w-full h-full"
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
        />
      </Animated.View>
    );
  }
);
