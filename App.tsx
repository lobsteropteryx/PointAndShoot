import { Button, Text, StyleSheet, View } from 'react-native';
import { useEffect, useState } from 'react';
import { Location, IsAuthorized, GetLocation } from './Location';

export default function App() {
  const [locationIsAuthorized, setLocationIsAuthorized] = useState(false);
  const defaultLocation: Location = {x: 0, y: 0, heading: 0};
  const [location, setLocation] = useState(defaultLocation);
  const [text, setText] = useState('');

  useEffect( () => {
    (async () => setLocationIsAuthorized(await IsAuthorized()))();
  });

  return (
    <View style={styles.container}>
      <Text>{text}</Text>
      <Button disabled={!locationIsAuthorized} title={"Capture Waypoint"} onPress={ async () => {
         setLocation(await GetLocation());     
         setText(`${location.x}, ${location.y}, ${location.heading}`) 
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
