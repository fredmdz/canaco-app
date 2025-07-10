import { Text, Card } from "react-native-paper";

export default function ListEmpty({ text }) {
  return (
    <Card>
      <Card.Content>
        <Text variant="labelLarge" style={{ textAlign: "center" }}>
          {text}
        </Text>
      </Card.Content>
    </Card>
  );
}
