import { serialize } from "./util";
import cartHelper, { localGetCart } from "./lib/cart";

const checkout = ({ request, entity }) => {
  const stripe = Stripe("pk_test_ajbou6OcKg1QmuRvavRtpgzd");
  const elements = stripe.elements();
  const cardElement = elements.create("card");
  const cart = cartHelper(entity("cart"));

  const formInputs = [
    { el: "input", name: "email", value: "me@jacobford.co.uk" },
    { el: "input", name: "name", value: "Jacob" },
  ];

  const initForm = (container, onSuccess) => {
    cart
      .get()
      .then(({ id: cart_id }) => request("post", "/sales/intent", { cart_id }))
      .then(resp => {
        if (resp.data.intent.id) {
          formInputs.push({
            el: "input",
            name: "charge_secret",
            value: resp.data.intent.client_secret,
          });
        }
        let form = buildForm();
        form.addEventListener("submit", createSubmit(onSuccess));
        container.appendChild(form);
      });
  };

  const buildForm = () => {
    let form = document.createElement("form");
    formInputs.forEach(({ name, el, value = "", type = "text" }) => {
      let input = document.createElement(el);
      input.name = name;
      input.type = type;
      input.value = value;
      form.appendChild(input);
    });
    mountCard(form);
    form.appendChild(getSubmitButton());
    return form;
  };

  const mountCard = form => {
    let cardEl = document.createElement("div");
    form.appendChild(cardEl);
    cardElement.mount(cardEl);
  };

  const getSubmitButton = () => {
    let button = document.createElement("button");
    button.innerHTML = "pay";
    button.type = "submit";
    return button;
  };

  const createSubmit = onSuccess => {
    return event => {
      event.preventDefault();
      let { name, email, charge_secret } = serialize(event.target);
      let { id: cart_id } = localGetCart();
      stripe
        .handleCardPayment(charge_secret, cardElement, {
          payment_method_data: {
            billing_details: { name, email },
            metadata: { cart_id },
          },
        })
        .then(function(result) {
          if (result.error) {
            // Display error.message in your UI.
            onSuccess(result);
            console.log("Submit error", result);
            alert("Error");
          } else {
            // The payment has succeeded. Display a success message.
            console.log("Submit success", result);
            alert("success");
          }
        });
    };
  };

  return Object.assign(
    {},
    {
      initForm,
      cart,
    }
  );
};

export default checkout;
