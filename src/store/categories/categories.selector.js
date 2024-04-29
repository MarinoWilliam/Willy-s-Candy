import { createSelector } from "reselect";

const categoriesReducerSelector = (state) => {
    return state.categories
}

export const selectCategories = createSelector(
    [categoriesReducerSelector],
    (categoriesSlice) => categoriesSlice.categories
)

export const selectCategoriesMap = createSelector(
    [selectCategories],
    (categories) => 
    categories.reduce((acc, category) => {
        const { title, items } = category
        acc[title.toLowerCase()] = items;
        return acc;
    }, {})
)

export const selectCategoriesIsLoading= createSelector(
    [categoriesReducerSelector],
    (categoriesSlice) => categoriesSlice.isLoading
)


