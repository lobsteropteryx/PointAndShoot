import React from 'react';
import { Button, Modal, NativeSyntheticEvent, NativeTouchEvent, TextInput, View } from 'react-native';
import { styles } from './Styles';

type WaypointModalProps = {
  isVisible: boolean,
  onSubmit: (ev: NativeSyntheticEvent<NativeTouchEvent>) => void,
  onWaypointNameChange: (text: string) => void,
  waypointName: string
}

export function WaypointModal(props: WaypointModalProps) {
  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={false}
        visible={props.isVisible}>
          <TextInput
            value={props.waypointName}
            onChangeText={props.onWaypointNameChange}
            placeholder="Enter Waypoint Name"
          />
          <Button title={'Submit'} onPress={props.onSubmit} />
      </Modal>
    </View>
  );
} 