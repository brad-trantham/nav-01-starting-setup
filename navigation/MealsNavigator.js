import { Platform } from 'react-native'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import Colors from '../constants/Colors'

import CategoriesScreen from '../screens/CategoriesScreen'
import CategoryMealsScreen from '../screens/CategoryMealsScreen'
import MealDetailScreen from '../screens/MealDetailScreen'

const MealsNavigator = createStackNavigator({
    Categories: {
        screen: CategoriesScreen},        
    CategoryMeals: {
        screen: CategoryMealsScreen},        
    MealDetail: MealDetailScreen
}, 
{
    // when options are configured in multiple locations, the more specific
    // (component) overrides the more generic (navigator)
    // if there are any conflicts
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
        },
        headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
    }
})

export default createAppContainer(MealsNavigator)