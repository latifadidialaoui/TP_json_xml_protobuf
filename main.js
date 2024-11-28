const fs = require('fs');
const convert = require('xml-js');
const protobuf = require('protobufjs');

// Charger le fichier proto
const root = protobuf.loadSync('employee.proto');
const EmployeeList = root. lookupType ('Employees');
// Créer des objets employés
const employees = [];
employees.push({ 
    id: 1, 
    name: 'Ali',
     salary: 9000
     });
employees.push({
     id: 2,
      name: 'Kamal',
       salary: 22000. 
    });
employees.push({
     id: 3,
      name: 'Amal',
       salary: 23000 
    });
let jsonObject = {employee: employees };
let jsonData = JSON.stringify(jsonObject);
const options = {compact: true, ignoreComment: true, spaces: 0};
let xmlData = "<root>\n" + convert.json2xml (jsonObject, options) + "\n</root>";

// Encodage en Protobuf
let errMsg = EmployeeList.verify(jsonObject); 
if (errMsg) {
     throw Error(errMsg);
}     
let message = EmployeeList.create(jsonObject); // Crée un message Protobuf
let buffer = EmployeeList.encode(message).finish(); // Encode en format binaire

// Ecriture des fichiers
fs.writeFileSync('data.json', jsonData);
fs.writeFileSync('data.xml', xmlData);
fs.writeFileSync('data.proto', buffer ); // Ecriture du fichier Protobuf

// Récupération de la taille des fichiers
const jsonFileSize = fs.statSync('data.json').size;
 const xmlFileSize = fs.statSync('data.xml').size;
  const protoFileSize = fs.statSync('data.proto').size;
   console.log("Taille de 'data.json $(jsonFileSize) octets");
    console.log("Taille de 'data.xml' :$xmlFileSize) octets");
    console.log("Taille de 'data.proto' :${protoFileSize} octets");