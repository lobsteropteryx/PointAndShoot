import React, { useRef, useState } from 'react';
import { Modal, NativeSyntheticEvent, NativeTouchEvent, Text, TouchableOpacity, View } from 'react-native';
import { Camera as ExpoCamera } from 'expo-camera';
import { addImageToAlbum } from './MediaLibrary';
import { renameFile } from './Filesystem';
import { styles } from './Styles';

type CameraProps = {
  isVisible: boolean,
  onSubmit: Function,
  onCancel: (ev: NativeSyntheticEvent<NativeTouchEvent>) => void,
  waypointName: string
}

async function isAuthorized(): Promise<boolean> {
    let { status } = await ExpoCamera.requestCameraPermissionsAsync();
    return status === 'granted';
}

function CameraModal(props: CameraProps) {
    const cameraRef = useRef<ExpoCamera>(null);
    const [cameraReady, setCameraReady] = useState<boolean>(false);

    const captureImage = async () => {
      if(cameraReady && cameraRef.current) {
        const image = await cameraRef.current.takePictureAsync();
        if (image) {
          const imageUri = await renameFile(image.uri, `${props.waypointName}.jpg`)
          await addImageToAlbum(imageUri);
        } else {
          throw new Error("Could not capture image");
        }
        props.onSubmit();
      } else {
        console.debug("camera not ready");
      }
    };

    return (
        <View style={styles.container}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={props.isVisible}>
            <ExpoCamera 
              ref={cameraRef}
              onCameraReady={() => setCameraReady(true)}
              type={ExpoCamera.Constants.Type.back} 
              style={styles.camera}>
              <View style={styles.footer}>
                <TouchableOpacity onPress={ async () => await captureImage() }>
                  <Text style={styles.button}>Submit</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={props.onCancel}>
                  <Text style={styles.button}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </ExpoCamera>
          </Modal>
        </View>
      );
}

export { isAuthorized, CameraModal }