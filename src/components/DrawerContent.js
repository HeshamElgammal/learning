import { StyleSheet, Text, View, Image, I18nManager } from 'react-native'
import React,{useEffect} from 'react'
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'
import AntDesign from "react-native-vector-icons/AntDesign"
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import { useTranslation } from 'react-i18next';
import RNRestart from "react-native-restart";
import "../i18config"
import { useTheme } from 'react-native-paper';
import { DarkContexts } from '../configs/context'
import AsyncStorage from '@react-native-async-storage/async-storage';
const DrawerContent = props => {
    const { toggleTheme } = React.useContext(DarkContexts);
   
    const { t, i18n } = useTranslation();
    const { colors } = useTheme();
    const [currentLanguage, setLanguage] = React.useState('en');
    const changeLanguage = value => {
        console.log(value)
        if (value == "en") {
            I18nManager.forceRTL(false);
            I18nManager.allowRTL(false);
            i18n
                .changeLanguage('en')
                .then(async () => {
                    setLanguage('en')
                })
                .catch(err => console.log(err));
        } else if ("ar") {
            I18nManager.forceRTL(true);
            I18nManager.allowRTL(true);
            i18n
                .changeLanguage('ar')
                .then(async () => {
                    setLanguage('ar')
                })
                .catch(err => console.log(err));
        }

        RNRestart.Restart();
    };
    return (
        <DrawerContentScrollView
            {...props}
            scrollEnabled={true}
            contentContainerStyle={{
                flex: 1,
                backgroundColor: colors.button,
                paddingTop: 40,
                paddingLeft: 10
            }}
            showsVerticalScrollIndicator={false}
        >

            <View style={{ alignSelf: "center", marginBottom: 30 }} >
                <Image
                    source={require('../assets/imgs/h5.jpg')}
                    resizeMode="center"
                    style={styles.avatar}
                />
                <Text style={{ color: colors.background, fontSize: 20, fontWeight: "bold", textAlign: "center" }}>Hesham</Text>
            </View>
            <View style={{ flex: 1 }}>
                <DrawerItem
                    label="Home"
                    labelStyle={{ color: colors.txt }}
                    style={{ backgroundColor: colors.bground, elevation: 3 }}
                    onPress={() => props.navigation.navigate("HomeScreens")}
                    icon={() => <AntDesign name="home" color={colors.txt} size={20} />}
                />
                <DrawerItem
                    label="Sign up"
                    onPress={() => props.navigation.navigate("AuthScreens")}
                    labelStyle={{ color: colors.txt }}
                    style={{ backgroundColor: colors.bground, elevation: 3 }}
                    icon={() => <AntDesign name="dashboard" color={colors.txt} size={20} />}
                />
                <DrawerItem
                    label="Profile"
                    onPress={() => props.navigation.navigate("ProfileScreens")}
                    labelStyle={{ color: colors.txt }}
                    style={{ backgroundColor: colors.bground, elevation: 3 }}
                    icon={() => <AntDesign name="user" color={colors.txt} size={20} />}
                />
                <DrawerItem
                    label="Dark"
                    onPress={async () => {
                        toggleTheme()
                    }}
                    labelStyle={{ color: colors.txt }}
                    style={{ backgroundColor: colors.bground, elevation: 3 }}
                    icon={() => <AntDesign name="user" color={colors.txt} size={20} />}
                />
                {i18n.language == "en" ? <DrawerItem
                    label="Arabic"
                    onPress={() => changeLanguage("ar")}
                    labelStyle={{ color: colors.txt }}
                    style={{ backgroundColor: colors.bground, elevation: 3 }}
                    icon={() => <FontAwesome5 name="globe" color={colors.txt} size={20} />}
                /> : null}
                {i18n.language == "ar" ? <DrawerItem
                    label="English"
                    onPress={() => changeLanguage("en")}
                    labelStyle={{ color: colors.txt }}
                    style={{ backgroundColor: colors.bground, elevation: 3 }}
                    icon={() => <FontAwesome5 name="globe" color={colors.txt} size={20} />}
                /> : null}
            </View>
            <View style={{ borderBottomWidth: .9, borderColor: colors.bground, marginTop: 150 }} />
            <View>
                <DrawerItem
                    label="Logout"
                    labelStyle={{ color: colors.bground }}
                    // style={{ backgroundColor: colors.bground, elevation: 3 }}
                    icon={() => <AntDesign name="logout" color={colors.bground} size={16} />}
                    onPress={() => alert('Are your sure to logout?')}
                />
            </View>
        </DrawerContentScrollView>
    )
}

export default DrawerContent

const styles = StyleSheet.create({
    avatar: {
        borderRadius: 60,
        marginBottom: 15,
        borderColor: "white",
        borderWidth: 1,
        height: 100,
        width: 100,
        scale: 0.5,
        borderWidth: StyleSheet.hairlineWidth,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
})