import { toSentenceCase, toTitleCase } from "../stringUtils";

describe("String Utility Functions", () => {
  describe("toSentenceCase", () => {
    it("should return an empty string if input is not a string", () => {
      expect(toSentenceCase(null as any)).toBe("");
    });

    it("should return an empty string if input is an empty string", () => {
      expect(toSentenceCase("")).toBe("");
    });

    it("should return a sentence case string if input is a string", () => {
      expect(toSentenceCase("hello world")).toBe("Hello world");
    });
  });

  describe("toTitleCase", () => {
    it("should return an empty string if input is not a string", () => {
      expect(toTitleCase(null as any)).toBe("");
    });

    it("should return an empty string if input is an empty string", () => {
      expect(toTitleCase("")).toBe("");
    });

    it("should return a title case string if input is a string", () => {
      expect(toTitleCase("hello world")).toBe("Hello World");
    });
  });
});
