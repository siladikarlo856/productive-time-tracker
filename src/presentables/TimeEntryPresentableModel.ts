import { findDtoInArrayById } from "../helpers/dtoHelpers";
import { ProductiveDTO } from "@/interfaces/ProductiveDTO";
import { TimeEntryPresentable } from "@/interfaces/TimeEntryPresentable";

export class TimeEntryPresentableModel implements TimeEntryPresentable {
  id: string;
  projectName: string;
  budgetName: string;
  serviceName: string;
  note: string;
  timeInMinutes: number;

  constructor(data: ProductiveDTO, included: Array<ProductiveDTO>) {
    this.id = data?.id || "";
    this.note = (data?.attributes?.note as string) || "";
    this.timeInMinutes = (data?.attributes?.time as number) || 0;
    const serviceObject = findDtoInArrayById(
      data.relationships?.service?.data?.id || "",
      included
    );
    this.serviceName = (serviceObject?.attributes?.name as string) || "";
    const budgetObject = findDtoInArrayById(
      serviceObject?.relationships?.deal?.data?.id || "",
      included
    );
    this.budgetName = (budgetObject?.attributes?.name as string) || "";
    const projectObject = findDtoInArrayById(
      budgetObject?.relationships?.project?.data?.id || "",
      included
    );
    this.projectName = (projectObject?.attributes?.name as string) || "";
  }
}
