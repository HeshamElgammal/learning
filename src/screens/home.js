import { StyleSheet, Text, View, TouchableOpacity, ScrollView, I18nManager } from 'react-native'
import React from 'react'
import AntDesign from "react-native-vector-icons/AntDesign"
import Entypo from "react-native-vector-icons/Entypo"
// import colors from "../constants"
import { useTheme } from 'react-native-paper'
import '../i18config';
import { useTranslation } from 'react-i18next';

const Home = ({ navigation, style }) => {
    const {colors}=useTheme()
    const { t, i18n } = useTranslation();
    // console.log({ ...style })
    return (
        <ScrollView style={{ flex: 1, backgroundColor: colors.bground, ...style }}>
            <View style={{
                alignItems: "center",
                // justifyContent: "center",
                paddingTop: 60,
                ...style,
                flex: 1
            }}>
                <TouchableOpacity style={[styles.boxBtn,{backgroundColor:colors.button}]}
                    onPress={() => { navigation.navigate("Quizes") }}
                >
                    <AntDesign name="edit" color={colors.btnTxt} size={20} />
                    <Text style={[styles.titles,{color:colors.btnTxt}]}>{t("quizes")}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.boxBtn,{backgroundColor:colors.button}]}
                    onPress={() => { navigation.navigate("Summaries") }}
                >
                    <AntDesign name="exception1" color={colors.btnTxt} size={20} />
                    <Text style={[styles.titles,{color:colors.btnTxt}]}>{t("summaries")}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.boxBtn,{backgroundColor:colors.button}]} onPress={() => { navigation.navigate("Videos") }}>
                    <Entypo name="video" color={colors.btnTxt} size={20} />
                    <Text style={[styles.titles,{color:colors.btnTxt}]}>{t("videos")}</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default Home

const styles = StyleSheet.create({
    titles: {
        fontSize: 20,
        fontWeight: "900",
        fontFamily: "serif",
        marginHorizontal: 20
    },
    boxBtn: {
        width: "90%",
        height: 80,
        // backgroundColor: colors.button,
        marginTop: "5%",
        borderRadius: 8,
        elevation: 8,
        // shadowColor: colors.button,
        shadowOffset: {
            width: 5,
            height: 8,
        },
        shadowOpacity: 0.44,
        shadowRadius: 10.32,
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "row",
        paddingHorizontal: 10
    }
})