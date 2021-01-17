import React from "react";
import { Appbar } from "react-native-paper";
import { StyleSheet, Platform, StatusBar } from "react-native";

const AppBar = ({ onCalendarPress }) => {
  return (
    <Appbar style={styles.appBar}>
      <Appbar.Action icon="calendar" onPress={() => onCalendarPress()} />
    </Appbar>
  );
};

const styles = StyleSheet.create({
  appBar: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "white",
    elevation: 0,
    justifyContent: "flex-end",
  },
});

export default AppBar;
