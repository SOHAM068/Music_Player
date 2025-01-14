import TrackPlayer, { RepeatMode, Event } from 'react-native-track-player';
import { TRACKS } from './src/constant';

export async function addTrack() {
    await TrackPlayer.add(TRACKS);
    // await TrackPlayer.setQueue(TRACKS);
    await TrackPlayer.setRepeatMode(RepeatMode.Queue);
}

export async function setupPlayer(){
    let isSetup = false;
    try{
        await TrackPlayer.getActiveTrackIndex()
        isSetup = true;
    }
    catch(error){
        await TrackPlayer.setupPlayer();
        isSetup = true;
    }
    finally{
        return isSetup;
    }
}
export async function playbackServices() {
    TrackPlayer.addEventListener(Event.RemotePause, () => {
        TrackPlayer.pause();
    })
    TrackPlayer.addEventListener(Event.RemotePlay, () => {
        TrackPlayer.play();
    })
    TrackPlayer.addEventListener(Event.RemotePrevious, () => {
        TrackPlayer.skipToPrevious();
    })
    TrackPlayer.addEventListener(Event.RemoteNext, () => {
        TrackPlayer.skipToNext();
    })
}