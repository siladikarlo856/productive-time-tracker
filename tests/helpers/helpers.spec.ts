import { expect } from "chai";

import { deepCopy, formatDateYYYYMMDD } from "../../src/helpers/helpers";

describe("helpers test", () => {
  describe("deepCopy test", () => {
    describe("copy basic types", () => {
      it("copy string", () => {
        expect(deepCopy("a")).to.equals("a");
      });
      it("copy number", () => {
        expect(deepCopy(2)).to.equals(2);
      });
      it("copy boolean", () => {
        expect(deepCopy(true)).to.equals(true);
      });
      it("copy undefined", () => {
        expect(deepCopy(undefined)).to.equals(undefined);
      });
      it("copy null", () => {
        expect(deepCopy(null)).to.equals(null);
      });
    });
    describe("copy objects", () => {
      it("shallow object", () => {
        const shallowObj = {
          name: "Karlo",
        };
        expect(deepCopy(shallowObj)).to.not.equals(shallowObj);
        expect(deepCopy(shallowObj).name).to.equals("Karlo");
      });
      it("shallow object", () => {
        const deepObj = {
          name: "Karlo",
          address: {
            city: "Zagreb",
            country: "Croatia",
          },
        };
        const deepObjCopy = deepCopy(deepObj);
        expect(deepObjCopy).to.not.equals(deepObj);
        expect(deepObjCopy.address).to.not.equals(deepObj.address);
        expect(deepObjCopy.name).to.equals(deepObj.name);
        expect(deepObjCopy.address.city).to.equals(deepObj.address.city);
        expect(deepObjCopy.address.country).to.equals(deepObj.address.country);
      });
    });
  });

  describe("formatDateYYYYMMDD", () => {
    it("check result when timezone is not problematic", () => {
      const isoStringTimezone = "2022-11-27T20:23:25.137Z";
      const formattedDate = formatDateYYYYMMDD(new Date(isoStringTimezone));

      expect(formattedDate).to.equal("2022-11-27");
    });

    it("check result when timezone is problematic", () => {
      const isoStringTimezone = "2022-11-27T23:23:25.137Z";
      const formattedDate = formatDateYYYYMMDD(new Date(isoStringTimezone));

      expect(formattedDate).to.equal("2022-11-28");
    });
  });
});
