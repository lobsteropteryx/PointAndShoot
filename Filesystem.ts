import * as FileSystem from 'expo-file-system';

const fileUri = `${FileSystem.documentDirectory}PointAndShoot.csv`;

async function appendToFile(data: string): Promise<void> {
    console.debug(fileUri);
    const fileInfo = await FileSystem.getInfoAsync(fileUri);
    let fileContents = data;
    if (fileInfo.exists) {
        fileContents = await FileSystem.readAsStringAsync(fileUri);
        fileContents = fileContents + "\r\n" + data;
    } 
    return await FileSystem.writeAsStringAsync(fileUri, fileContents);
}

export { appendToFile };
