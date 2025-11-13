# shoppingCart / active
Cart has items, customer can continue shopping or checkout

Transitions:
- ADD_ITEM → active
- REMOVE_ITEM → active
- UPDATE_QUANTITY → active
- PROCEED_TO_CHECKOUT → checkout
- CLEAR_CART → empty
