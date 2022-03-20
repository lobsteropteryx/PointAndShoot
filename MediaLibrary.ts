import * as MediaLibrary from 'expo-media-library';

const albumName = 'PointAndShoot';

async function isAuthorized(): Promise<boolean> {
    const status = await MediaLibrary.requestPermissionsAsync(false);
    return status.accessPrivileges !== 'none';
}

async function addImageToAlbum(fileUri: string): Promise<void> {
    const asset = await MediaLibrary.createAssetAsync(fileUri);
    const album = await MediaLibrary.getAlbumAsync(albumName);
    if (album) {
        await MediaLibrary.addAssetsToAlbumAsync(asset, album);
    } else {
        await MediaLibrary.createAlbumAsync(albumName, asset); 
    }
}

export { isAuthorized, addImageToAlbum }