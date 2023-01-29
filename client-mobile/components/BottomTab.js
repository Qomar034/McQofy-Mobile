import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { StyleSheet, View, Image, Text } from "react-native"
import Landing from "../screens/Landing"

import { PromoScreen, FoodScreen } from "../components/StackedScreen"
const Tab = createBottomTabNavigator()

export default BottomTab = () => {
    return (
        <Tab.Navigator initialRouteName="Home" screenOptions={({route}) => ({
            tabBarIcon: ({color, focused, size}) => tabIconFunc(route.name, focused),
            ...containerTab,
        })}>
            <Tab.Screen name="Promo" component={ PromoScreen } />
            <Tab.Screen name="Home" component={ Landing } />
            <Tab.Screen name="Food" component={ FoodScreen } />
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    mainTab: {
        position: 'absolute',
        bottom: 15,
        left: 20,
        right: 20,
        elevation: 20,
        backgroundColor: 'white',
        borderRadius: 15,
        height: 90,
    },
    shadow: {
        shadowColor: '#7F5DF0',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5,
    },
    iconTab: {alignItems: 'center', justifyContent: 'center', top: 5,},
    imageTab: {width: 35, height: 35, tintColor: 'grey'},
    activeImageTab: {width: 35, height: 35},
    labelTab: { color: 'grey', fontSize: 15},
    activeLabelTab: { color: 'red', fontSize: 15},
})

const tabIconFunc = (path, focused) => {
    let source; let name;

    if (path == 'Home') {source = require('../assets/Icon/home.png'); name = 'Home'}
    if (path == 'Promo') {source = require('../assets/Icon/discount.png'); name = "Promo"}
    if (path == 'Food') {source = require('../assets/Icon/food.png'); name = "Food"}

    return (<View style={styles.iconTab} >
        <Image 
            source={source}
            resizeMode='contain'
            style={ focused ? styles.activeImageTab : styles.imageTab } />
        <Text style={focused ? styles.activeLabelTab : styles.labelTab}>{name}</Text>
    </View>)
}

const containerTab = {
    tabBarActiveTintColor: "#2563eb",
    tabBarInactiveTintColor: "#94a3b8",
    tabBarShowLabel: false,
    tabBarStyle: styles.mainTab,
    headerShown: false,
}