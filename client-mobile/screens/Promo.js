import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, FlatList, } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useQuery } from "@apollo/client";
import { GET_PROMOS } from "../queries/public";

import Loader from "../components/Loader";
import PromoCard from "../components/PromoCard";

export default function Promo() {
    let { loading, error, data } = useQuery(GET_PROMOS)

    const renderItem = ({ item }) => ( <PromoCard promo={item} /> );

    if (loading) return (<Loader/>)
    else return (
        <SafeAreaView style={styles.container}>
            <View>
                <FlatList data={data.showPromos} renderItem={renderItem} keyExtractor={(item) => item.id} ListFooterComponent={<View style={styles.bottomSpacer}></View>} />
                
            </View>
            <StatusBar style="auto" />
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
    bottomSpacer: {
        flex: 1,
        margin: 50,
        padding: 20
    },
});