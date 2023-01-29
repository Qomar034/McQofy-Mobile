import { StyleSheet, Text, View, FlatList } from "react-native";
import FoodCard from "./FoodCard";

export default function FoodCategory({ category, food }) {
    const renderItem = ({ item }) => (
        <FoodCard food={item} />
      );
    return (
        <View style={{width: '100%'}}>
            <View style={styles.headerContainer}>
                <Text style={styles.sectionTitle}> {category.name} </Text>
            </View>
            <FlatList data={food.filter(el => el.categoryId == category.id)} renderItem={renderItem} keyExtractor={(item) => item.id} />
        </View>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        marginTop: 10,
        flex: 1,
        alignItems: "center",
    },
    sectionTitle: {
        color: "white",
        fontSize: 35,
        fontWeight: "400",
        textDecorationLine: "underline",
    },
});