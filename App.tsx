import { Button, Text, StyleSheet, View } from 'react-native';
import * as Location from 'expo-location';
import { useEffect, useState } from 'react';

export default function App() {
  const [location, setLocation] = useState({ coords: {} });
  const [text, setText] = useState('');
  const [waypointEnabled, setWaypointEnabled] = useState(false);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setText('Permission to access location was denied');
      } else {
        setWaypointEnabled(true);
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text>{text}</Text>
      <Button disabled={!waypointEnabled} title={"Capture Waypoint"} onPress={ async () => {
         let location = await Location.getCurrentPositionAsync({});
         setLocation(location);
         setText( `${location.coords.latitude}, ${location.coords.longitude}, ${location.coords.heading}`) 
      }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
