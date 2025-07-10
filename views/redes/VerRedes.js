import { ScrollView, Image, View, Text, Linking, Pressable } from "react-native";

export default function VerRedes() {
  return (
    <ScrollView>
      <View style={{ flex: 1, marginBottom: 50 }}>
        <View>
          <Text
            style={[
              {
                padding: 30,
                textAlign: "center",
                fontSize: 25,
                color: "#00b3e4",
              },
            ]}
          >
            Consulta nuestras redes sociales
          </Text>
        </View>
        <View
          style={[
            {
              flexDirection: "row",
              marginTop: -20,
              padding: 30,
            },
          ]}
        >
          <Pressable style={{ flex: 1 }} onPress={() => Linking.openURL("https://www.facebook.com/MasHuezusOficial")}>
            <View>
              <Image source={require("../../assets/redes/face.png")} style={{ width: "100%", height: 180 }} />
            </View>
          </Pressable>
          <Pressable style={{ flex: 1 }} onPress={() => Linking.openURL("https://www.instagram.com/mashuezusoficial/")}>
            <View>
              <Image source={require("../../assets/redes/insta.png")} style={{ width: "100%", height: 180 }} />
            </View>
          </Pressable>
        </View>
        <View
          style={[
            {
              flexDirection: "row",
              marginTop: -30,
              padding: 30,
            },
          ]}
        >
          <Pressable style={{ flex: 1 }} onPress={() => Linking.openURL("https://www.twitter.com")}>
            <View>
              <Image source={require("../../assets/redes/tweeter.png")} style={{ width: "100%", height: 180 }} />
            </View>
          </Pressable>
          <Pressable style={{ flex: 1 }} onPress={() => Linking.openURL("https://www.tiktok.com")}>
            <View>
              <Image source={require("../../assets/redes/tiktok.png")} style={{ width: "100%", height: 180 }} />
            </View>
          </Pressable>
        </View>
        <View
          style={[
            {
              flexDirection: "row",
              justifyContent: "center",
              marginTop: -30,
              padding: 30,
            },
          ]}
        >
          <Pressable style={{ flex: 1 }} onPress={() => Linking.openURL("https://www.mashuezus.com")}>
            <View>
              <Image source={require("../../assets/redes/mashuezus.png")} style={{ width: "50%", height: 180 }} />
            </View>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}
