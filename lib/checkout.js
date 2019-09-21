import { serialize } from "../util";

const createCheckout = request => {
  try {
    const stripe = Stripe("pk_test_TYooMQauvdEDq54NiTphI7jx");
    const formInputs = [
      { el: "input", name: "email" },
      { el: "input", name: "postcode" },
    ];

    const initForm = (container, onSuccess) => {
      let form = buildForm();
      form.addEventListener("submit", createSubmit(onSuccess));
      container.appendChild(form);
    };

    const buildForm = () => {
      let form = document.createElement("form");
      formInputs.forEach(({ name, el, type = "text" }) => {
        let input = document.createElement(el);
        input.name = name;
        input.type = type;
        form.appendChild(input);
      });
      mountCard(form);
      form.appendChild(getSubmitButton());
      return form;
    };

    const mountCard = form => {
      let cardEl = document.createElement("div");
      let elements = stripe.elements();
      let card = elements.create("card");
      form.appendChild(cardEl);
      card.mount(cardEl);
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
        let values = serialize(event.target);
        request("post", "/sales/intent", values).then(resp => {
          onSuccess(resp);
        });
      };
    };

    return Object.assign(
      {},
      {
        initForm,
      }
    );
  } catch (e) {
    return {};
  }
};

export default createCheckout;
