import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

const fileUri = `${FileSystem.documentDirectory}PointAndShoot.csv`;

async function appendToFile(data: string): Promise<void> {
    const fileInfo = await FileSystem.getInfoAsync(fileUri);
    let fileContents = fileInfo.exists ? 
        await FileSystem.readAsStringAsync(fileUri) : 
        "WaypointName,Longitude,Latitude,Heading\r\n"; 
    fileContents = fileContents + data + "\r\n";
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
        console.debug("Deleting file");
        await FileSystem.deleteAsync(fileUri);
    }
}

async function renameFile(fromUri: string, toFilename: string): Promise<string> {
    const toPath = `${FileSystem.cacheDirectory}${toFilename}`;
    await FileSystem.moveAsync({from: fromUri, to: toPath});
    return toPath;
}

export { appendToFile, shareFile, deleteFile, renameFile };
