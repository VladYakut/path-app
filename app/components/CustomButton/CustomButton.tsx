import React from "react";
import { Text, Pressable } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { CustomButtonProps } from "./types";

export const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  className,
}) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.95);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
    onPress();
  };

  return (
    <Animated.View style={animatedStyle}>
      <Pressable
        className={`my-1 h-[35] bg-white rounded-lg active:opacity-80 w-full ${className} items-center justify-center`}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <Text className="text-black text-lg font-medium text-center">
          {title}
        </Text>
      </Pressable>
    </Animated.View>
  );
};
