import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

export default function PromoCard({promo}){
    let navigate = useNavigation()
    let route = useRoute()
    
    let handleNavigation = () => {
        if (route.name == "Home") return navigate.navigate("Promo")
        else return navigate.navigate("Promo Detail Page", { id: promo.id })
    }

    return (
        <TouchableOpacity onPress={handleNavigation}>
            <View style={styles.outerCard}>
                <View style={styles.innerCard}>
                    <View style={styles.header} >
                        <Text style={styles.promoTitle}>{promo.name}</Text>
                        <Image
                            style={styles.promoImage}
                            source={{ uri: promo.image }}
                            resizeMode="contain"
                        />
                    </View>
                    <View style={styles.content} >
                        <Text numberOfLines={2}>{promo.caption}</Text>
                    </View>
                    <View style={styles.footer}>
                        <Text> Expired: {new Date(promo.expired).toDateString()}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    outerCard: {
        backgroundColor: "white",
        padding: 5,
        margin: 10,
        borderRadius: 15,
    },
    innerCard: {
        backgroundColor: "white",
        padding: 5,
        margin: 10,
    },
    header: {
        height: 200,
        justifyContent: "center",
        alignItems: "center",
    },
    promoTitle: { marginTop: 30, fontWeight: 'bold', fontSize: 15 },
    promoImage: { width: "100%", height: "100%" },
    content: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20
    },
    footer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10
    }
});