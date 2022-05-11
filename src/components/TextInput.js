import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'
// import colors from"../constants/index"
import { useTheme } from 'react-native-paper'
import { Dcolors } from "../constants/index"

const Textinputs = (props) => {
    const { colors } = useTheme()
    const [input, setInput] = React.useState('')
    // React.useEffect(() => {
    //     console.log(JSON.stringify(props))
    // }, [])
    return (
        <>
            <TextInput style={[styles.container, {
                borderColor: colors.black,
                color: colors.btnTxt,
                shadowColor: colors.primary,
                backgroundColor:colors.button
            }]}
                placeholder={props.name}
                placeholderTextColor={colors.primary}
                onChangeText={props.onChange}
            />
        </>
    )
}

export default Textinputs

const styles = StyleSheet.create({
    container: {
        width: "90%",
        height: 55,
        paddingHorizontal: "3%",
        borderWidth: .7,
        borderRadius: 10,
        shadowOffset: {
            width: 4,
            height: 4
        },
        alignSelf: "center",
        marginVertical: "3%"
    }
})