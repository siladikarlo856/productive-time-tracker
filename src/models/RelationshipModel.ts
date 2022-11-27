import { Relationship } from "@/interfaces/Relationship";
import { RelationshipData } from "@/interfaces/RelationshipData";
import { RelationshipDataModel } from "./RelationshipDataModel";

export class RelationshipModel implements Relationship {
  data: RelationshipData;

  constructor(data?: Relationship) {
    this.data = new RelationshipDataModel(data?.data);
  }
}
