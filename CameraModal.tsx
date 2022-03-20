import React, { useRef, useState } from 'react';
import { Modal, NativeSyntheticEvent, NativeTouchEvent, Text, TouchableOpacity, View } from 'react-native';
import { Camera as ExpoCamera } from 'expo-camera';
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
      if(cameraReady) {
        console.debug("Camera ready");
        const image = await cameraRef?.current?.takePictureAsync();
        props.onSubmit();
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
                <TouchableOpacity onPress={captureImage}>
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