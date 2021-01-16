import React, { useState } from "react";
import {
  Dialog,
  Portal,
  Button,
  TextInput,
  Checkbox,
  Text,
} from "react-native-paper";
import { StyleSheet } from "react-native";

const AddTaskDialog = ({ visible, onDismiss, onConfirm }) => {
  const [inputTitle, setInputTitle] = useState("");
  const [isImportant, setIsImportant] = useState(false);

  const closeModal = () => {
    onDismiss();
    setInputTitle("");
    setIsImportant(false);
  };

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={closeModal}>
        <Dialog.Title>Add New Task</Dialog.Title>
        <Dialog.Content>
          <TextInput
            label="Title"
            value={inputTitle}
            mode="outlined"
            onChangeText={(text) => setInputTitle(text)}
          />
          <Checkbox.Item
            label="Important"
            status={isImportant ? "checked" : "unchecked"}
            onPress={() => setIsImportant(!isImportant)}
          />
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            onPress={() => {
              onConfirm(inputTitle, isImportant);
              closeModal();
            }}
          >
            Done
          </Button>
          <Button onPress={() => closeModal()}>Cancel</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 20,
  },
});

export default AddTaskDialog;
