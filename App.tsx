import { Button, Text, StyleSheet, View } from 'react-native';
import { useEffect, useState } from 'react';
import { Location, Heading, IsAuthorized, GetLocation, GetHeading} from './Location';
import { createFile, appendToFile } from './Filesystem';

export default function App() {
  const [locationIsAuthorized, setLocationIsAuthorized] = useState(false);
  const [fileUri, setFileUri] = useState("");
  const defaultLocation: Location = {x: 0, y: 0, heading: 0};
  const [location, setLocation] = useState(defaultLocation);
  const defaultHeading: Heading = {accuracy: 0, magneticHeading: 0, trueHeading: 0};
  const [heading, setHeading] = useState(defaultHeading);
  const [text, setText] = useState('');

  useEffect( () => {
    (async () => setLocationIsAuthorized(await IsAuthorized()))();
    (async () => {
      if (!fileUri) {
        setFileUri(await createFile());
      }
    })();
  });
  
  useState( () => {
    (async () => setLocationIsAuthorized(await IsAuthorized()))();
    (async () => setFileUri(await createFile()))();
  });


  return (
    <View style={styles.container}>
      <Text>{text}</Text>
      <Button disabled={!locationIsAuthorized} title={"Capture Waypoint"} onPress={ async () => {
         setLocation(await GetLocation());     
         setHeading(await GetHeading());     
         const data = `${location.x}, ${location.y}, ${heading.trueHeading}`;
         setText(data);
         await appendToFile(fileUri, data);
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
