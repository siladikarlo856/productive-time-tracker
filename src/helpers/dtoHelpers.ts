import { ProductiveDTO } from "@/interfaces/ProductiveDTO";

export function findDtoInArrayById(id: string, dtoArray: Array<ProductiveDTO>) {
  return dtoArray.find((dtoObject: ProductiveDTO) => dtoObject.id === id);
}

export function findDtoInArrayByType(
  type: string,
  dtoArray: Array<ProductiveDTO>
) {
  return dtoArray.find((dtoObject: ProductiveDTO) => dtoObject.type === type);
}
