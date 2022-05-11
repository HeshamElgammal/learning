import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    Dimensions,
    PermissionsAndroid,
    Platform,
} from 'react-native'
import React, { useState } from 'react'
import colors from "../constants"
import AntDesign from "react-native-vector-icons/AntDesign"
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import RNFetchBlob from 'rn-fetch-blob'
import Pinchable from 'react-native-pinchable';

const Summaries = ({ navigation, style }) => {
    const REMOTE_IMAGE_PATH = "https://ichef.bbci.co.uk/news/976/cpsprodpb/15951/production/_117310488_16.jpg"

    const { width, height } = Dimensions.get("window")
    const [imgs, setImgs] = useState([
        REMOTE_IMAGE_PATH,
        "https://ichef.bbci.co.uk/news/976/cpsprodpb/10DED/production/_117310196_02.jpg",
        "https://ichef.bbci.co.uk/news/976/cpsprodpb/15C0D/production/_117310198_03.jpg",
        "https://ichef.bbci.co.uk/news/976/cpsprodpb/00C9/production/_117310200_04.jpg"
    ])

    const checkPermission = async () => {

        // Function to check the platform
        // If iOS then start downloading
        // If Android then ask for permission

        if (Platform.OS === 'ios') {
            downloadImage();
        } else {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    {
                        title: 'Storage Permission Required',
                        message:
                            'App needs access to your storage to download Photos',
                    }
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    // Once user grant the permission start downloading
                    console.log('Storage Permission Granted.');
                    downloadImage();
                } else {
                    // If permission denied then show alert
                    alert('Storage Permission Not Granted');
                }
            } catch (err) {
                // To handle permission related exception
                console.warn(err);
            }
        }
    };

    const downloadImage = () => {
        // Main function to download the image

        // To add the time suffix in filename
        let date = new Date();
        // Image URL which we want to download
        let image_URL = REMOTE_IMAGE_PATH;
        // Getting the extention of the file
        let ext = getExtention(image_URL);
        ext = '.' + ext[0];
        // Get config and fs from RNFetchBlob
        // config: To pass the downloading related options
        // fs: Directory path where we want our image to download
        const { config, fs } = RNFetchBlob;
        let PictureDir = fs.dirs.PictureDir;
        let options = {
            fileCache: true,
            addAndroidDownloads: {
                // Related to the Android only
                useDownloadManager: true,
                notification: true,
                path:
                    PictureDir +
                    '/image_' +
                    Math.floor(date.getTime() + date.getSeconds() / 2) +
                    ext,
                description: 'Image',
            },
        };
        config(options)
            .fetch('GET', image_URL)
            .then(res => {
                // Showing alert after successful downloading
                console.log('res -> ', JSON.stringify(res));
                alert('Image Downloaded Successfully.');
            });
    };

    const getExtention = filename => {
        // To get the file extension
        return /[.]/.exec(filename) ?
            /[^.]+$/.exec(filename) : undefined;
    };

    return (
        <ScrollView style={{ flexGrow: 1, backgroundColor: colors.txt, ...style }}>
            <View style={{
                alignItems: "center",
                // paddingTop: 60,
                ...style,
                flexGrow: 1,
                flexShrink: 1,
            }}>
                <FlatList
                    contentContainerStyle={{
                        width: width,
                    }}

                    data={imgs}
                    renderItem={({ item, index }) => {
                        return (
                            <>
                                <TouchableOpacity style={{
                                    width: "80%",
                                    height: 200,
                                    alignSelf: "center",

                                    borderRadius: 5,
                                    // borderWidth: 1
                                }}

                                    onPress={() => {
                                        let newim = imgs
                                        newim = [item, ...newim]
                                        navigation.navigate("PicDetails", {
                                            imgs: newim,
                                        })
                                    }}

                                >

                                    <Pinchable>
                                        <Image
                                            source={{ uri: item }}
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                alignSelf: "stretch",
                                                elevation: 5,
                                                borderRadius: 5
                                            }}
                                            resizeMode="stretch"
                                        />
                                    </Pinchable>



                                </TouchableOpacity>
                                <TouchableOpacity style={{
                                    backgroundColor: "#fff",
                                    alignItems: "flex-end",
                                    width: "90%",
                                    marginBottom: 15,

                                }}
                                    onPress={() => {
                                        checkPermission()
                                    }}
                                >
                                    <AntDesign name='download' size={20} color={colors.primary} />
                                </TouchableOpacity>
                            </>
                        )
                    }}
                />
            </View>
        </ScrollView>
    )
}

export default Summaries

const styles = StyleSheet.create({})