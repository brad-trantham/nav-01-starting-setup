import { MEALS } from '../../data/dummy-data'

const initialState = {
    meals: MEALS,
    filteredMeals: MEALS,
    favoriteMeals: []
}

// args: state - current state snapshot
// args: action - the action that was dispatched to the reducer
// the initialState is supplied as a default value for when redux starts up
const mealsReducer = (state = initialState, action) => {
    return state
}

export default mealsReducer