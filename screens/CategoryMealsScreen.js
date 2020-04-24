import React from 'react'
import {View, StyleSheet} from 'react-native'
// you can also import connect but the syntax is more verbose
import { useSelector } from 'react-redux'

import { CATEGORIES } from '../data/dummy-data'
import MealList from '../components/MealList'
import DefaultText from '../components/DefaultText'

const CategoryMealsScreen = props => {
    const catId = props.navigation.getParam('categoryId')
    const selectedCategory = CATEGORIES.find(cat => cat.id === catId)

    const availableMeals = useSelector(state => state.meals.filteredMeals)

    const displayedMeals = availableMeals.filter(meal => meal.categoryIds.indexOf(catId) >= 0)

    if(displayedMeals.length === 0) {
        return <View style={styles.content}><DefaultText>No meals found with current filters</DefaultText></View>
    }

    return(
        // navigation is only available to screens directly loaded by the navigator,
        // not by subcomponents
        // here we forward it on so that subcomponent can access it
        <MealList listData={displayedMeals} navigation={props.navigation}/>
    )
}

// if navigationOptions is set to a function rather than a property
// then react native will automatically call that function for you
// with a navigationData parameter
CategoryMealsScreen.navigationOptions = navigationData => {
    const catId = navigationData.navigation.getParam('categoryId')
    const selectedCategory = CATEGORIES.find(cat => cat.id === catId)

    return {
        headerTitle: selectedCategory.title
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default CategoryMealsScreen