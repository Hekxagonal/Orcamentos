class DocumentHead {
  constructor() {
    this.form = document.querySelector("#document-head");
    this.inputs = this.form.querySelectorAll("input");
    this.elSwitch = document.querySelectorAll(".switch");
    this.mode = 0; 
    this.date()

    this.cliente;
    this.cnpj;
    this.end;
    this.number;
    this.IE;
    this.city;
    this.state;
    this.phone;
  }

  date(){
    const date = new Date()
    let month = date.getMonth
    let text = date.toLocaleDateString('pt-BR')
    text = document.createTextNode(text)
    const dateElement = document.querySelector('#date')
    dateElement.appendChild(text)
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
      newElement.classList.add('break-line')
      let textNode = document.createTextNode(input.value);
      newElement.appendChild(textNode);
      el.appendChild(newElement);
    }
    this.mode = 1;
  }
}

class DocumentBody {
  constructor() {
    this.total = 0
  }

  addElement() {
    let qnt = document.querySelector("#qnt").value;
    qnt = parseFloat(qnt.replace(',', '.'))

    const unit = document.querySelector("#unit");

    const descri = document.querySelector("#descri");

    let preco = document.querySelector("#preco").value;
    preco = parseFloat(preco.replace(',', '.'))

    const total = Number(preco) * Number(qnt);
    this.total += total

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
    
    let documentTotal = [...values]
    documentTotal = documentTotal.pop()
    console.log(values, documentTotal)

    const tr = document.createElement("tr");

    for (let value of values) {
      const td = document.createElement("td");
      const textNode = document.createTextNode(value);
      if (value === documentTotal){
        td.classList.add('somaTOTAL')
      }
      td.appendChild(textNode);
      tr.appendChild(td);
    }

    tbody.appendChild(tr);
    this.gettotal()
  }

  gettotal(){

    const thResult = document.querySelector('#resultTOTAL')
    let value = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(this.total)
    thResult.innerHTML = value
  }
}
