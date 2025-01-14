import { Dimensions, StyleSheet, Text, View, Image, FlatList } from 'react-native'
import React, { useState } from 'react'
import TrackPlayer, {Track, Event, useTrackPlayerEvents} from 'react-native-track-player'
import SongInfo from '../components/SongInfo'
import SongSlider from '../components/SongSlider'
import { TRACKS } from '../constant'
import ControlCenter from '../components/ControlCenter'

const {width} = Dimensions.get('window')
const MusicPlayer = () => {
  const [track, setTrack] = useState<Track | null>()

  useTrackPlayerEvents([Event.PlaybackTrackChanged], async event => {
    switch (event.type) {
      case Event.PlaybackTrackChanged:
        const trackPlaying = await TrackPlayer.getTrack(event.nextTrack)
        setTrack(trackPlaying)
        break;
    }
  })
  
  const renderArtWork = () : JSX.Element => {
    return(
      <View style={styles.listArtWrapper}>
      <View style={styles.albumContainer}>
        {track?.artwork && (
          <Image 
          style={styles.albumArtImg}
          source={{uri : track?.artwork?.toString()}}
          />
        )}
      </View>
    </View>
    )
  }

  return (
    <View style={styles.container}>
      <FlatList 
      horizontal
      data={TRACKS}
      renderItem={renderArtWork}
      keyExtractor={song => song.id.toString()}
      />
      <SongInfo track={track}/>
      <SongSlider />
      <ControlCenter />
    </View>
  )
}
export default MusicPlayer
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#001d23',
      },
      listArtWrapper: {
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
      },
      albumContainer: {
        width: 300,
        height: 300,
      },
      albumArtImg: {
        height: '100%',
        borderRadius: 4,
      },
})