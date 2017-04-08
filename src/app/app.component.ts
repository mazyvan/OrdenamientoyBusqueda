import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public data;
  public wanted;
  public foundIn;
  public errorMessage;
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

  linearSearch() {
    this.errorMessage = undefined;
    let list = (this.list.length > 0) ? this.list : this.convertToArray(this.data);
    this.foundIn = list.indexOf(parseInt(this.wanted));
  }

  binarySearch() {
    this.errorMessage = undefined;
    if (!(this.list.length > 0)) {
      this.foundIn = undefined;
      this.errorMessage = "Para usar la búsqueda binaria la lista debe estar ordenada";
    } else {
      this.foundIn = this.binaryIndexOf(this.list, this.wanted);
    }
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
    self.iterations.push(list.filter(() => true));
    this.list = list;
  }

  mezcla() {
    let self = this;
    this.iterations = [];
    let list = this.convertToArray(this.data);
    this.list = this.divideMerge(list);
    self.iterations.push(this.list.filter(() => true));
  }

  casilleros() {
    let self = this;
    this.iterations = [];
    let list = this.convertToArray(this.data);
    // Declaring vars
    var i,
      minValue = list[0],
      maxValue = list[0],
      bucketSize = 5;

    // Setting min and max values
    list.forEach(function (currentVal) {
      if (currentVal < minValue) {
        minValue = currentVal;
      } else if (currentVal > maxValue) {
        maxValue = currentVal;
      }
    })

    // Initializing buckets
    var bucketCount = Math.floor((maxValue - minValue) / bucketSize) + 1;
    var allBuckets = new Array(bucketCount);

    for (i = 0; i < allBuckets.length; i++) {
      allBuckets[i] = [];
    }

    // Pushing values to buckets
    list.forEach(function (currentVal) {
      allBuckets[Math.floor((currentVal - minValue) / bucketSize)].push(currentVal);
    });

    // Sorting buckets
    list.length = 0;

    allBuckets.forEach(function (bucket) {
      self.insertionSortForBucket(bucket);
      bucket.forEach(function (element) {
        list.push(element)
      });
    });

    this.list = list;
    self.iterations.push(this.list.filter(() => true));
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

  divideMerge(items: number[]): number[] {
    var halfLength = Math.ceil(items.length / 2);
    var low = items.slice(0, halfLength);
    var high = items.slice(halfLength);
    if (halfLength > 1) {
      low = this.divideMerge(low);
      high = this.divideMerge(high);
    }
    return this.combineMerge(low, high);
  }

  combineMerge(low: number[], high: number[]): number[] {
    var indexLow = 0;
    var indexHigh = 0;
    var lengthLow = low.length;
    var lengthHigh = high.length;
    var combined = [];
    while (indexLow < lengthLow || indexHigh < lengthHigh) {
      var lowItem = low[indexLow];
      var highItem = high[indexHigh];
      if (lowItem !== undefined) {
        if (highItem === undefined) {
          combined.push(lowItem);
          indexLow++;
        } else {
          if (lowItem <= highItem) {
            combined.push(lowItem);
            indexLow++;
          } else {
            combined.push(highItem);
            indexHigh++;
          }
        }
      } else {
        if (highItem !== undefined) {
          combined.push(highItem);
          indexHigh++;
        }
      }
    }
    return combined;
  }

  insertionSortForBucket(array: number[]): number[] {
    var length = array.length;
    for (var i = 1; i < length; i++) {
      var temp = array[i];
      for (var j = i - 1; j >= 0 && array[j] > temp; j--) {
        array[j + 1] = array[j];
      }
      array[j + 1] = temp;
    }
    return array;
  }

  binaryIndexOf(array: number[], wanted: number): number {
    var minIndex = 0;
    var maxIndex = array.length - 1;
    var currentIndex;
    var currentElement;
    while (minIndex <= maxIndex) {
      currentIndex = (minIndex + maxIndex) / 2 | 0;
      currentElement = array[currentIndex];
      if (currentElement < wanted) {
        minIndex = currentIndex + 1;
      }
      else if (currentElement > wanted) {
        maxIndex = currentIndex - 1;
      }
      else return currentIndex;
    }
    return -1;
  }
}
