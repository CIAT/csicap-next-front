import { GenericObject } from "../../interfaces";

export function keyExtractor( json: GenericObject ) {
  const result = [];
  for (const key in json){
    result.push(key);
  }
  return result;
}