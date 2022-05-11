import { StyleSheet, Text, View, ScrollView, Image, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
// import colors from"../constants/index"
import { Dcolors } from "../constants/index"
import Pinchable from 'react-native-pinchable';
import * as Progress from 'react-native-progress';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'react-native-paper';

const Profile = ({ navigation, style }) => {
    const { colors } = useTheme()
    const { t, i18n } = useTranslation();
    const { height, width } = Dimensions.get("window")

    Dividor = () => {
        return (
            <View style={{ borderBottomWidth: .5, borderColor: colors.button, marginVertical: 20 }}></View>
        )
    }
    return (
        <ScrollView style={{ flex: 1, backgroundColor: colors.bground, ...style }}>
            <View style={{
                alignItems: "center",
                ...style,
                flex: 1
            }}>
                <View style={[styles.header, { marginBottom: height * .07,backgroundColor:colors.button }]} >
                    <Text style={[styles.titles, { alignSelf: "flex-start", alignItems: "center", marginBottom: height * .03,color:colors.btnTxt }]}>
                        {t("hello")} Hesham ...
                    </Text>
                    <Pinchable>
                        <Image
                            source={require('../assets/imgs/h5.jpg')}
                            resizeMode="center"
                            style={[styles.avatar, { marginBottom: -height * .04 }]}
                        />
                    </Pinchable>
                </View>
                <View style={[styles.boxPercentage,{backgroundColor:colors.bground}]}>
                    <Text style={[styles.titlePercent,{color:colors.txt}]}>{t("Cumulative percentage")} !    (90%)</Text>
                    <Progress.Bar progress={0.9} animationType="timing" width={width * .95} color={colors.button} />
                </View>
                <View style={[styles.boxData, { marginTop: height * .04 }]}>
                    <View style={styles.dataKV}>
                        <Text style={[styles.dataKey, { color: colors.txt }]}>{t("E-mail")} : </Text>
                        <Text style={[styles.dataValue, { color: colors.txt }]} selectionColor={colors.primary} selectable={true}>
                            heshamelgammal001@gmail.com
                        </Text>
                    </View>
                    <Dividor />
                    <View style={styles.dataKV}>
                        <Text style={[styles.dataKey, { color: colors.txt }]}>{t("Name")} : </Text>
                        <Text style={[styles.dataValue, { color: colors.txt }]} selectionColor={colors.primary} selectable={true}>
                            Hesham
                        </Text>
                    </View>
                    <Dividor />
                    <View style={styles.dataKV}>
                        <Text style={[styles.dataKey, { color: colors.txt }]}>{t("Phone")} : </Text>
                        <Text style={[styles.dataValue, { color: colors.txt }]} selectionColor={colors.primary} selectable={true}>
                            01092901319
                        </Text>
                    </View>
                    <Dividor />
                    <View style={styles.dataKV}>
                        <Text style={[styles.dataKey, { color: colors.txt }]}>{t("Password")} : </Text>
                        <Text style={[styles.dataValue, { color: colors.txt }]} selectionColor={colors.primary} selectable={true}>
                            *******19
                        </Text>
                    </View>
                    <Dividor />
                </View>
                <TouchableOpacity style={{
                    paddingHorizontal: 50,
                    paddingVertical: 15,
                    backgroundColor: colors.button,
                    elevation: 4,
                    marginBottom: height * .05,
                    borderRadius: 5,
                    marginTop: height * .15
                }}
                    onPress={() => {

                    }}
                >
                    <Text style={[styles.txBtn, { color: colors.btnTxt }]}>{t("Log-Out")}</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default Profile

const styles = StyleSheet.create({
    titles: {
        color: colors.txt,
        fontSize: 20,
        fontWeight: "900",
        fontFamily: "serif",
        marginHorizontal: 20
    },
    avatar: {
        borderRadius: 60,
        marginTop: 20,
        borderColor: "white",
        borderWidth: 1,
        height: 120,
        width: 120,
        scale: 0.5,
        borderWidth: StyleSheet.hairlineWidth,
    },
    header: {
        alignSelf: "center",
        width: "100%",
        backgroundColor: colors.primary,
        justifyContent: "flex-end",
        alignItems: "center",
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        borderBottomStartRadius: 30,
        borderBottomEndRadius: 30,
        paddingTop: 30
    },
    boxPercentage: {
        width: "100%",
        // backgroundColor: "#fff",
        paddingHorizontal: 10,
        alignItems: "center"
    },
    titlePercent: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 5
    },
    boxData: {
        width: "100%",
        paddingHorizontal: 10,
    },
    dataKey: {
        fontSize: 18,
        fontFamily: "serif",
        fontWeight: "bold",
        marginHorizontal: 5
    },
    dataValue: {
        fontSize: 16,
        fontFamily: "serif",
        opacity: .7
    },
    dataKV: {
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap"
    },
    txBtn: {
        fontSize: 18,
        fontFamily: "serif",
        fontWeight: "bold",
    }
})










{/* <Progress.CircleSnail animating={true} animated={true} size={50} color={['red', 'green', 'blue']} /> */ }
