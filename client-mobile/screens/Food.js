import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, FlatList} from "react-native";

import { useQuery } from "@apollo/client";
import { GET_FOODS, GET_CATEGORIES } from "../queries/public";

import FoodCategory from "../components/FoodCategory";
import Loader from "../components/Loader";

export default function Food() {
    let { loading: categoryLoad, error: categoryError, data: categoryData } = useQuery(GET_CATEGORIES)
    let { loading: foodLoad, error: foodError, data: foodData } = useQuery(GET_FOODS)
    
    const renderItem = ({ item }, food) => ( <FoodCategory category={item} food={food} /> );

    if (categoryLoad || foodLoad) return (<Loader/>)
    else return (
        <View style={styles.container}>
            <View style={{width: '100%'}}>
                <FlatList data={categoryData.showCategories} renderItem={(item) => renderItem(item, foodData.showItems)} keyExtractor={(item) => item.id} extraData={foodData.showItems} ListFooterComponent={<View style={styles.bottomSpacer}></View>}/>
            </View>
            <StatusBar style="auto" />
        </View>
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
        padding: 20,
        margin: 50,
    },
});