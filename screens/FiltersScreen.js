import React, { useState, useEffect, useCallback } from 'react'
import {View, Text, StyleSheet, Switch, Platform} from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import {useDispatch} from 'react-redux'

import HeaderButton from '../components/HeaderButton'
import Colors from '../constants/Colors'
import {setFilters} from '../store/actions/meals'

const FilterSwitch = props => {
    return (
    <View style={styles.filterContainer}>
        <Text>{props.label}</Text>
        <Switch value={props.state} onValueChange={props.onChange} 
                trackColor={{true: Colors.primary}} thumbColor={Platform.OS === 'android' ? Colors.primary: ''}/>
    </View>)
}

const FiltersScreen = props => {
    const {navigation} = props
    const [isGlutenFree, setIsGlutenFree] = useState(false)
    const [isLactoseFree, setIsLactoseFree] = useState(false)
    const [isVegan, setIsVegan] = useState(false)
    const [isVegetarian, setIsVegetarian] = useState(false)

    const dispatch = useDispatch()

    // useCallback ensure this function isn't
    // recreated unnceccsarily
    const saveFilters = useCallback(() => {
        const appliedFilters = {
            glutenFree: isGlutenFree,
            lactoseFree: isLactoseFree,
            vegan: isVegan,
            vegetarian: isVegetarian
        }

        dispatch(setFilters(appliedFilters))
    }, [isGlutenFree, isLactoseFree, isVegan, isVegetarian, dispatch])

    useEffect(() => {
        navigation.setParams({save: saveFilters})
    }, 
    // adding saveFilters as a dependency here ensures that this only
    // triggers when saveFilters changes    
    [saveFilters])

    return(
        <View style={styles.screen}>
            <Text style={styles.title}>Available Filters / Restrictions</Text>
            <FilterSwitch label='Gluten free' state={isGlutenFree} onChange={newValue => {setIsGlutenFree(newValue)}}/>
            <FilterSwitch label='Lactose free' state={isLactoseFree} onChange={newValue => {setIsLactoseFree(newValue)}}/>
            <FilterSwitch label='Vegan' state={isVegan} onChange={newValue => {setIsVegan(newValue)}}/>
            <FilterSwitch label='Vegetarian' state={isVegetarian} onChange={newValue => {setIsVegetarian(newValue)}}/>
        </View>
    )
}

FiltersScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'Filter Meals',
        headerLeft: () => (<HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title="Menu" iconName="ios-menu" onPress={()=>{
                navData.navigation.toggleDrawer()
            }}/>
        </HeaderButtons>),
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title="Save" iconName="ios-save" onPress={
                // we have to pass the function through the navigation params
                // because the save is being triggered by the navigation element,
                // not the component
                // also note that we don't use the anonymous function notation
                // here because we actually want to run the function
                navData.navigation.getParam('save')
            }/>
        </HeaderButtons>
        )
    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center'
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '80%',
        marginVertical: 15
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 22,
        margin: 20,
        textAlign: 'center'
    }
})

export default FiltersScreen