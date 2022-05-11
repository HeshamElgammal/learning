import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'

import {Dcolors} from"../constants/index"
import AntDesign from "react-native-vector-icons/AntDesign"
import { FlatList, ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { useTranslation } from 'react-i18next'
import { useTheme } from 'react-native-paper'
const Quizes = ({ navigation }) => {
    const {colors}=useTheme()
    const {i18n}=useTranslation()
    const [quizes, setQuizes] = useState([{
        quizId: 1,
        quizName: "quiz 1",
        timer: 1,
        show: true,
        quiz: [
            {
                qustion: "what's your name ?",
                answers: [
                    "hesham",
                    "ahmed",
                    "sayed"
                ],
                correctAnswer: "hesham",
                selectedAns:""
            },
            {
                qustion: "what's your age ?",
                answers: [
                    14,
                    12,
                    20,
                    25
                ],
                correctAnswer: 20,
                selectedAns:""
            },
            {
                qustion: "where are u born ?",
                imgQ:"https://js.devexpress.com/Content/images/doc/19_2/PhoneJS/person1.png",
                answers: [
                    "egypt",
                    "england",
                ],
                correctAnswer: "egypt",
                selectedAns:""
            }
        ]
    }, {
        quizId: 2,
        quizName: "quiz 2",
        show: true,
        timer: 50,
        quiz: [
            {
                qustion: "what's your name ?",
                answers: [
                    "hesham",
                    "ahmed",
                    "sayed"
                ],
                correctAnswer: "hesham",
                selectedAns:""
            },
            {
                qustion: "what's your age ?",
                answers: [
                    14,
                    12,
                    20,
                    25
                ],
                correctAnswer: 20,
                selectedAns:""
            },
            {
                qustion: "where are u born ?",
                answers: [
                    "egypt",
                    "england",
                ],
                correctAnswer: "egypt",
                selectedAns:""
            }
        ]
    }, {
        quizId: 3,
        quizName: "quiz 3",
        show: true,
        timer: 30,
        quiz: [
            {
                qustion: "what's your name ?",
                answers: [
                    "hesham",
                    "ahmed",
                    "sayed"
                ],
                correctAnswer: "hesham",
                selectedAns:""
            },
            {
                qustion: "what's your age ?",
                answers: [
                    14,
                    12,
                    20,
                    25
                ],
                correctAnswer: 20,
                selectedAns:""
            },
            {
                qustion: "where are u born ?",
                answers: [
                    "egypt",
                    "england",
                ],
                correctAnswer: "egypt",
                selectedAns:""
            }
        ]
    }])
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
                    data={quizes}
                    contentContainerStyle={{
                        width: "100%",
                    }}
                    renderItem={({ item, index }) => {
                        return (
                            <>
                                <TouchableOpacity style={[styles.btn,{backgroundColor:colors.button}]}
                                    onPress={() => {
                                        navigation.navigate("QuizDetails", {
                                            quiz: item.quiz,
                                            timer: item.timer,
                                            name:item.quizName
                                        })
                                    }}
                                >
                                    <Text style={[styles.titles,{color:colors.btnTxt}]}>{item.quizName}</Text>
                                    <View style={[styles.boxTimer,{justifyContent:i18n.language=="en"?"flex-end":"flex-start"}]}>
                                        <AntDesign name="dashboard" color={colors.btnTxt} size={20} style={{ marginHorizontal: 5 }} />
                                        <Text style={{color:colors.btnTxt}}>{item.timer.toFixed(2)}</Text>
                                    </View>
                                </TouchableOpacity>
                            </>
                        )
                    }}
                />
            </View>
        </ScrollView>
    )
}

export default Quizes

const styles = StyleSheet.create({
    titles: {
        fontSize: 20,
        fontWeight: "900",
        fontFamily: "serif",
        marginHorizontal: 20,
    },
    btn: {
        width: "90%",
        
        marginTop: 20,
        padding: 10,
        paddingVertical: 20,
        borderRadius: 10,
        elevation: 5,

        shadowOffset: {
            width: 5,
            height: 5
        },
        alignSelf: "center"
    },
    boxTimer: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        
    }

})