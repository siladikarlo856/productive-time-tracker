import { ProductiveRelationship } from "./ProductiveReationship";

export interface CreateTimeEntryCommandModel {
  data: {
    type: string;
    attributes: {
      note: string;
      date: string;
      time: number;
    };
    relationships: {
      person: ProductiveRelationship;
      service: ProductiveRelationship;
      task: ProductiveRelationship;
    };
  };
}
