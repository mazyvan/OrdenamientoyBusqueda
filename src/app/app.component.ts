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
  public iterations:any = [];
  public iteration1 = "";
  constructor() {
  }

  convertToArray(data: string) {
    data = data.replace("[","").replace("]","");;
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
    console.log("los datos ordenados son: ", list);
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
    console.log("los datos ordenados son: ", list);
  }

  seleccion() {
    let list = this.convertToArray(this.data);

  }

  mezcla() {
    let list = this.convertToArray(this.data);
  }

  casilleros() {
    let list = this.convertToArray(this.data);
  }

  rapido() {
    let list = this.convertToArray(this.data);
  }

  radix() {
    let list = this.convertToArray(this.data);
  }

}
