import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, ScrollView, } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { formatCurrency } from "react-native-format-currency";

import { useQuery } from "@apollo/client";
import { GET_DETAIL_FOOD } from "../queries/public";

import Loader from "../components/Loader";

export default function FoodDetail({ route, navigation }) {
    let { slug } = route.params
    let { loading, error, data } = useQuery(GET_DETAIL_FOOD, { variables: { "slug": slug } } )

    if (loading) return (<Loader/>)
    else return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.headerContainer}>
                    <Text style={styles.title}> { data.getItem.name } </Text>
                </View>
                <View style={styles.imageContainer}>
                    <Image
                        style={{ width: "100%", height: "100%" }}
                        source={{ uri: data.getItem.imgUrl }}
                        resizeMode="contain"
                    />
                </View>
                <View style={styles.descriptionContainer}>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <Text style={styles.descriptionCategory}>{data.getItem.Category.name}</Text>
                        <Text style={styles.descriptionCategory}>{formatCurrency({ amount: Number(data.getItem.price), code: "IDR" })[0]}</Text>
                    </View>
                    <Text style={styles.descriptionText}>{data.getItem.description}</Text>
                </View>
                <View style={{flex:5}}>
                <Text style={styles.descriptionText}>Ingredients: </Text>
                    { data.getItem.Ingredients.map((el, i) => {
                        return (
                            <Text key={el.id} style={styles.descriptionCategory}>{++i}. {el.name}</Text>
                        ) }) }
                </View>
                <View style={styles.footerContainer}>
                    <Text style={styles.footer}> Added By: {data.getItem.User.email}</Text>
                </View>
                <View style={styles.bottomSpacer}></View>
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
    title: {
        color: "white",
        fontSize: 35,
        fontWeight: "500",
        textAlign: 'center',
    },
    bottomSpacer: {
        flex: 1,
        padding: 20,
        margin: 50,
    },
    imageContainer: {
        flex: 7,
        height: 300,
        justifyContent: "center",
        alignItems: "center",
    },
    descriptionContainer: {
        flex: 5,
        justifyContent: "center",
        alignItems: "center",
    },
    descriptionCategory: {
        margin: 5, 
        color: 'white', 
        fontSize: 20, 
        fontWeight: 'bold', 
        paddingHorizontal: 45, 
        paddingVertical: 10, 
        borderRadius: 30, 
        backgroundColor: '#FFAA96'
    },
    descriptionText: {
        margin: 5, 
        color: 'white', 
        fontSize: 25, 
        textAlign: 'justify',
        padding: 10, 
    },
    footerContainer: {
        flex: 3,
        justifyContent: "center",
        alignItems: "center",
    },
    footer: {borderRadius: 15, paddingHorizontal: 50, paddingVertical: 5, marginHo: 5, color: 'tomato', fontSize: 15, backgroundColor: 'white'},
});
