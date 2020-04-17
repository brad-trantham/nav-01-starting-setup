import React from 'react'

import { CATEGORIES, MEALS } from '../data/dummy-data'
import MealList from '../components/MealList'

const CategoryMealsScreen = props => {
    const catId = props.navigation.getParam('categoryId')
    const selectedCategory = CATEGORIES.find(cat => cat.id === catId)

    const displayedMeals = MEALS.filter(meal => meal.categoryIds.indexOf(catId) >= 0)

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

export default CategoryMealsScreen