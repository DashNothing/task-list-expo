import React, { Fragment, useState } from "react";
import { List, Colors } from "react-native-paper";
import { StyleSheet, View } from "react-native";

const TaskListItem = ({ title, isComplete, isImportant, onPress }) => {
  return (
    <List.Item
      title={title}
      titleNumberOfLines={2}
      onPress={onPress}
      style={styles.listItem}
      titleStyle={[
        styles.listItemText,
        isComplete ? styles.listItemTextComplete : null,
      ]}
      left={(props) => (
        <List.Icon
          {...props}
          style={styles.listIcon}
          icon={isComplete ? "radiobox-marked" : "radiobox-blank"}
        />
      )}
      right={(props) =>
        isImportant ? (
          <List.Icon
            {...props}
            style={styles.listIconImportant}
            icon={"exclamation-thick"}
            color={Colors.red400}
          />
        ) : null
      }
    />
  );
};

const styles = StyleSheet.create({
  listItem: {
    padding: 12,
    paddingLeft: 8,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  listItemText: {
    fontSize: 18,
  },
  listItemTextComplete: {
    textDecorationLine: "line-through",
  },
  listIcon: {
    margin: 0,
    alignSelf: "center",
  },
  listIconImportant: {
    margin: 0,
    alignSelf: "center",
  },
});

export default TaskListItem;
