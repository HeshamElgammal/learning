import { StyleSheet, Text, View, StatusBar, ScrollView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
// import colors from"../constants/index"
import { Dcolors } from "../constants/index"
import Textinputs from "../components/TextInput"
import ButtonAuth from '../components/ButtonAuth'
import { useTheme } from 'react-native-paper'

const SignIn = ({ navigation, style }) => {
    const { colors } = useTheme()
    const [userInfo, setuserInfo] = React.useState({ email: "", password: "" })
    const [userError, setError] = React.useState({
        email: "please Enter Correct Email",
        password: "please Enter Correct password"
    })
    const [showError, setShowError] = React.useState({ email: false, password: false })

    const handleChangeText = (key, value) => {
        // const {key , value}=data
        setuserInfo(prevState => ({ ...prevState, [key]: value }))
    }
    const handleSubmit = () => {
        const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (userInfo.email.length > -1 && userInfo.password.length > -1) {
            if (regex.test(userInfo.email) == false && userInfo.password.length < 4) {
                setShowError({
                    email: true,
                    password: true
                })
            } else {
                if (regex.test(userInfo.email) == false) {
                    setShowError({
                        email: true,
                        password: false
                    })
                } else if (userInfo.password.length < 4) {
                    setShowError({
                        email: false,
                        password: true
                    })
                } else {
                    alert(JSON.stringify(userInfo))
                    setShowError({
                        email: false,
                        password: false
                    })
                }
            }

        } else {
            setShowError({
                email: true,
                password: true
            })
        }

    }
    return (
        <ScrollView style={{ flex: 1, backgroundColor: colors.bground, ...style }}>
            <View style={[styles.container, { ...style,backgroundColor:colors.bground }]}>
                <StatusBar backgroundColor={colors.primary} />
                <View style={styles.boxTitles}>
                    <Text style={[styles.titles,{color:colors.txt}]}>Hello!</Text>
                    <Text style={[styles.titles,{color:colors.txt}]}>SignUp To get Started</Text>
                </View>

                <Textinputs name="Email" onChange={(value) => handleChangeText("email", value)} />
                {showError.email && (<View style={styles.boxError}><Text style={{color:colors.red}}>{userError.email}</Text></View>)}
                <Textinputs name="Password" onChange={(value) => handleChangeText("password", value)} />
                {showError.password && (<View style={styles.boxError}><Text style={{color:colors.red}}>{userError.password}</Text></View>)}
                <ButtonAuth title="Sign Up" onPress={() => handleSubmit()} />

                <View style={styles.boxSignInTitle}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("SignUp")}
                    >
                        <Text style={[styles.signInTitle,{color:colors.txt}]}>SignUp</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </ScrollView>
    )
}

export default SignIn

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: "100%",
        // backgroundColor: colors.txt,
        paddingTop: 10,
    },
    boxTitles: {
        width: "40%",
        margin: "5%"
    },
    titles: {
        fontSize: 25,
        letterSpacing: 1,
        // color: colors.primary,
        fontFamily: "serif",
        fontWeight: "900",
        marginTop: 8
    },
    signInTitle: {
        textDecorationLine: "underline",
        // color: colors.primary,
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