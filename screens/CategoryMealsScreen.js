import React from 'react'
import {View, Text, Button, StyleSheet} from 'react-native'

import { CATEGORIES } from '../data/dummy-data'

const CategoryMealsScreen = props => {
    const catId = props.navigation.getParam('categoryId')
    const selectedCategory = CATEGORIES.find(cat => cat.id === catId)

    return(
        <View style={styles.screen}>
            <Text>The Category Meals Screen!</Text>
            <Text>{selectedCategory.title}</Text>
            <Button title="Go to Details" onPress={() =>
                // you can also use navigation.push(), which can be handy 
                // for something like directory navigation when you need
                // to push the same screen with different content
                props.navigation.navigate({routeName: 'MealDetail'})
            }/>
            <Button title="Go Back" onPress={() => {
                // navigation.pop() also works the same in a stacknavigator
                // goBack() is more universal when you start using other
                // navigators
                props.navigation.goBack()
            }}/>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default CategoryMealsScreen