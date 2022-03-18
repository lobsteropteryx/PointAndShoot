import { Button, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import { styles } from './Styles';
import { Location, Heading, IsAuthorized, GetLocation, GetHeading} from './Location';
import { appendToFile, shareFile, deleteFile } from './Filesystem';

export default function App() {
  const [locationIsAuthorized, setLocationIsAuthorized] = useState(false);
  const defaultLocation: Location = {x: 0, y: 0, heading: 0};
  const [location, setLocation] = useState(defaultLocation);
  const defaultHeading: Heading = {accuracy: 0, magneticHeading: 0, trueHeading: 0};
  const [heading, setHeading] = useState(defaultHeading);
  const [text, setText] = useState('');

  useEffect( () => {
    (async () => setLocationIsAuthorized(await IsAuthorized()))();
  });

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text>{text}</Text>
        <Button disabled={!locationIsAuthorized} title={"Capture Waypoint"} onPress={ async () => {
          setLocation(await GetLocation());     
          setHeading(await GetHeading());     
          setText(`${location.x}, ${location.y}, ${heading.trueHeading}`);
          await appendToFile(text);
        }} />
      </View>
      <View style={styles.footer}>
        <Button title={"Upload Data"} onPress={ async () => await shareFile() } />
        <Button title={"Reset Data"} onPress={ async () => await deleteFile() } />
      </View>
    </View>
  );
}
