import React, { useState } from "react";
import { Provider as PaperProvider, Headline, FAB } from "react-native-paper";
import { StyleSheet, Text, View } from "react-native";
//import BottomNav from "./components/BottomNav";
import TaskList from "./components/TaskList";
import AddTaskDialog from "./components/AddTaskDialog";

export default function App() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Feed the dog", isComplete: false, isImportant: false },
    {
      id: 2,
      title: "Wash the car and the hair cleaning lady",
      isComplete: false,
      isImportant: false,
    },
    {
      id: 3,
      title: "Be the best at chess one could possibly be",
      isComplete: false,
      isImportant: true,
    },
    {
      id: 4,
      title: "Sommersault if necessary",
      isComplete: false,
      isImportant: false,
    },
  ]);

  const [modalVisible, setModalVisible] = useState(false);

  const handleListItemPress = (id) => {
    let allTasks = [...tasks];
    let pressedIndex = allTasks.findIndex((task) => task.id == id);
    allTasks[pressedIndex].isComplete = !allTasks[pressedIndex].isComplete;

    setTasks(allTasks);
  };

  const addTask = (title, isImportant) => {
    const ids = tasks.map((task) => task.id);
    const lastId = Math.max(...ids);
    setTasks([
      ...tasks,
      {
        id: lastId + 1,
        title: title,
        isImportant: isImportant,
      },
    ]);
  };

  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);

  const handleModalDismiss = () => {
    hideModal();
  };

  return (
    <PaperProvider>
      <View style={styles.container}>
        <Headline style={styles.headline}>
          TaskList - Organize Your Day
        </Headline>
        <TaskList tasks={tasks} onItemPress={handleListItemPress} />
        <FAB
          style={styles.fab}
          color="white"
          icon="plus"
          onPress={() => showModal()}
        />
      </View>
      <AddTaskDialog
        visible={modalVisible}
        onDismiss={handleModalDismiss}
        onConfirm={addTask}
      />
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 60,
    alignItems: "center",
  },
  headline: {
    fontWeight: "bold",
    marginBottom: 30,
  },
  fab: {
    position: "absolute",
    right: 30,
    bottom: 40,
    padding: 8,
    borderRadius: 100,
    backgroundColor: "#79c090",
  },
});
