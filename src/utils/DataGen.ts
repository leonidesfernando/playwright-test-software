//@ts-check
import * as genData from "@faker-js/faker";

let CATEGORIES:string[] = ['ALIMENTACAO', 'SALARIO', 'LAZER'
                  , 'TELEFONE_INTERNET', 'CARRO', 'EMPRESTIMO'
                  , 'INVESTIMENTOS', 'OUTROS']

let tiposLancamento = new Map();
tiposLancamento.set(['INVESTIMENTOS','OUTROS'],['TRANSF']);
tiposLancamento.set(['SALARIO', 'OUTROS'], ['RENDA']);
tiposLancamento.set(CATEGORIES.filter(c => c != 'INVESTIMENTOS' && c != 'SALARIO'), ['DESPESA']);


export const DataGen = {

  getCategory(){
    return getAny(CATEGORIES);
  },

  getTipoLancamento(category: string){
    for(const [key,value] of tiposLancamento){
      
      if (key.indexOf(category) >= 0) {
        return getAny(value);
      }
    }
    throw Error("Does not exists 'TipoLancamento' for this category " + category);
  },

  productName(): string {
    return `PlayWright: ${genData.faker.commerce.product()}`;
  },

  strDateCurrentMonth(): string {
    let now = new Date();
    let month = now.getMonth() + 1;
    let year = now.getFullYear();
    return `${toDateFormat(getDayByMonth(month))}/${toDateFormat(month)}/${year}`;
  },

  moneyValue(): string {
    return new Intl.NumberFormat('pt-BR',
        { style: 'currency', currency: 'BRL' })
      .format(this.number());
  },

  number(): number {
    return this.numberByRange(1000);
  },

  numberByRange(max: number): number {
    return Math.floor(Math.random() * max)
  }
};


function getAny(list: string[]){
  let index = DataGen.numberByRange(list.length);
  if(index == list.length){
    index--;
  }
  return list[index]
}

function getDayByMonth(month: number) {
  let months31Days = [1, 3, 5, 7, 8, 10, 12];

  let day = 0;
  while (day == 0) {
    day = (month == 2) ? DataGen.numberByRange(28) :
      months31Days.includes(month) ? DataGen.numberByRange(31) : DataGen.numberByRange(30);
  }
  return day;
}

function toDateFormat(value: number) {
  if (value < 10)
    return '0' + value;
  return '' + value;
}
