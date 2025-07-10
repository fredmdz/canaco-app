import { View, StyleSheet } from "react-native";
import { Controller } from "react-hook-form";
import { Text, TextInput } from "react-native-paper";

export default function FormInput({ hookForm, name, label, ...props }) {
  return (
    <View>
      <Text variant="labelLarge" style={styles.label}>
        {label}
      </Text>
      <Controller
        control={hookForm.control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            mode="outlined"
            placeholder={label}
            autoCapitalize="none"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={hookForm.formState.errors[name] ? true : false}
            {...props}
          />
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
  },
  labelError: {
    textAlign: "center",
    color: "#A81C1D",
    marginTop: 3,
  },
});
