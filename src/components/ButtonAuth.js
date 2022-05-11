import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { useTheme } from 'react-native-paper'
import {Dcolors} from"../constants/index"

const ButtonAuth = (props) => {
    const {colors}=useTheme()
    // const [input, setInput] = React.useState('')
    React.useEffect(() => {
        console.log(JSON.stringify(props))
    }, [])
    return (
        <>
            <TouchableOpacity style={[styles.container,{
                 borderColor: colors.black,
                 color: colors.btnTxt,
                 shadowColor: colors.primary,
                 backgroundColor:colors.button
            }]}
                onPress={props.onPress}
            >
                <Text style={[styles.titles,{color:colors.btnTxt}]}>{props.title}</Text>
            </TouchableOpacity>
        </>
    )
}

export default ButtonAuth

const styles = StyleSheet.create({
    container: {
        width: "90%",
        height: 55,
        paddingHorizontal: "3%",
        borderWidth: .7,    
        borderRadius: 10,
        elevation: 5,
        shadowOffset: {
            width: 4,
            height: 4
        },
        alignSelf: "center",
        marginVertical: "3%",
        alignItems: "center",
        justifyContent: "center"
    }
    , titles: {
        fontSize: 18,
        letterSpacing: 1,
        fontFamily: "serif",
        fontWeight: "900",
    }
})