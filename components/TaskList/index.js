import React, { Fragment, useState } from "react";
import { Text, TouchableRipple } from "react-native-paper";
import { StyleSheet, View, FlatList } from "react-native";

import TaskListItem from "../TaskListItem";

const TaskList = ({ tasks, onItemPress }) => {
  const renderItem = ({ item }) => {
    return (
      <TaskListItem
        title={item.title}
        isComplete={item.isComplete}
        isImportant={item.isImportant}
        onPress={() => onItemPress(item.id)}
      />
    );
  };

  const taskList = () => {
    if (tasks) {
      return (
        <FlatList
          style={styles.container}
          data={tasks}
          extraData={tasks}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          ListFooterComponent={<View></View>}
          ListFooterComponentStyle={styles.footer}
        />
      );
    } else {
      return <Text style={styles.text}>No tasks today</Text>;
    }
  };

  return taskList();
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  footer: {
    height: 160,
  },
});

export default TaskList;
