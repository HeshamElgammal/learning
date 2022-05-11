import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
// import colors from "../constants/index"
import { Dcolors } from "../constants/index"
import AntDesign from "react-native-vector-icons/AntDesign"
import { FlatList, ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
//import CountDown to show the timer
import CountDown from 'react-native-countdown-component';

//import moment to help you play with date and time
import moment from 'moment';
import { useTheme } from 'react-native-paper'
const QuizDetails = ({ navigation, route }) => {

    const { colors } = useTheme()
    const [quiz, setQuiz] = useState(route.params.quiz)
    const [refresh, setRefresh] = useState(false)
    const handleShowAns = () => {
        let newArray = route.params.quiz
        for (let i = 0; i < route.params.quiz; i++) {
            newArray[i].showAns = false
        }
        setQuiz(newArray)
    }

    useEffect(() => {
        handleShowAns()

    }, [])

    const [minutes, setMinutes] = useState(route.params.timer);
    const [seconds, setSeconds] = useState(0);
    useEffect(() => {
        let myInterval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    navigation.navigate("Quizes")
                    clearInterval(myInterval)
                } else {
                    setMinutes(minutes - 1);
                    setSeconds(59);
                }
            }
        }, 1000)
        return () => {
            clearInterval(myInterval);
        };
    });

    return (
        <ScrollView
            scrollEventThrottle={16}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ flex: 1 }}
        >
            <View style={{
                flexGrow: 1,
                flexShrink: 1,
                backgroundColor: colors.bground,
                paddingVertical: 10
            }}>
                <FlatList
                    data={quiz}
                    contentContainerStyle={{
                        width: "100%",
                    }}
                    extraData={refresh}
                    renderItem={({ item, index }) => {
                        return (
                            <>
                                <View style={[styles.box,{backgroundColor:colors.button}]}>
                                    {item.imgQ && <Image
                                        source={{ uri: item.imgQ }}
                                        style={{ width: "100%", height: 400 }}
                                        resizeMode="contain"
                                    />}
                                    <Text style={[styles.titles,{color:colors.btnTxt}]}>{item.qustion}</Text>
                                    {
                                        item.answers.map((itemAns, indexAns) => {
                                            return (
                                                !item.showAns ? (<TouchableOpacity style={[styles.btnAns, {
                                                    backgroundColor: item.showAns ? item.correctAnswer == itemAns ? "#76B947" : "#f3f3f3" &&
                                                        (item.selectedAns == itemAns) ? itemAns != item.correctAnswer ? "#e00" : "#76B947" : "#f3f3f3" : "#f3f3f3",
                                                        borderColor:colors.primary
                                                }]}
                                                    onPress={() => {
                                                        let newArray = quiz
                                                        newArray[index].selectedAns = itemAns
                                                        newArray[index].showAns = true
                                                        // setQuiz(prev => ({ ...prev, [item.selectedAns]: itemAns }))
                                                        setQuiz(newArray)
                                                        setRefresh(!refresh)
                                                        console.log(JSON.stringify(quiz))
                                                    }}
                                                >
                                                    <Text style={{ color: colors.primary }}>{itemAns}</Text>
                                                </TouchableOpacity>) :
                                                    <View style={[styles.btnAns, {
                                                        backgroundColor: item.showAns ? item.correctAnswer == itemAns ? "#76B947" : "#f3f3f3" &&
                                                            (item.selectedAns == itemAns) ? itemAns != item.correctAnswer ? "#e00" : "#76B947" : "#f3f3f3" : "#f3f3f3"
                                                    }]}>
                                                        <Text style={{ color: colors.primary }}>{itemAns}</Text>
                                                    </View>)
                                        })

                                    }
                                </View>
                            </>
                        )
                    }}
                />
                <View style={{
                    position: "absolute",
                    top: "0%",
                    padding: 10,
                    scale: 0.5,
                    backgroundColor: colors.button,
                    right: 0
                }}>
                    <Text style={{
                        color: colors.btnTxt,
                        fontSize: 18
                    }}>{minutes + " : " + seconds}</Text>

                </View>
            </View>
        </ScrollView >
    )
}

export default QuizDetails

const styles = StyleSheet.create({
    titles: {
        fontSize: 18,
        fontWeight: "900",
        fontFamily: "serif",
        marginHorizontal: 5,
        marginBottom: 5
    },
    box: {
        width: "90%",
        
        marginTop: 20,
        padding: 10,
        paddingVertical: 20,
        borderRadius: 10,
        elevation: 5,
        alignSelf: "center",
        // shadowColor: colors.primary,
        // shadowOffset: {
        //     width: 5,
        //     height: 5
        // }
    },
    boxTimer: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center"
    },
    btnAns: {
        width: "100%",
        minHeight: 50,
        backgroundColor: "#f3f3f3",
        marginVertical: 10,
        paddingHorizontal: 5,
        justifyContent: "center",
        borderRadius: 5,
        elevation: 5,
        borderWidth: .3,
        shadowOffset: {
            width: 5,
            height: 5
        }
    }

})