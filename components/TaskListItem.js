import React, { Fragment, useState } from "react";
import { List, Colors, IconButton } from "react-native-paper";
import { StyleSheet, View, Animated } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";

const TaskListItem = ({
  title,
  isComplete,
  isImportant,
  handlePress,
  handleDelete,
}) => {
  const animationDuration = 300;

  let removeAnimation = new Animated.Value(1);
  let heightAnimation = new Animated.Value(1);

  const animatedViewStyle = {
    transform: [
      {
        translateX: removeAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [-300, 0],
          extrapolate: "clamp",
        }),
      },
    ],
    opacity: removeAnimation,
    height: removeAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 80],
      extrapolate: "clamp",
    }),
  };

  const removeItem = () => {
    Animated.timing(removeAnimation, {
      toValue: 0,
      duration: animationDuration,
      useNativeDriver: false,
    }).start(() => handleDelete());
  };

  const rightSwipe = () => {
    return (
      <View style={styles.deleteBox}>
        <IconButton
          icon="delete"
          color={Colors.white}
          size={24}
          onPress={removeItem}
        />
      </View>
    );
  };

  return (
    <Animated.View style={(styles.container, animatedViewStyle)}>
      <Swipeable
        renderRightActions={rightSwipe}
        overshootRight={false}
        friction={2}
      >
        <List.Item
          title={title}
          titleNumberOfLines={2}
          onPress={handlePress}
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
      </Swipeable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  listItem: {
    padding: 12,
    paddingLeft: 8,
    width: "100%",
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#eee",
    backgroundColor: "white",
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
  deleteBox: {
    backgroundColor: Colors.red600,
    justifyContent: "center",
    alignItems: "center",
    width: 80,
  },
});

export default TaskListItem;
