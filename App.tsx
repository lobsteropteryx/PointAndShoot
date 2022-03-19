import { Button, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import { styles } from './Styles';
import { Location, Heading, isAuthorized, watchLocation, watchHeading} from './Location';
import { appendToFile, shareFile, deleteFile } from './Filesystem';
import { WaypointModal } from './WaypointModal';

export default function App() {
  const [locationIsAuthorized, setLocationIsAuthorized] = useState<boolean>(false);
  const [location, setLocation] = useState<Location>();
  const [heading, setHeading] = useState<Heading>();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [waypointName, setWaypointName] = useState<string>('');

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

  const captureWaypoint = () => {
    setWaypointName('');
    setModalVisible(true);
  }

  const logWaypoint = async () => {
    setModalVisible(false);
    const text = `${waypointName}, ${location?.x}, ${location?.y}, ${heading?.trueHeading}`;
    await appendToFile(text);
  }

  const waypointEnabled = () => locationIsAuthorized && location && heading;

  return (
    <View style={styles.container}>
      <WaypointModal 
        isVisible={modalVisible} 
        onSubmit={logWaypoint}
        onWaypointNameChange={setWaypointName}
        waypointName={waypointName}
      />
      <View style={styles.main}>
        <Button disabled={!waypointEnabled} title={"Capture Waypoint"} onPress={captureWaypoint} />
        <Text style={styles.coordinateDisplay}>Heading: {heading?.trueHeading}</Text>
        <Text style={styles.coordinateDisplay}>Latitude: {location?.y}</Text>
        <Text style={styles.coordinateDisplay}>Longitude: {location?.x}</Text>
      </View>
      <View style={styles.footer}>
        <Button title={"Upload Data"} onPress={ async () => await shareFile() } />
        <Button title={"Reset Data"} onPress={ async () => await deleteFile() } />
      </View>
    </View>
  );
}
