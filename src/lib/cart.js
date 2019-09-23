const CART_KEY = "vive:cart";

const cartHelper = cart => {
  const get = () => {
    let cartObj = JSON.parse(localStorage.getItem(CART_KEY));
    if (cartObj && typeof cartObj === "object") {
      cart
        .single(cartObj.id)
        .get()
        .then(resp =>
          localStorage.setItem(CART_KEY, JSON.stringify(resp.data))
        );
      return new Promise(resolve => resolve(cartObj));
    }
    return cart.create().then(resp => {
      localStorage.setItem(CART_KEY, JSON.stringify(resp.data));
      return resp.data;
    });
  };

  const addItem = async item => {
    let { id: cart_id } = await get();
    return cart
      .single(cart_id)
      .entity("items")
      .create(item)
      .then(resp => {
        localStorage.setItem(CART_KEY, JSON.stringify(resp.data));
        return resp;
      });
  };

  const removeItem = async id => {
    let { id: cart_id } = await get();
    return cart
      .single(cart_id)
      .entity("items")
      .delete(id);
      // TODO: update state
  };

  const updateItem = async (id, data) => {
    let { cart_id } = await get();
    return cart
      .single(cart_id)
      .entity("items")
      .update(id, data);
      // TODO: update state
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
