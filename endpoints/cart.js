export default function cart(http) {
  function getCart(id) {
    return http
      .get(`/cart/${id}`)
      .then(resp => resp.data)
      .catch(http.handleError);
  }

  function createCart() {
    return http
      .get(`/cart`)
      .then(resp => resp.data)
      .catch(http.handleError);
  }

  function addItemToCart(id, item) {
    return http
      .post(`/cart/${id}/items`, { item })
      .then(resp => resp.data)
      .catch(http.handleError);
  }

  function updateCartItem(id, item){
    return http
      .put(`/cart/${id}/items`, { item })
      .then(resp => resp.data)
      .catch(http.handleError);
  }

  function removeCartItem(id, itemId){
    return http
      .put(`/cart/${id}/items`, { item: { id: itemId } })
      .then(resp => resp.data)
      .catch(http.handleError);
  }

  return {
    getCart,
    createCart,
    addItemToCart,
    updateCartItem,
    removeCartItem
  };
}
