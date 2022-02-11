class DocumentHead {
  constructor() {
    this.form = document.querySelector("#document-head");
    this.inputs = this.form.querySelectorAll("input");
    this.elSwitch = document.querySelectorAll(".switch");
    this.mode = 0;
    this.date();

    this.cliente;
    this.cnpj;
    this.end;
    this.number;
    this.IE;
    this.city;
    this.state;
    this.phone;
  }

  date() {
    const date = new Date();
    let month = date.getMonth;
    let text = date.toLocaleDateString("pt-BR");
    text = document.createTextNode(text);
    const dateElement = document.querySelector("#date");
    dateElement.appendChild(text);
  }

  confirm() {
    this.cliente = document.querySelector("#client").value;
    this.cnpj = document.querySelector("#cnpj").value;
    this.end = document.querySelector("#end").value;
    this.number = document.querySelector("#number").value;
    this.IE = document.querySelector("#IE").innerHTML;
    this.city = document.querySelector("#city").value;
    this.state = document.querySelector("#state").value;
    this.phone = document.querySelector("#phone").value;

    this.switch();
  }

  reset() {
    if (this.mode === 0) {
      for (let input of this.inputs) {
        input.value = "";
      }
    } else {
      location.reload();
    }
  }

  switch() {
    for (let el of this.elSwitch) {
      let input = el.querySelector(".input");
      if (input.id === "state") el.querySelector("#select").remove();
      input.remove();

      let newElement = document.createElement("p");
      newElement.classList.add("break-line");
      let textNode = document.createTextNode(input.value);
      newElement.appendChild(textNode);
      el.appendChild(newElement);
    }

    const painel = document.querySelector(".documentHeadPainel");
    painel.querySelector("#confirm-button").remove();

    let aReset = document.createElement("a");
    aReset.setAttribute("class", "button is-light is-danger");
    aReset.setAttribute("onclick", "documentHead.reset()");
    let text = document.createTextNode("Reset");
    aReset.appendChild(text);
    painel.appendChild(aReset);

    this.mode = 1;
    printButton();
  }
}

class DocumentBody {
  constructor() {
    this.total = 0;
    this.prod = 0;
  }

  addElement() {
    let qnt = document.querySelector("#qnt").value;
    qnt = parseFloat(qnt.replace(",", "."));
    if (!qnt) return;

    const unit = document.querySelector("#unit");
    if (!unit) return;

    const descri = document.querySelector("#descri");
    if (!descri) return;

    let preco = document.querySelector("#preco").value;
    if (!preco) return;
    preco = parseFloat(preco.replace(",", "."));

    const total = Number(preco) * Number(qnt);
    this.total += total;

    const tbody = document.querySelector("#prods");

    const values = [
      qnt,
      unit.value,
      descri.value,
      new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(preco),
      new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(total),
    ];

    let documentTotal = [...values];
    documentTotal = documentTotal.pop();
    console.log(values, documentTotal);

    const tr = document.createElement("tr");

    for (let value of values) {
      const td = document.createElement("td");
      const textNode = document.createTextNode(value);
      if (value === documentTotal) {
        td.classList.add("somaTOTAL");
      }
      td.appendChild(textNode);
      tr.appendChild(td);
    }

    tbody.appendChild(tr);
    this.prod += 1;
    this.gettotal();
    printButton();
  }

  gettotal() {
    const thResult = document.querySelector("#resultTOTAL");
    let value = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(this.total);
    thResult.innerHTML = value;
  }
}

let havePrintButton = false

function printButton() {
  if (documentHead.mode === 1 && documentBody.prod > 0 && !havePrintButton) {
    const painel = document.querySelector(".documentHeadPainel");

    let aPrint = document.createElement("a");
    aPrint.setAttribute("class", "button is-light ml-3");
    aPrint.setAttribute("onclick", "window.print()");
    let text = document.createTextNode("Imprimir");
    aPrint.appendChild(text);
    painel.appendChild(aPrint);

    havePrintButton = true
  }
}
