import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import Video from 'react-native-video';
import colors from "../constants/index"
import {Dcolors} from "../constants/index"
import VideoPlayer from 'react-native-video-controls';
const Videos = ({style}) => {
    return (
        <ScrollView
            scrollEventThrottle={16}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ flex: 1,...style }}
        >
            <View style={{
                flexGrow: 1,
                flexShrink: 1,
                backgroundColor: colors.txt,
                paddingVertical: 10,
                ...style
            }}>
                <Video source={{ uri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" }}   // Can be a URL or a local file.
                    //    ref={(ref) => {
                    //      this.player = ref
                    //    }}                                      // Store reference
                    //    onBuffer={this.onBuffer}                // Callback when remote video is buffering
                    //    onError={this.videoError}// Callback when video cannot be loaded
                    controls={true}
                    allowsExternalPlayback={true}
                    fullscreen={true}
                    currentTime={true}
                    isTVSelectable={true}
                    style={{ width: "100%", height: 200 }} />
                {/* <VideoPlayer
                    source={{ uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' }}
                    style={{ width: "100%", height: 100 }}
                    videoStyle={{width:"100%",height:"100%"}}
                    // navigator={this.props.navigator}
                /> */}
            </View>
        </ScrollView>
    )
}

export default Videos

const styles = StyleSheet.create({})