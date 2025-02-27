import { PropsWithChildren } from "react";
import { Text } from "react-native";
export const Caption: React.FC<PropsWithChildren<{}>> = ({ children }) => (
  <Text className="text-lg text-gray-700">{children}</Text>
);
