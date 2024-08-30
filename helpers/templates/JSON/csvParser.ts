/*
const fs = require("fs");
const csv = require("csv-parser");

export function CSV_Reader(){
  const results:any = [];
  fs.createReadStream("./public/data/pre_registro.csv")
  .pipe(csv())
  .on("data",(data:any)=>{
    results.push(data);})
  .on("end",()=>{
  });
  return results;
}
*/
export function CSV_Reader(){
  return {
    response: 200,
    name: "Hello"
  }
}