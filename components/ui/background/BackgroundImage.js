import { ImageBackground } from "react-native";

export default function BackgroundImage({ source, children }) {
  return (
    <ImageBackground
      source={source}
      resizeMode="cover"
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
      }}
    >
      {children}
    </ImageBackground>
  );
}
