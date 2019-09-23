const checkout = request => {

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
      let [name, email] = serialize(event.target);
      let sale = { ...name, ...email };
      request("post", "/sales/intent", sale).then(resp => {
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
};

export default checkout;
