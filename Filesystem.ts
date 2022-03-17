import { StorageAccessFramework } from 'expo-file-system';

async function appendToFile(data: string): Promise<void> {
    const fileUri = await getFileUri();
    StorageAccessFramework.readAsStringAsync(fileUri)
    let fileContents = await StorageAccessFramework.readAsStringAsync(fileUri);
    fileContents = fileContents + "\r\n" + data;
    return await StorageAccessFramework.writeAsStringAsync(fileUri, fileContents);
}

async function getFileUri(): Promise<string> {
    const permissions = await StorageAccessFramework.requestDirectoryPermissionsAsync();
    if (!permissions.granted) {
        throw new Error("Unable to access file system");
    }
    const parentUri = permissions.directoryUri;
    const filename = "PointAndShootWaypoints";
    if (await fileExists(parentUri, filename)) {
        return getExistingFile(parentUri, filename);
    } else {
        return await StorageAccessFramework.createFileAsync(
            parentUri, 
            filename, 
            "text/csv"
        );
    }
}

async function fileExists(parentUri: string, filename: string): Promise<boolean> {
    const files = await StorageAccessFramework.readDirectoryAsync(parentUri);
    console.debug(files);
    console.debug(`expected: ${filename}`);
    return files.some(file => file.includes(filename));
}

async function getExistingFile(parentUri: string, filename: string): Promise<string> {
    const files = await StorageAccessFramework.readDirectoryAsync(parentUri);
    const file = files.find(file => file.includes(filename));
    if(!file) {
        throw new Error("Unable to find file");
    }
    return file;
}

export { appendToFile };
