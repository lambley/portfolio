import axios from "axios";
import apiUrl from '../utils/apiConfig';

type VisitorCountResponse = {
  success: boolean;
  message: string;
  visitorCount: number;
};

type VisitorCount = {
  id: number;
  count: number;
  date: string;
};

export async function getVisitorCount(): Promise<VisitorCountResponse> {
  try {
    const response = await axios.get<VisitorCount[]>(
      `${apiUrl}/api/v1/unique_visits`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    console.log("API Response:", response.data); // Log the data for debugging

    if (response.status === 200 && response.data.length > 0) {
      const visitorCount = response.data[0].count;
      return {
        success: true,
        message: "Visitor count retrieved successfully",
        visitorCount: visitorCount,
      };
    } else {
      return {
        success: false,
        message: "Visitor count not found or other error",
        visitorCount: 0,
      };
    }
  } catch (error) {
    console.error("Error getting visitor count:", error);
    return {
      success: false,
      message: "Error getting visitor count",
      visitorCount: 0,
    };
  }
}
