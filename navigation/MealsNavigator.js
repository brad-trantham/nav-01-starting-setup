import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import CategoriesScreen from '../screens/CategoriesScreen'
import CategoryMealsScreen from '../screens/CategoryMealsScreen'
import MealDetailScreen from '../screens/MealDetailScreen'

const MealsNavigator = createStackNavigator({
    // short form
    Categories: CategoriesScreen,
    // long form (allows for more configuration)
    CategoryMeals: {screen: CategoryMealsScreen},
    MealDetail: MealDetailScreen
})

export default createAppContainer(MealsNavigator)