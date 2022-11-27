import { ProductiveAttributes } from "./ProductiveAttribtues";
import { ProductiveRelationship } from "./ProductiveReationship";

export interface ProductiveDTO {
  id: string;
  type: string;
  relationships: Array<ProductiveRelationship>;
  attributes: ProductiveAttributes;
}
