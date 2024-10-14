import { calculateReadingTime } from "../../src/utils/readingTime";

describe("calculateReadingTime", () => {
  it("should return 1 min read for 200 words", () => {
    const content = calculateReadingTime("a ".repeat(200));
    expect(content).toEqual("1 min read");
  });

  it("should return 2 min read for 201 words", () => {
    const content = calculateReadingTime("a ".repeat(201));
    expect(content).toEqual("2 min read");
  });

  it("should return 1 min read for 200 words with double spaces", () => {
    const content = calculateReadingTime("a  ".repeat(200));
    expect(content).toEqual("1 min read");
  });

  it("should return 1 min read for 200 words with line breaks", () => {
    const content = calculateReadingTime("a\n".repeat(200));
    expect(content).toEqual("1 min read");
  });

  it("should return 1 min read for 200 words with HTML tags", () => {
    const content = calculateReadingTime("<p>a</p>".repeat(200));
    expect(content).toEqual("1 min read");
  });
});
