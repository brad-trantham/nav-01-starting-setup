import React from 'react'
import { Platform } from 'react-native'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { Ionicons } from '@expo/vector-icons'

import Colors from '../constants/Colors'

import CategoriesScreen from '../screens/CategoriesScreen'
import CategoryMealsScreen from '../screens/CategoryMealsScreen'
import MealDetailScreen from '../screens/MealDetailScreen'
import FavoritesScreen from '../screens/FavoritesScreen'

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

const MealsFavTabNavigator = createBottomTabNavigator({
    Meals: { screen: MealsNavigator,
             navigationOptions: {
                 tabBarIcon: (tabInfo) => {
                     return <Ionicons name='ios-restaurant' size={25} color={tabInfo.tintColor} />
                 }
             }},
    Favorites: { screen: FavoritesScreen,
                 navigationOptions: {
                    tabBarIcon: (tabInfo) => {
                        return <Ionicons name='ios-star' size={25} color={tabInfo.tintColor} />
                    }
                 }}
}, {
    tabBarOptions: {
        activeTintColor: Colors.accent
    }
})

export default createAppContainer(MealsFavTabNavigator)