import axios from "axios";
import { getVisitorCount } from "@/api/visitorCount";

jest.mock("axios");

describe("getVisitorCount", () => {
  it("should return visitor count when response status is 200", async () => {
    const mockResponse = {
      status: 200,
      data: [{ id: 1, count: 10, date: "2023-08-23" }],
    };
    (axios.get as jest.Mock).mockResolvedValue(mockResponse);

    const result = await getVisitorCount();

    expect(result.success).toBe(true);
    expect(result.message).toBe("Visitor count retrieved successfully");
    expect(result.visitorCount).toBe(10);
  });

  it("should return zero visitor count when response data is empty", async () => {
    const mockResponse = {
      status: 200,
      data: [],
    };
    (axios.get as jest.Mock).mockResolvedValue(mockResponse);

    const result = await getVisitorCount();

    expect(result.success).toBe(false);
    expect(result.message).toBe("Visitor count not found or other error");
    expect(result.visitorCount).toBe(0);
  });

  it("should return zero visitor count when response status is not 200", async () => {
    const mockResponse = {
      status: 500,
      data: [],
    };
    (axios.get as jest.Mock).mockResolvedValue(mockResponse);

    const result = await getVisitorCount();

    expect(result.success).toBe(false);
    expect(result.message).toBe("Visitor count not found or other error");
    expect(result.visitorCount).toBe(0);
  });

  it("should handle network error and return zero visitor count", async () => {
    (axios.get as jest.Mock).mockRejectedValue(new Error("Network error"));

    const result = await getVisitorCount();

    expect(result.success).toBe(false);
    expect(result.message).toBe("Error getting visitor count");
    expect(result.visitorCount).toBe(0);
  });
});
