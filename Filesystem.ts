import { StorageAccessFramework } from 'expo-file-system';

const OUTPUT_DIRECTORY = "content://com.android.externalstorage.documents/tree/primary%3ADocuments";

async function createFile(): Promise<string> {
    const permissions = await StorageAccessFramework.requestDirectoryPermissionsAsync(OUTPUT_DIRECTORY);
    if (!permissions.granted) {
        throw new Error("Unable to access file system");
    }
    console.debug(permissions.directoryUri);

    const filename = "PointAndShootWaypoints";
    return await StorageAccessFramework.createFileAsync(
        permissions.directoryUri, 
        filename, 
        "text/csv"
    );
}

async function appendToFile(fileUri: string, data: string): Promise<void> {
    StorageAccessFramework.readAsStringAsync(fileUri)
    let fileContents = await StorageAccessFramework.readAsStringAsync(fileUri);
    fileContents = fileContents + "\r\n" + data;
    return await StorageAccessFramework.writeAsStringAsync(fileUri, fileContents);
}

export { createFile, appendToFile };
