import React, { useState, useEffect } from "react";
import { Provider as PaperProvider, Headline, FAB } from "react-native-paper";
import { SafeAreaView, StyleSheet } from "react-native";
import TaskList from "./components/TaskList";
import AddTaskDialog from "./components/AddTaskDialog";
import AppBar from "./components/AppBar";
import CalendarDialog from "./components/CalendarDialog";

import AsyncStorage from "@react-native-async-storage/async-storage";

import DateFormatter from "./utils/DateFormatter";

export default function App() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      let loadedTasksJson = await AsyncStorage.getItem("tasks");
      console.log(loadedTasksJson);
      if (loadedTasksJson !== null) {
        setTasks(JSON.parse(loadedTasksJson));
      }
    } catch (e) {
      console.log(e);
    }
  };

  const saveTasks = async () => {
    try {
      await AsyncStorage.setItem("tasks", JSON.stringify(tasks));
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    saveTasks();
  }, [tasks]);

  const [selectedDay, setSelectedDay] = useState(
    DateFormatter.dateToDateString(new Date())
  );

  const [modalVisible, setModalVisible] = useState(false);
  const [calendarVisible, setCalendarVisible] = useState(false);

  const handleListItemPress = (id) => {
    let allTasks = [...tasks];
    let pressedIndex = allTasks.findIndex((task) => task.id == id);
    allTasks[pressedIndex].isComplete = !allTasks[pressedIndex].isComplete;

    setTasks(allTasks);
  };

  const addTask = async (title, isImportant) => {
    let lastId;
    if (tasks.length == 0) {
      lastId = 1;
    } else {
      const ids = tasks.map((task) => task.id);
      lastId = Math.max(...ids);
    }

    setTasks([
      ...tasks,
      {
        id: lastId + 1,
        title: title,
        isImportant: isImportant,
      },
    ]);
  };

  const deleteTask = (id) => {
    let allTasks = [...tasks];
    const deleteIndex = allTasks.findIndex((task) => task.id == id);
    allTasks.splice(deleteIndex, 1);
    setTasks(allTasks);
  };

  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);

  const showCalendar = () => setCalendarVisible(true);
  const hideCalendar = () => setCalendarVisible(false);

  const handleModalDismiss = () => {
    hideModal();
  };

  const handleCalendarDismiss = () => {
    hideCalendar();
  };

  const handleCalendarDayPress = (day) => {
    setSelectedDay(day.dateString);
  };

  return (
    <PaperProvider>
      <AppBar onCalendarPress={showCalendar} />
      <SafeAreaView style={styles.container}>
        <Headline style={styles.headline}>{selectedDay}</Headline>
        <TaskList
          tasks={tasks}
          handleItemPress={handleListItemPress}
          handleItemDelete={deleteTask}
        />
        <FAB
          style={styles.fab}
          color="white"
          icon="plus"
          onPress={() => showModal()}
        />
        <AddTaskDialog
          visible={modalVisible}
          onDismiss={handleModalDismiss}
          onConfirm={addTask}
        />
        <CalendarDialog
          visible={calendarVisible}
          onDayPress={handleCalendarDayPress}
          onDismiss={handleCalendarDismiss}
          selectedDay={selectedDay}
        />
      </SafeAreaView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  headline: {
    fontWeight: "bold",
    marginBottom: 30,
    marginTop: 10,
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
