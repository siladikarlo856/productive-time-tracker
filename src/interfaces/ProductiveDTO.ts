import { ProductiveAttributes } from "./ProductiveAttribtues";
import { ProductiveRelationship } from "./ProductiveReationship";

export interface ProductiveDTO {
  id: string;
  type: string;
  relationships: { [key: string]: ProductiveRelationship };
  attributes: ProductiveAttributes;
}
