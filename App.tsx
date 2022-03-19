import { Button, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import { styles } from './Styles';
import { Location, Heading, isAuthorized, watchLocation, watchHeading} from './Location';
import { appendToFile, shareFile, deleteFile } from './Filesystem';

export default function App() {
  const [locationIsAuthorized, setLocationIsAuthorized] = useState<boolean>(false);
  const [location, setLocation] = useState<Location>();
  const [heading, setHeading] = useState<Heading>();
  const [text, setText] = useState<string>('');

  useEffect( () => {
    (async () => {
      setLocationIsAuthorized(await isAuthorized())
    })();
    (async () => {
      await watchLocation(setLocation);
    })();
    (async () => {
      await watchHeading(setHeading);
    })();
  },[]);

  const onPress = async () => {
    setText(`${location?.x}, ${location?.y}, ${heading?.trueHeading}`);
    await appendToFile(text);
  }

  const waypointEnabled = () => locationIsAuthorized && location && heading;

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Button disabled={!waypointEnabled} title={"Capture Waypoint"} onPress={onPress} />
        <Text>Heading: {heading?.trueHeading}</Text>
        <Text>Latitude: {location?.y}</Text>
        <Text>Longitude: {location?.x}</Text>
      </View>
      <View style={styles.footer}>
        <Button title={"Upload Data"} onPress={ async () => await shareFile() } />
        <Button title={"Reset Data"} onPress={ async () => await deleteFile() } />
      </View>
    </View>
  );
}
