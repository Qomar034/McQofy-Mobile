import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Food from '../screens/Food';
import FoodDetail from '../screens/FoodDetail';
import Promo from '../screens/Promo';
import PromoDetail from '../screens/PromoDetail';

export function FoodScreen() {
  return (
    <Stack.Navigator>
          <Stack.Screen name='Foods Page' component={Food} />
          <Stack.Screen name='Food Detail Page' component={FoodDetail} />
    </Stack.Navigator>
  );
}

export function PromoScreen() {
    return (
      <Stack.Navigator>
            <Stack.Screen name='Promo Page' component={Promo} />
            <Stack.Screen name='Promo Detail Page' component={PromoDetail} />
      </Stack.Navigator>
    );
  }

const Stack = createNativeStackNavigator()