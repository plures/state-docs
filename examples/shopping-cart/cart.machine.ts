/**
 * Shopping Cart State Machine
 * 
 * This is a real-world example of an e-commerce shopping cart workflow.
 * The state machine manages the lifecycle of a shopping cart from empty
 * to completed purchase, including validation and payment processing.
 */

export interface CartContext {
  items: Array<{ id: string; name: string; price: number; quantity: number }>;
  total: number;
  shippingAddress?: {
    street: string;
    city: string;
    zipCode: string;
    country: string;
  };
  paymentMethod?: {
    type: 'credit_card' | 'paypal' | 'bank_transfer';
    last4?: string;
  };
  orderId?: string;
}

export type CartEvent =
  | { type: 'ADD_ITEM'; item: { id: string; name: string; price: number; quantity: number } }
  | { type: 'REMOVE_ITEM'; itemId: string }
  | { type: 'UPDATE_QUANTITY'; itemId: string; quantity: number }
  | { type: 'PROCEED_TO_CHECKOUT' }
  | { type: 'ADD_SHIPPING'; address: CartContext['shippingAddress'] }
  | { type: 'ADD_PAYMENT'; payment: CartContext['paymentMethod'] }
  | { type: 'SUBMIT_ORDER' }
  | { type: 'PAYMENT_SUCCESS'; orderId: string }
  | { type: 'PAYMENT_FAILED'; error: string }
  | { type: 'RETURN_TO_CART' }
  | { type: 'CLEAR_CART' };

/**
 * Shopping Cart State Machine Configuration
 * 
 * States:
 * - empty: No items in cart
 * - active: Cart has items, customer can continue shopping
 * - checkout: Customer is in checkout flow
 * - shipping: Collecting shipping information
 * - payment: Processing payment information
 * - processing: Order is being processed
 * - completed: Order successfully placed
 * - failed: Payment or order processing failed
 */
export const shoppingCartMachine = {
  id: 'shoppingCart',
  initial: 'empty',
  context: {
    items: [],
    total: 0,
  } as CartContext,
  states: {
    empty: {
      description: 'Cart is empty, awaiting first item',
      on: {
        ADD_ITEM: {
          target: 'active',
          description: 'Customer adds first item to cart',
        },
      },
    },
    active: {
      description: 'Cart has items, customer can continue shopping or checkout',
      on: {
        ADD_ITEM: {
          target: 'active',
          description: 'Customer adds another item',
        },
        REMOVE_ITEM: {
          target: 'active',
          description: 'Customer removes an item',
        },
        UPDATE_QUANTITY: {
          target: 'active',
          description: 'Customer updates item quantity',
        },
        PROCEED_TO_CHECKOUT: {
          target: 'checkout',
          description: 'Customer initiates checkout process',
        },
        CLEAR_CART: {
          target: 'empty',
          description: 'Customer empties the cart',
        },
      },
    },
    checkout: {
      description: 'Customer is in checkout process',
      initial: 'shipping',
      states: {
        shipping: {
          description: 'Collecting shipping address',
          on: {
            ADD_SHIPPING: {
              target: 'payment',
              description: 'Shipping address provided',
            },
            RETURN_TO_CART: {
              target: '#shoppingCart.active',
              description: 'Customer returns to cart',
            },
          },
        },
        payment: {
          description: 'Collecting payment information',
          on: {
            ADD_PAYMENT: {
              target: '#shoppingCart.processing',
              description: 'Payment method provided, submit order',
            },
            RETURN_TO_CART: {
              target: '#shoppingCart.active',
              description: 'Customer returns to cart',
            },
          },
        },
      },
    },
    processing: {
      description: 'Order is being validated and processed',
      on: {
        PAYMENT_SUCCESS: {
          target: 'completed',
          description: 'Payment processed successfully',
        },
        PAYMENT_FAILED: {
          target: 'failed',
          description: 'Payment processing failed',
        },
      },
    },
    completed: {
      description: 'Order successfully completed',
      type: 'final',
    },
    failed: {
      description: 'Order processing failed',
      on: {
        RETURN_TO_CART: {
          target: 'active',
          description: 'Customer returns to cart to retry',
        },
        CLEAR_CART: {
          target: 'empty',
          description: 'Customer clears cart',
        },
      },
    },
  },
};
