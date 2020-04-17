import React from 'react'
import { Platform, Text } from 'react-native'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { Ionicons } from '@expo/vector-icons'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import { createDrawerNavigator } from 'react-navigation-drawer'

import Colors from '../constants/Colors'

import CategoriesScreen from '../screens/CategoriesScreen'
import CategoryMealsScreen from '../screens/CategoryMealsScreen'
import MealDetailScreen from '../screens/MealDetailScreen'
import FavoritesScreen from '../screens/FavoritesScreen'
import FiltersScreen from '../screens/FiltersScreen'

const defaultStackNavOptions = {
    // when options are configured in multiple locations, the more specific
    // (component) overrides the more generic (navigator)
    // if there are any conflicts
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
        },
        headerTitleStyle: {
            fontFamily: 'open-sans-bold'
        },
        headerBackTitleStyle: {
            fontFamily: 'open-sans'
        },
        headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
    }
}

const MealsNavigator = createStackNavigator({
    Categories: {
        screen: CategoriesScreen},        
    CategoryMeals: {
        screen: CategoryMealsScreen},        
    MealDetail: MealDetailScreen
}, defaultStackNavOptions
)

const FavNavigator = createStackNavigator({
    Favorites: FavoritesScreen,
    MealDetail: MealDetailScreen
}, defaultStackNavOptions)

const tabScreenConfig = {
    Meals: { screen: MealsNavigator,
             navigationOptions: {
                 tabBarIcon: (tabInfo) => {
                     return <Ionicons name='ios-restaurant' size={25} color={tabInfo.tintColor} />
                 },
                 // tabBarColor is only used when shifting === true
                 // if shifting is false, use a barStyle property to set a background color
                 // (end of lecture 132)
                 tabBarColor: Colors.primary,
                 tabBarLabel: Platform.OS === 'android' ? <Text style={{fontFamily: 'open-sans-bold'}}>Meals</Text> : 'Meals'
             }},
    Favorites: { screen: FavNavigator,
                 navigationOptions: {
                    tabBarIcon: (tabInfo) => {
                        return <Ionicons name='ios-star' size={25} color={tabInfo.tintColor} />
                    },
                    tabBarColor: Colors.accent,
                    tabBarLabel: Platform.OS === 'android' ? <Text style={{fontFamily: 'open-sans-bold'}}>Favorites</Text> : 'Favorites'
                 }}
}

const MealsFavTabNavigator = Platform.OS === 'android' 
? createMaterialBottomTabNavigator(tabScreenConfig, {
    activeColor: 'white',
    shifting: true
}) 
: createBottomTabNavigator(tabScreenConfig, {
    tabBarOptions: {
        activeTintColor: Colors.accent,
        labelStyle: {
            fontFamily: 'open-sans-bold'
        }
    }
})

const FiltersNavigator = createStackNavigator({
    Filters : FiltersScreen
}, 
   
//     navigationOptions: {
//     drawerLabel: 'Filters!'
// },
    defaultStackNavOptions
)

const MainNavigator = createDrawerNavigator({
    MealsFavs: {screen: MealsFavTabNavigator,
                navigationOptions: {
                    drawerLabel: 'Meals'
                }},
    Filters: FiltersNavigator
}, {
    contentOptions: {
        activeTintColor: Colors.accent,
        labelStyle: {
            fontFamily: 'open-sans-bold'
        }
    }
})

export default createAppContainer(MainNavigator)