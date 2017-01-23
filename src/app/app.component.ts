import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public data;
  public list: number[] = [];
  public unOrderList: number[] = [];
  public iterations: any = [];
  public page = 'sorting';
  constructor() {
  }

  setPage(page) {
    this.page = page;
  }

  limpiar() {
    this.data = "";
    this.unOrderList = [];
    this.list = [];
    this.iterations = [];
  }

  convertToArray(data: string) {
    data = data.replace("[", "").replace("]", "");;
    let list = data.split(",");
    let lista = list.filter(data => /\S/.test(data))
      .map(data => Number(data))
      .filter(data => (typeof data == "number" && data));
    this.unOrderList = lista.filter(() => true);
    return lista;
  }

  burbuja() {
    let self = this;
    this.iterations = [];
    let list = this.convertToArray(this.data);
    list.forEach(() => {
      list.forEach((number, i) => {
        if (number > list[i + 1]) {
          list[i] = list[i + 1];
          list[i + 1] = number;
        }
        self.iterations.push(list.filter(() => true));
      });
    });
    this.list = list;
  }

  insercion() {
    let self = this;
    this.iterations = [];
    let list = this.convertToArray(this.data);
    let aux: number;
    list.forEach((iteration, p) => {
      aux = iteration;
      for (var h = p - 1; h >= 0 && list[h] > aux; h--) {
        var number = list[h];
        list[h + 1] = number
        list[h] = aux;
        self.iterations.push(list.filter(() => true));
      }
    });
    this.list = list;
  }

  seleccion() {
    let self = this;
    this.iterations = [];
    let list = this.convertToArray(this.data);
    let menor: number;
    let pos: number;
    let temp: number;

    for (var p = 0; p < list.length - 1; p++) {
      menor = list[p];
      pos = p;
      for (var h = p + 1; h < list.length; h++) {
        self.iterations.push(list.filter(() => true));
        if (list[h] < menor) {
          menor = list[h];
          pos = h;
        }
      }
      if (pos != p) {
        temp = list[p];
        list[p] = list[pos];
        list[pos] = temp;
      }
    }
    this.list = list;
  }

  mezcla() {
    let list = this.convertToArray(this.data);
  }

  casilleros() {
    let list = this.convertToArray(this.data);
  }

  rapido() {
    this.iterations = [];
    this.list = this.convertToArray(this.data);
    this.doRapido(this.list, 0, this.list.length - 1);
  }

  doRapido(list1?, izq1?, der1?) {
    let self = this;
    this.list = list1 ? list1 : this.convertToArray(this.data);
    let pivote = izq1 ? this.list[izq1] : this.list[0];
    let izq = izq1 ? izq1 : 0;
    let i = izq;
    let der = der1 ? der1 : this.list.length - 1;
    let d = der
    let aux;
    while (i < d) {
      while (this.list[i] <= pivote && i < d) {
        i++;
      }
      while (this.list[d] > pivote) {
        d--;
      }
      if (i < d) {
        aux = this.list[i];
        this.list[i] = this.list[d];
        this.list[d] = aux;
      }
      self.iterations.push(this.list.filter(() => true));
    }
    this.list[izq] = this.list[d];
    this.list[d] = pivote;
    if (izq < d - 1) {
      this.doRapido(this.list, izq, d - 1);
    }
    if (d + 1 < der) {
      this.doRapido(this.list, d + 1, der);
    }
  }

  radix() {
    let list = this.convertToArray(this.data);
  }

}
