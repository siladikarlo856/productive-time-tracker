import { ProductiveDTO } from "./ProductiveDTO";

export interface ProductiveResponseData {
  data: Array<ProductiveDTO>;
  included: Array<ProductiveDTO>;
  links: any; // Type and implement if needed
  meta: any; // Type and implement if needed
}
