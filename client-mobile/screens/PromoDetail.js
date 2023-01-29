import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, ScrollView, } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useQuery } from "@apollo/client";
import { GET_DETAIL_PROMO } from "../queries/public";

import Loader from "../components/Loader";

export default function PromoDetail({ route, navigation }) {
    let { id } = route.params
    let { loading, error, data } = useQuery(GET_DETAIL_PROMO, { variables: { "getPromoId": id } } )

    if (loading) return (<Loader />)
    else return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
            <View style={styles.headerContainer}>
                    <Text style={styles.title}> {data.getPromo.name} </Text>
                </View>
                <View style={styles.innerCard}>
                    <View style={styles.header} >
                        <Image
                            style={styles.promoImage}
                            source={{ uri: data.getPromo.image }}
                            resizeMode="cover"
                        />
                    </View>
                    <View style={styles.content} >
                        <Text style={styles.captionText}>{data.getPromo.caption}</Text>
                    </View>
                </View>
                
                <View style={styles.descriptionContainer}>
                    <Text style={styles.descriptionTitle}>Description</Text>
                    <Text style={styles.descriptionText}>{data.getPromo.description}</Text>
                </View>
                <View style={styles.footerContainer}>
                    <Text style={styles.footer}> Expired: {new Date(data.getPromo.expired).toDateString()}</Text>
                </View>
                <View style={styles.bottomSpacer}>
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
        margin: 10,
        alignItems: "center",
    },
    title: {
        color: "white",
        fontSize: 35,
        fontWeight: "500",
    },

    bottomSpacer: {
        flex: 1,
        padding: 20,
        margin: 50,
    },

    captionText: {
        color: 'white',
        fontSize: 20,
        textAlign: 'justify',
        marginHorizontal: 5,
    },
    descriptionContainer: {
        flex: 5,
        justifyContent: "center",
        alignItems: "center",
    },
    descriptionTitle: {
        color: "white",
        fontSize: 25,
        fontWeight: "400",
        backgroundColor: '#FFAA96',
        paddingHorizontal: 45,
        paddingVertical: 5,
        borderRadius: 15
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
    footer: { borderRadius: 15, paddingHorizontal: 50, paddingVertical: 5, marginHo: 5, color: 'tomato', fontSize: 15, backgroundColor: 'white' },
    innerCard: {
        width: '100%'
    },
    header: {
        height: 200,
        justifyContent: "center",
        alignItems: "center",
    },
    promoImage: { width: "100%", height: "100%" },
    content: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
        marginBottom: 20,
        backgroundColor: 'tomato'
    },
    footer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
        backgroundColor: 'white',
        paddingHorizontal: 100,
        paddingVertical: 2,
        borderRadius: 50
    }
});
