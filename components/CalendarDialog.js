import React, { useState } from "react";
import { Dialog, Portal } from "react-native-paper";
import { Calendar } from "react-native-calendars";
import { StyleSheet } from "react-native";

const CalendarDialog = ({ visible, onDismiss, onDayPress, selectedDay }) => {
  const markedDates = {
    [selectedDay]: {
      selected: true,
      selectedColor: "cyan",
    },
  };

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss} style={styles.dialog}>
        <Dialog.Title>Select Date</Dialog.Title>
        <Dialog.Content>
          <Calendar
            firstDay={1}
            markedDates={{ ...markedDates }}
            onDayPress={(day) => onDayPress(day)}
          />
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  dialog: {},
});

export default CalendarDialog;
