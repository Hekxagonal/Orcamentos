class DocumentHead {
  constructor() {
    this.form = document.querySelector("#document-head");
    this.inputs = this.form.querySelectorAll("input");
    this.elSwitch = document.querySelectorAll(".switch");

    this.cliente;
    this.cnpj;
    this.end;
    this.number;
    this.IE;
    this.city;
    this.state;
    this.phone;
  }

  confirm() {
    this.cliente = document.querySelector("#client").value;
    this.cnpj = document.querySelector("#cnpj").value;
    this.end = document.querySelector("#end").value;
    this.number = document.querySelector("#number").value;
    this.IE = document.querySelector("#IE").value;
    this.city = document.querySelector("#city").value;
    this.state = document.querySelector("#state").value;
    this.phone = document.querySelector("#phone").value;

    this.switch();
  }

  reset() {
    for (let input of this.inputs) {
      input.value = "";
    }
  }

  switch() {
    for (let el of this.elSwitch) {
      let input = el.querySelector(".input");
      if(input.id === 'state') el.querySelector('#select').remove()
      input.remove();

      let newElement = document.createElement("p");
      let textNode = document.createTextNode(input.value);
      newElement.appendChild(textNode);
      el.appendChild(newElement);
      
    }
  }
}
