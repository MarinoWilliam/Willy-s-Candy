export enum CATEGORIES_ACTION_TYPES {
    FETCH_CATEGORIES_START= 'category/FETCH_CATEGORIES_START',
    FETCH_CATEGORIES_SUCSESS= 'category/FETCH_CATEGORIES_SUCSESS',
    FETCH_CATEGORIES_FAIL= 'category/FETCH_CATEGORIES_FAIL',
}

export type CategoryItem = {
    id:number;
    imageUrl:string;
    name:string;
    price:number;
}

export type Category={
    title:string;
    imageUrl:string;
    items:CategoryItem[];
}

export type CategoryMap={
    [key:string]:CategoryItem[]
}






