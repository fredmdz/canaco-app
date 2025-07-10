import { View, StyleSheet } from "react-native";
import { Controller } from "react-hook-form";
import { Text } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";

export default function FormPicker({ hookForm, name, label, children, ...props }) {
  return (
    <View>
      <Text variant="labelLarge" style={styles.label}>
        {label}
      </Text>
      <Controller
        control={hookForm.control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <View style={hookForm.formState.errors[name] ? styles.pickerError : styles.picker}>
            <Picker selectedValue={value} onValueChange={(itemValue) => onChange(itemValue)} {...props}>
              {children}
            </Picker>
          </View>
        )}
      />
      {hookForm.formState.errors[name] && (
        <Text variant="labelLarge" style={styles.labelError}>
          {hookForm.formState.errors[name].message}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    textAlign: "center",
    marginBottom: 5,
  },
  labelError: {
    textAlign: "center",
    color: "#A81C1D",
    marginTop: 3,
  },
  picker: {
    backgroundColor: "#fff",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#818181",
  },
  pickerError: {
    backgroundColor: "#fff",
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#A81C1D",
  },
});
