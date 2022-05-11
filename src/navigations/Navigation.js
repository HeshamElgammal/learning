import { StyleSheet, Text, View, TouchableOpacity,StatusBar } from 'react-native'
import React from 'react'

import {
    Home,
    SignIn,
    Signup,
    Quizes,
    QuizDetails,
    Videos,
    Summaries,
    PicDetails,
    Profile
} from "../screens/index"
import Feather from 'react-native-vector-icons/Feather';

import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerContent from '../components/DrawerContent';
import Animated, { interpolateNode } from 'react-native-reanimated';
import '../i18config';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'react-native-paper';



const AuthStack = createStackNavigator()
const Drawer = createDrawerNavigator()
const AuthScreens = ({ navigation, style }) => {
    const { colors } = useTheme()
    return (
        <Animated.View style={StyleSheet.flatten([styles.stack, style])}>
            <AuthStack.Navigator
                screenOptions={{
                    headerTransparent: false,
                    headerShown: false,
                    headerTitle: null,
                    headerLeft: () => (
                        <TouchableOpacity transparent onPress={() => navigation.openDrawer()}>
                            <Feather name="menu" size={18} color={colors.primary} style={{ paddingHorizontal: 10 }} />
                        </TouchableOpacity>
                    ),

                }}
            >
                <AuthStack.Screen name='SignUp' >{props => <Signup {...props} />}</AuthStack.Screen>
                <AuthStack.Screen name='SignIn' >{props => <SignIn {...props} />}</AuthStack.Screen>
            </AuthStack.Navigator>
        </Animated.View>
    )
}
const ProfileStack = createStackNavigator()
const ProfileScreens = ({ navigation, style }) => {
    const { colors } = useTheme()
    return (
        <Animated.View style={StyleSheet.flatten([styles.stack, style])}>
            <ProfileStack.Navigator
                screenOptions={{
                    headerTransparent: false,
                    headerShown: false,
                    headerTitle: "Profile",
                    headerLeft: () => (
                        <TouchableOpacity transparent onPress={() => navigation.openDrawer()}>
                            <Feather name="menu" size={18} color={colors.primary} style={{ paddingHorizontal: 10 }} />
                        </TouchableOpacity>
                    ),

                }}
            >
                <ProfileStack.Screen name='Profile' >{props => <Profile {...props} />}</ProfileStack.Screen>
            </ProfileStack.Navigator>
        </Animated.View>
    )
}
const HomeStack = createStackNavigator()
const HomeScreens = ({ navigation, style }) => {
    const { colors } = useTheme()
    const { t, i18n } = useTranslation();
    console.log(JSON.stringify(navigation))
    return (
        <Animated.View style={StyleSheet.flatten([styles.stack, style])}>
            <HomeStack.Navigator
                screenOptions={{
                    headerStyle: { borderBottomWidth: .6, borderBottomColor: colors.txt, backgroundColor: colors.bground },
                    headerTransparent: false,
                    headerTitle: t("home"),
                    headerTitleStyle: { color: colors.txt, fontFamily: "serif", fontWeight: "bold", fontSize: 20 },
                    headerTitleAlign: "center",
                    headerLeft: () => (
                        <TouchableOpacity transparent onPress={() => {
                            navigation.openDrawer()
                            console.log({ ...style })
                        }}>
                            <Feather name="menu" size={22} color={colors.button} style={{ paddingHorizontal: 10 }} />
                        </TouchableOpacity>
                    ),

                }}
                initialRouteName="Home"
            >
                <HomeStack.Screen name='Quizes'
                    options={{
                        headerTitle: t("Quizes"),
                        headerLeft: null
                    }}>{props => <Quizes {...props} />}</HomeStack.Screen>
                <HomeStack.Screen name='Videos'
                    options={{
                        headerTitle: t("videos"),
                        headerLeft: null
                    }}>{props => <Videos {...props} />}</HomeStack.Screen>
                <HomeStack.Screen name='QuizDetails'
                    options={{
                        headerTitle: t("Quizes"),
                        headerLeft: null
                    }}>{props => <QuizDetails {...props} />}</HomeStack.Screen>
                <HomeStack.Screen name='PicDetails'
                    options={{
                        headerTitle: t("Quizes"),
                        headerLeft: null,
                        headerShown: false
                    }}>{props => <PicDetails {...props} />}</HomeStack.Screen>
                <HomeStack.Screen name='Summaries'
                    options={{
                        headerTitle: "Pictures",
                        headerLeft: null
                    }}>{props => <Summaries {...props} />}</HomeStack.Screen>
                <HomeStack.Screen name='Home'  >{props => <Home {...props} />}</HomeStack.Screen>
            </HomeStack.Navigator>
        </Animated.View>
    )
}

const Navigation = () => {
    const { colors } = useTheme()
    const [progress, setProgress] = React.useState(new Animated.Value(0))
    const scale = interpolateNode(progress, {
        inputRange: [0, 1],
        outputRange: [1, 0.8],
    })
    const borderRadius = interpolateNode(progress, {
        inputRange: [0, 1],
        outputRange: [1, 20],
    })
    const animated = { borderRadius, transform: [{ scale }] }
    return (
        <View style={[{ backgroundColor: colors.button, flex: 1 }]}>
          <StatusBar backgroundColor={colors.primary}  />

            <Drawer.Navigator
                drawerType="slide"
                overlayColor="transparent"
                drawerStyle={styles.drawerStyles}
                contentContainerStyle={{ flex: 1 }}
                drawerContentOptions={{
                    activeBackgroundColor: 'transparent',
                    activeTintColor: 'white',
                    inactiveTintColor: 'white',
                }}
                sceneContainerStyle={{ backgroundColor: 'transparent' }}
                drawerContent={props => {
                    // console.log(props.progress)
                    setProgress(props.progress)
                    return <DrawerContent {...props} />;
                }}
                initialRouteName="HomeScreens"
            >
                <Drawer.Screen name='HomeScreens' >
                    {props => <HomeScreens {...props} style={animated} />}
                </Drawer.Screen>
                <Drawer.Screen name='AuthScreens' >
                    {props => <AuthScreens {...props} style={animated} />}
                </Drawer.Screen>
                <Drawer.Screen name='ProfileScreens' >
                    {props => <ProfileScreens {...props} style={animated} />}
                </Drawer.Screen>

            </Drawer.Navigator>
        </View>
    )
}

export default Navigation

const styles = StyleSheet.create({
    stack: {
        flex: 1,
        shadowColor: '#FFF',
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.44,
        shadowRadius: 10.32,
        elevation: 5,
    },
    drawerStyles: {
        flex: 1,
        width: '70%',
        backgroundColor: 'transparent'
    },
})