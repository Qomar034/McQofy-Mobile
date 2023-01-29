import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

export default function FoodCard({ food }){
    let navigate = useNavigation()
    
    return (
        <TouchableOpacity onPress={() => navigate.navigate("Food Detail Page", { slug: food.slug })}>
            <View style={styles.outerCard}>
                <View style={styles.innerCard}>
                    <View style={styles.header} >
                        <Text style={styles.foodTitle}>{food.name}</Text>
                        <Image
                            style={styles.foodImage}
                            source={{ uri: food.imgUrl }}
                            resizeMode="contain"
                        />
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    outerCard: {
        alignSelf: 'center',
        backgroundColor: "white",
        padding: 5,
        margin: 10,
        borderRadius: 15,
        width: 300,
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
    foodTitle: { marginTop: 5, fontWeight: 'bold', fontSize: 15 },
    foodImage: { width: "100%", height: "100%" },
});