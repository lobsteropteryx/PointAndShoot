import { View, Button, Text } from 'react-native';
import { useEffect, useState } from 'react';
import { styles } from './Styles';
import { Location, Heading, isAuthorized as checkLocationIsAuthorized, watchLocation, watchHeading} from './Location';
import { isAuthorized as checkCameraIsAuthorized } from './CameraModal';
import { isAuthorized as checkMediaIsAuthorized } from './MediaLibrary';
import { appendToFile, shareFile, deleteFile } from './Filesystem';
import { WaypointModal } from './WaypointModal';
import { CameraModal } from './CameraModal';

export default function App() {
  const [locationIsAuthorized, setLocationIsAuthorized] = useState<boolean>(false);
  const [cameraIsAuthorized, setCameraIsAuthorized] = useState<boolean>(false);
  const [mediaIsAuthorized, setMediaIsAuthorized] = useState<boolean>(false);
  const [location, setLocation] = useState<Location>();
  const [heading, setHeading] = useState<Heading>();
  const [waypointModalVisible, setWaypointModalVisible] = useState<boolean>(false);
  const [cameraModalVisible, setCameraModalVisible] = useState<boolean>(false);
  const [waypointName, setWaypointName] = useState<string>('');

  useEffect( () => {
    (async () => {
      setLocationIsAuthorized(await checkLocationIsAuthorized())
    })();
    (async () => {
      setCameraIsAuthorized(await checkCameraIsAuthorized())
    })();
    (async () => {
      setMediaIsAuthorized(await checkMediaIsAuthorized())
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
    setWaypointModalVisible(true);
  }

  const logWaypoint = async () => {
    setWaypointModalVisible(false);
    const text = `${waypointName}, ${location?.x}, ${location?.y}, ${heading?.trueHeading}`;
    await appendToFile(text);
    setCameraModalVisible(true);
  }

  const cancelWaypoint = () => {
    setWaypointModalVisible(false);
  }

  const waypointEnabled = () => locationIsAuthorized && location && heading;

  const hideCamera = () => {
    setCameraModalVisible(false);
  }

  return (
    <View style={styles.container}>
      <WaypointModal
        isVisible={waypointModalVisible} 
        onSubmit={logWaypoint}
        onCancel={cancelWaypoint}
        onWaypointNameChange={setWaypointName}
        waypointName={waypointName}
      />
      <CameraModal
        isVisible={cameraModalVisible}
        waypointName={waypointName} 
        onSubmit={hideCamera}
        onCancel={hideCamera}
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
