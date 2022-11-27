export class CreateTimeEntryCommandModelImpl {
  constructor(
    note: string,
    dateYYYYMMDD: string,
    timeInMinutes: number,
    personId: string,
    serviceId: string
  ) {
    return {
      data: {
        type: "time_entries",
        attributes: {
          note: note,
          date: dateYYYYMMDD,
          time: timeInMinutes,
        },
        relationships: {
          person: {
            data: {
              type: "people",
              id: personId,
            },
          },
          service: {
            data: {
              type: "services",
              id: serviceId,
            },
          },
          task: {
            data: null,
          },
        },
      },
    };
  }
}
