export const CART_KEY = "vive:cart";

export const localSaveCart = resp => {
  if(!resp.errors) {
    localStorage.setItem(CART_KEY, JSON.stringify(resp.data));
  }
  return resp;
};

export const localGetCart = () => {
  let cart;
  try {
    cart = JSON.parse(localStorage.getItem(CART_KEY) || "false");
  } catch(e) {
    cart = false;
  }
  return cart;
}

const cartHelper = cart => {

  const get = () => {
    let cartObj = localGetCart();
    if (cartObj && typeof cartObj === "object") {
      cart
        .single(cartObj.id)
        .get()
        .then(localSaveCart);
      return new Promise(resolve => resolve(cartObj));
    }
    return cart.create().then(localSaveCart);
  };

  const addItem = async item => {
    let { id: cart_id } = await get();
    return cart
      .single(cart_id)
      .entity("items")
      .create(item)
      .then(localSaveCart);
  };

  const removeItem = async id => {
    let { id: cart_id } = await get();
    return cart
      .single(cart_id)
      .entity("items")
      .delete(id)
      .then(localSaveCart);
  };

  const updateItem = async (id, data) => {
    let { cart_id } = await get();
    return cart
      .single(cart_id)
      .entity("items")
      .update(id, data)
      .then(localSaveCart);
  };

  return Object.assign(
    {},
    {
      get,
      addItem,
      removeItem,
      updateItem,
    }
  );
};

export default cartHelper;
