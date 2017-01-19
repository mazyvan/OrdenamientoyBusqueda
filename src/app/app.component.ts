import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public data;

  constructor() {
  }

  convertToArray(data: string) {
    let list = data.split(",");
    return list.filter(data => /\S/.test(data))
      .map(data => Number(data))
      .filter(data => (typeof data == "number" && data));
  }

  burbuja() {
    let list = this.convertToArray(this.data);
    function swap() {
      list.forEach((number, i) => {
        if (number > list[i + 1]) {
          list[i] = list[i + 1];
          list[i + 1] = number;
        }
      });
    }
    list.forEach(() => swap());
    console.log("los datos son ordenados son: ", list);
  }

  insercion() {
    let list = this.convertToArray(this.data);
    let aux: number;
    

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
