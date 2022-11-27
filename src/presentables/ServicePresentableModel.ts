import { ProductiveDTO } from "@/interfaces/ProductiveDTO";
import { ServiceDTO } from "@/interfaces/ServiceDTO";
import { ServicePresentable } from "@/interfaces/ServicePresentable";

export class ServicePresentableModel implements ServicePresentable {
  id: string;
  name: string;
  budgetName: string;

  constructor(data: ServiceDTO, included: Array<ProductiveDTO>) {
    // TODO: make an interface for API response
    this.id = data?.id || "";
    this.name = data?.attributes?.name || "";
    this.budgetName = this.getBudgetName(data, included);
  }

  getBudgetName(data: ServiceDTO, included: Array<ProductiveDTO>): string {
    const dealId = data?.relationships?.deal?.data?.id;
    if (!dealId) {
      return "";
    } // else
    return (
      (included.find((includedDTO: ProductiveDTO) => includedDTO.id === dealId)
        ?.attributes?.name as string) || ""
    );
  }
}
