import { deepCopy } from "../helpers/helpers";
import { Person } from "@/interfaces/Person";

export class PersonModel implements Person {
  id: string;
  type: string;
  attributes?: Record<string, unknown>;
  relationships?: Record<string, unknown>;

  constructor(data?: Person) {
    this.id = data?.id || "";
    this.type = data?.type || "";
    this.attributes = deepCopy(data?.attributes);
    this.relationships = deepCopy(data?.relationships);
  }
}
