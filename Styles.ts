import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 16
    },
    main: {
        flex: 0.8
    },
    coordinateDisplay: {
        fontSize: 32
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 16
    },
    input: {
        height: 40,
        fontSize: 32,
        margin: 40
    },
    button: {
        color: 'white',
        fontSize: 16
    },
    camera: {
        flex: 1
    }
});

export { styles };