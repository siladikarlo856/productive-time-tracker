export interface ServiceDTO {
  id: string;
  attributes: {
    name: string;
  };
  relationships: {
    deal: {
      data: {
        type: string;
        id: string;
      };
    };
  };
}
