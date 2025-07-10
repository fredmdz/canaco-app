import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Controller } from "react-hook-form";
import { Button, Text, useTheme } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import dayjs from "dayjs";

export default function FormPickerDate({ hookForm, name, label, ...props }) {
  const [isShowPickerDate, setIsShowPickerDate] = useState(false);

  //========================= Theme
  const theme = useTheme();

  return (
    <View style={styles.backgroundCardIn(theme)}>
      <Text variant="labelLarge" style={styles.label}>
        {label}
      </Text>
      <Button
        icon="calendar"
        mode="outlined"
        onPress={() => {
          setIsShowPickerDate(true);
        }}
      >
        Escoge una fecha
      </Button>
      <Text variant="labelLarge" style={styles.label}>
        {dayjs(hookForm.watch(name)).format("D MMMM YYYY")}
      </Text>

      {isShowPickerDate && (
        <Controller
          control={hookForm.control}
          name={name}
          render={({ field: { onChange, value } }) => (
            <DateTimePicker
              value={value}
              mode={"date"}
              onChange={(e, selectedDate) => {
                setIsShowPickerDate(false);
                onChange(selectedDate);
              }}
              {...props}
            />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    textAlign: "center",
    color: "#333",
  },
  backgroundCardIn: (theme) => {
    return {
      backgroundColor: theme.colors.secondaryContainer,
      padding: 10,
      borderRadius: theme.roundness * 3,
      gap: 15,
    };
  },
});
