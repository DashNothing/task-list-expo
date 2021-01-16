import React, { useState } from "react";
import { BottomNavigation, Text } from "react-native-paper";
import { StyleSheet, View } from "react-native";

const MusicRoute = () => <Text>Music</Text>;

const AlbumsRoute = () => <Text>Albums</Text>;

const RecentsRoute = () => <Text>Recents</Text>;

const renderScene = BottomNavigation.SceneMap({
  music: MusicRoute,
  albums: AlbumsRoute,
  recents: RecentsRoute,
});

const BottomNav = () => {
  const [index, setIndex] = useState(0);
  const [routes] = React.useState([
    { key: "music", title: "Music", icon: "queue-music" },
    { key: "albums", title: "Albums", icon: "album" },
    { key: "recents", title: "Recents", icon: "history" },
  ]);

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default BottomNav;
