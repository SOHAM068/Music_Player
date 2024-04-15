import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import TrackPlayer, { State, usePlaybackState } from 'react-native-track-player'
import { playbackServices } from '../../musicPlayerServices'
import Icons from 'react-native-vector-icons/MaterialIcons'


const ControlCenter = () => {
    const playBackState = usePlaybackState();
  
    const skipToNext = async () => {
      await TrackPlayer.skipToNext();
    }
    const skipToPrevious = async () => {
      await TrackPlayer.skipToPrevious();
    }
    const togglePlayPause = async (playBack : State) => {
      const CurrentTrack = await TrackPlayer.getActiveTrackIndex();
      if(CurrentTrack !== null){
        if(playBack === State.Paused || playBack === State.Ready){
          await TrackPlayer.play();
        }else{
          await TrackPlayer.pause();
        }
      }
    }
  return (
    <View style={styles.container}>
      <Pressable onPress={skipToPrevious}>
        <Icons name="skip-previous" size={48} style={styles.icon} />
      </Pressable>
      <Pressable onPress={() => togglePlayPause(playBackState?.state || State.None)}>
        <Icons 
          name={playBackState?.state === State.Playing ? "pause" : "play-arrow"}
          size={75}
          style={styles.icon}
        />
      </Pressable>
      <Pressable onPress={skipToNext}>
        <Icons name="skip-next" size={48} style={styles.icon} />
      </Pressable>
    </View>
  )
}
export default ControlCenter
const styles = StyleSheet.create({
  container: {
    marginBottom: 56,

    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    color: '#FFFFFF',
  },
  playButton: {
    marginHorizontal: 24,
  },
})