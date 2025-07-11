export const cartReducer = (
  state: CartState,
  action: CartAction
): CartState => {
  const calculateTotal = (items: CartItem[]) =>
    items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  switch (action.type) {
    case "ADD_TO_CART": {
      const existing = state.items.find(
        (item) => item._id === action.payload._id
      );
      const items = existing
        ? state.items.map((item) =>
            item._id === action.payload._id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...state.items, { ...action.payload, quantity: 1 }];
      return { ...state, items, total: calculateTotal(items) };
    }

    case "REMOVE_FROM_CART": {
      const items = state.items.filter((item) => item._id !== action.payload);
      return { ...state, items, total: calculateTotal(items) };
    }

    case "UPDATE_QUANTITY": {
      const items =
        action.payload.quantity <= 0
          ? state.items.filter((item) => item._id !== action.payload.id)
          : state.items.map((item) =>
              item._id === action.payload.id
                ? { ...item, quantity: action.payload.quantity }
                : item
            );
      return { ...state, items, total: calculateTotal(items) };
    }

    case "TOGGLE_CART":
      return { ...state, isOpen: !state.isOpen };

    case "CLEAR_CART":
      return { ...state, items: [], total: 0 };

    case "INIT_CART":
      return { ...action.payload };

    default:
      return state;
  }
};
