import * as ExpoLocation from 'expo-location';

type Location = {
    x: number,
    y: number,
    heading: number
}

type Heading = {
    accuracy: number,
    magneticHeading: number,
    trueHeading: number
}

async function isAuthorized(): Promise<boolean> {
    let { status } = await ExpoLocation.requestForegroundPermissionsAsync();
    return status === 'granted';
}

async function watchLocation(callback: Function): Promise<ExpoLocation.LocationSubscription> {
    return ExpoLocation.watchPositionAsync({
        accuracy: ExpoLocation.Accuracy.Highest,
        distanceInterval: 0,
        mayShowUserSettingsDialog: true
    }, (location: ExpoLocation.LocationObject) => callback(toLocation(location)));
}

function toLocation(location: ExpoLocation.LocationObject): Location {
    return {
        x: location.coords.longitude,
        y: location.coords.latitude,
        heading: 0
    }
}

async function watchHeading(callback: Function): Promise<ExpoLocation.LocationSubscription> {
    return ExpoLocation.watchHeadingAsync(
        (heading: ExpoLocation.LocationHeadingObject) => callback(toHeading(heading))
    );
}

function toHeading(heading: ExpoLocation.LocationHeadingObject): Heading {
    return {
        accuracy: heading.accuracy,
        magneticHeading: heading.magHeading,
        trueHeading: Math.round(heading.trueHeading * 1000) / 1000
    }
} 

export {Location, Heading, isAuthorized, watchLocation, watchHeading}