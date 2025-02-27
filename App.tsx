import { StatusBar } from "expo-status-bar";
import "./global.css";
import { PathfindingGrid } from "./app/components/Grid";
import { SafeAreaView } from "react-native";

export default function App() {
  return (
    <SafeAreaView className="flex-1 bg-red-200">
      <StatusBar style="auto" />
      <PathfindingGrid />
    </SafeAreaView>
  );
}
