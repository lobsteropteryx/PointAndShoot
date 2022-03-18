import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

const fileUri = `${FileSystem.documentDirectory}PointAndShoot.csv`;

async function appendToFile(data: string): Promise<void> {
    const fileInfo = await FileSystem.getInfoAsync(fileUri);
    let fileContents = fileInfo.exists ? 
        await FileSystem.readAsStringAsync(fileUri) : 
        "Longitude,Latitude,Heading\r\n"; 
    fileContents = fileContents + "\r\n" + data;
    await FileSystem.writeAsStringAsync(fileUri, fileContents);
}

async function shareFile() {
    if (await Sharing.isAvailableAsync()) {
        Sharing.shareAsync(fileUri);
    }
}

async function deleteFile() {
    const fileInfo = await FileSystem.getInfoAsync(fileUri);
    if (fileInfo.exists) {
        await FileSystem.deleteAsync(fileUri);
    }
}

export { appendToFile, shareFile, deleteFile };
