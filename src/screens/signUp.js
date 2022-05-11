import { StyleSheet, Text, View, StatusBar, ScrollView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
// import colors from"../constants/index"
import {Dcolors} from"../constants/index"
import Textinputs from "../components/TextInput"
import ButtonAuth from '../components/ButtonAuth'
import { LoginButton, AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk-next';
import '../i18config';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'react-native-paper'
const Signup = ({navigation,style}) => {
    const { colors } = useTheme()
    const { t, i18n } = useTranslation();
    const [userInfoFB, setuserInfoFB] = React.useState({})
    const [userInfo, setuserInfo] = React.useState({ name: "", email: "", password: "" })
    const [userError, setError] = React.useState({
        name: "please Enter Correct Name",
        email: "please Enter Correct Email",
        password: "please Enter Correct password"
    })
    const [showError, setShowError] = React.useState({ fname: false, email: false, password: false })

    const getInfoFromToken = token => {
        const PROFILE_REQUEST_PARAMS = {
            fields: {
                string: 'id, name,  first_name, last_name,email,picture.type(large)',
            },
        };
        const profileRequest = new GraphRequest(
            '/me',
            { token, parameters: PROFILE_REQUEST_PARAMS },
            (error, result) => {
                if (error) {
                    console.log('login info has error: ' + error);
                } else {
                    setuserInfoFB(result)
                    console.log('result:', result);
                }
            },
        );
        new GraphRequestManager().addRequest(profileRequest).start();
    };
    const handleChangeText = (key, value) => {
        setuserInfo(prevState => ({ ...prevState, [key]: value }))
    }
    const handleSubmit = () => {
        const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (userInfo.name.length > -1 && userInfo.email.length > -1 && userInfo.password.length > -1) {
            if (regex.test(userInfo.email) == false && userInfo.name.length < 3 && userInfo.password.length > 4) {
                setShowError({
                    email: true,
                    fname: true,
                    password: false
                })
            } else if (regex.test(userInfo.email) == false && userInfo.name.length > 3 && userInfo.password.length < 4) {
                setShowError({
                    email: true,
                    fname: false,
                    password: true
                })
            } else if (regex.test(userInfo.email) == true && userInfo.name.length < 3 && userInfo.password.length < 4) {
                setShowError({
                    email: false,
                    fname: true,
                    password: true
                })
            } else if (regex.test(userInfo.email) == false && userInfo.name.length < 3 && userInfo.password.length < 4) {
                setShowError({
                    email: true,
                    fname: true,
                    password: true
                })
            }  else {
                if (regex.test(userInfo.email) == false) {
                    setShowError({
                        email: true,
                        fname: false,
                        password: false
                    })
                } else if (userInfo.name.length < 3) {
                    setShowError({
                        email: false,
                        fname: true,
                        password: false
                    })
                } else if (userInfo.password.length < 4) {
                    setShowError({
                        email: false,
                        fname: false,
                        password: true
                    })
                } else {
                    alert(JSON.stringify(userInfo))
                    setShowError({
                        email: false,
                        fname: false,
                        password: false
                    })
                }
            }

        } else {
            setShowError({
                fname: true,
                email: true,
                password: true
            })
        }
        
    }
    return (
        <ScrollView style={{ flex: 1, backgroundColor: colors.bground,...style}}>
            <View style={[styles.container,{...style,backgroundColor:colors.bground}]}>
                <StatusBar backgroundColor={colors.primary} />
                <View style={styles.boxTitles}>
                    <Text style={[styles.titles,{color:colors.txt}]}>{t("hello")}!</Text>
                    <Text style={[styles.titles,{color:colors.txt}]}>SignUp To get Started</Text>
                </View>
                <Textinputs name="Name" onChange={(value) => handleChangeText("name", value)} />
                {showError.fname && (<View style={styles.boxError}><Text style={{color:colors.red}}>{userError.name}</Text></View>)}
                <Textinputs name="Email" onChange={(value) => handleChangeText("email", value)} />
                {showError.email && (<View style={styles.boxError}><Text style={{color:colors.red}}>{userError.email}</Text></View>)}
                <Textinputs name="Password" onChange={(value) => handleChangeText("password", value)} />
                {showError.password && (<View style={styles.boxError}><Text style={{color:colors.red}}>{userError.password}</Text></View>)}
                <ButtonAuth title="Sign Up" onPress={() => handleSubmit()} />

                <View style={styles.boxSignInTitle}>
                    <TouchableOpacity
                      onPress={()=>navigation.navigate("SignIn")}
                    >
                        <Text style={[styles.signInTitle,{color:colors.txt}]}>SignIn</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ alignSelf: "center" }}>
                    <LoginButton
                        style={{ width: 250, height: 30 }}
                        onLoginFinished={(error, result) => {
                            if (error) {
                                console.log('login has error: ' + result.error);
                            } else if (result.isCancelled) {
                                console.log('login is cancelled.');
                            } else {
                                AccessToken.getCurrentAccessToken().then(data => {
                                    const accessToken = data.accessToken.toString();
                                    getInfoFromToken(accessToken);
                                });
                            }
                        }}
                        onLogoutFinished={() => setuserInfoFB({})}
                    />
                    {userInfoFB && (<Image
                        source={{ uri: userInfoFB.picture ? userInfoFB.picture.data.url : null }}
                        style={{
                            width: 190,
                            height: 200,
                            marginTop: 10,
                            
                        }}
                    />)}

                </View>
            </View>
        </ScrollView>
    )
}

export default Signup

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: "100%",
        paddingTop: 10,
    },
    boxTitles: {
        width: "40%",
        margin: "5%"
    },
    titles: {
        fontSize: 25,
        letterSpacing: 1,
        fontFamily: "serif",
        fontWeight: "900",
        marginTop: 8
    },
    signInTitle: {
        textDecorationLine: "underline",
        letterSpacing: .8,
        fontSize: 15,
        fontWeight: "700"
    },
    boxSignInTitle: {
        width: "90%",
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-between",
        alignSelf: "center",
        marginBottom: "5%"
    },
    boxError: {
        width: "90%",
        alignSelf: "center"
    },
    
})