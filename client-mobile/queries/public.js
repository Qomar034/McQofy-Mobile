import { gql } from "@apollo/client";

export const GET_HIGHLIGHTS = gql`
    query ShowHighlights {
        showHighlights {
            id
            name
            caption
            image
            expired
        }
    }
`

export const GET_PROMOS = gql`
    query Query {
        showPromos {
        id
        name
        image
        caption
        expired
        }
    }
`

export const GET_FOODS = gql`
    query Query {
        showItems {
            id
            name
            slug
            imgUrl
            categoryId
        }
    }
`

export const GET_CATEGORIES = gql`
    query Query {
        showCategories {
            id
            name
        }
    }
`

export const GET_DETAIL_PROMO = gql`
    query Query($getPromoId: ID) {
        getPromo(id: $getPromoId) {
            id
            name
            image
            caption
            description
            expired
        }
    }
`

export const GET_DETAIL_FOOD = gql`
    query Query($slug: String) {
        getItem(slug: $slug) {
            id
            name
            imgUrl
            price
            description
            User {
                email
            }
            Category {
                id
                name
            }
            Ingredients {
                id
                name
            }
        }
    }
`