import React from 'react';
import { Button, Modal, NativeSyntheticEvent, NativeTouchEvent, TextInput, View } from 'react-native';
import { styles } from './Styles';

type WaypointModalProps = {
  isVisible: boolean,
  onSubmit: (ev: NativeSyntheticEvent<NativeTouchEvent>) => void,
  onCancel: (ev: NativeSyntheticEvent<NativeTouchEvent>) => void,
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
            style={styles.input}
            value={props.waypointName}
            autoCorrect={false}
            autoFocus={true}
            onChangeText={props.onWaypointNameChange}
            placeholder="Enter Waypoint Name"
          />
          <View style={styles.footer}>
            <Button title={'Submit'} onPress={props.onSubmit} />
            <Button title={'Cancel'} onPress={props.onCancel} />
          </View>
      </Modal>
    </View>
  );
} 