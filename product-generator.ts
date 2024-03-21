// {
//   id: string,
//   name: string,
//   description: string,
//   netPRice: number,
//   weight: number,
//   discount: number,

// }

import {fakerIT as faker} from '@faker-js/faker';
import{writeFileSync} from 'fs';

function generateRandomProduct(){
  return {
    id: faker.database.mongodbObjectId(),
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    netPrice: parseFloat(faker.commerce.price({max:10000})),
    weight: faker.number.float({min: 50, max: 2000}),
    discount: faker.number.float({min: 0, max:1, fractionDigits: 2})
  }
}

function generateProducts(num: number){
  const products: any[] = [];
  for(let i = 0; i < num; i++){
    products.push(generateRandomProduct());
  }
  //const products = Array.from({ length:num}).map(() => generateRandomProduct());
  //return products;
  writeFileSync('./products.json', JSON.stringify(products, null, 2), {encoding: 'utf-8'});
}

//const tmp = generateRandomProduct();
//console.log(tmp);
generateProducts(10);