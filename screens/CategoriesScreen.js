import React from 'react'
import {View, Text, Button, StyleSheet} from 'react-native'

const CategoriesScreen = props => {
    return(
        <View style={styles.screen}>
            <Text>The Categories Screen!</Text>
            <Button title="Go to Meals!" onPress={()=>{
                // alternatively props.navigation.navigate('CategoryMeals')
                //
                // you can also use navigation.replace() to change the screen,
                // but this replaces the root of the stack
                // Sometimes this is handy, like when you have a login
                // screen that you don't want to go back to
                props.navigation.navigate({routeName: 'CategoryMeals'})
            }} />
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

export default CategoriesScreen