// Primjer za zadatak 9 - Import/Export
// Da bi radilo sa Node.js, treba "type": "module" u package.json

import pomnozi, { saberi, oduzmi } from "./utils-primjer.js";

console.log(saberi(5, 3));   // 8
console.log(oduzmi(10, 4));  // 6
console.log(pomnozi(4, 5));  // 20
