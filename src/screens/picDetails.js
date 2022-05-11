import { StyleSheet, View, ImageBackground, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FlatList } from 'react-native-gesture-handler'
import Pinchable from 'react-native-pinchable';
const PicDetails = ({ route }) => {
    const {  imgs } = route.params
    const [photo, setPhoto] = useState(imgs)
    const { width, height } = Dimensions.get("window")
    console.log(imgs)
    const ref = React.useRef();
    return (
        <View style={{ flex: 1, backgroundColor: "#000" }}>
            <FlatList
                contentContainerStyle={{
                    height: "100%"
                }}
                showsHorizontalScrollIndicator={false}
                horizontal
                pagingEnabled
                ref={ref}
                data={photo}
                renderItem={({ item, index }) => {
                    return (
                       
                        <Pinchable>
                            <ImageBackground
                                style={{
                                    width: width,
                                    height: height,
                                    backgroundColor: "#000",
                                }}
                                resizeMethod="resize"
                                resizeMode='contain'
                                source={{ uri: item }}
                            ></ImageBackground>
                            </Pinchable>
                           
                    )
                }}
            />
        </View>
    )
}

export default PicDetails

const styles = StyleSheet.create({})