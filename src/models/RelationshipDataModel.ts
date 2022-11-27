import { RelationshipData } from "@/interfaces/RelationshipData";

export class RelationshipDataModel implements RelationshipData {
  id: string;
  type: string;

  constructor(data?: RelationshipData | null) {
    this.id = data?.id || "";
    this.type = data?.type || "";
  }
}
