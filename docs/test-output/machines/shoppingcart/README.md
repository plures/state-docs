## shoppingCart
State machine for shoppingCart

States:
- [empty](./states/empty.md) — Cart is empty, awaiting first item
- [active](./states/active.md) — Cart has items, customer can continue shopping or checkout
- [checkout](./states/checkout.md) — Customer is in checkout process
- [checkout.shipping](./states/checkout-shipping.md) — Collecting shipping address
- [checkout.payment](./states/checkout-payment.md) — Collecting payment information
- [processing](./states/processing.md) — Order is being validated and processed
- [completed](./states/completed.md) — Order successfully completed
- [failed](./states/failed.md) — Order processing failed
