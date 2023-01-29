import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useQuery } from "@apollo/client";
import { GET_HIGHLIGHTS } from "../queries/public";

import Loader from "../components/Loader";
import PromoCard from "../components/PromoCard";

export default function Landing() {
    let { loading, error, data } = useQuery(GET_HIGHLIGHTS)

    if (loading) return (<Loader/>)
    else return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.headerContainer}>
                    <Text style={styles.title} >
                        Welcome to McQofy
                    </Text>
                    <Image
                        style={styles.image}
                        source={{ uri: "https://ik.imagekit.io/marQofy034/JEMA_BRY_1710-02.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1670863821889" }}
                        resizeMode="contain"
                    />
                </View>
                <View style={styles.headerContainer}>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={() => { }} style={styles.buttonStyle}>
                            <View style={styles.buttonFill}>
                                <Text style={styles.buttonText}> Login </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { }} style={styles.buttonStyle}>
                            <View style={styles.buttonFill}>
                                <Text style={styles.buttonText}> Register </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.headerContainer}>
                    <Text style={styles.sectionTitle} > Highlights </Text>
                </View>
                <View>
                    {data.showHighlights.map((el, i) => {
                        return (
                            <PromoCard key={el.id} promo={el} />
                        );
                    })}
                    <View style={styles.bottomSpacer}></View>
                </View>
                <StatusBar style="auto" />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "tomato",
        alignItems: "center",
        justifyContent: "center",
    },
    headerContainer: {
        marginTop: 10,
        flex: 1,
        alignItems: "center",
    },
    title: {
        color: "white",
        margin: 10,
        fontSize: 30,
        fontWeight: "bold",
        fontFamily: "sans-serif",
    },
    image: { width: 350, height: 250 },
    bottomSpacer: {
        flex: 1,
        padding: 20,
        margin: 50,
    },
    sectionTitle: {
        color: "white",
        fontSize: 35,
        fontWeight: "400",
        textDecorationLine: "underline",
    },

    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10,
    },
    buttonStyle: { padding: 10, },
    buttonFill: {
        width: 100,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        padding: 5,
        borderRadius: 35,
        backgroundColor: "white",
    },
    buttonText: { color: "black", margin: 10, fontWeight: "bold" },
});
