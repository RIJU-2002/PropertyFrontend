import { useQuery } from "@tanstack/react-query";
import { InvestmentProject } from "@/types/roi";

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

interface TopInvestmentProjectsResponse {
  success: boolean;
  data: InvestmentProject[];
}

export function useTopInvestmentProjects() {
  return useQuery({
    queryKey: ["top-investment-projects"],

    queryFn: async () => {
      const response = await fetch(
        `${API_BASE}projects/investment/top-investments`
      );

      if (!response.ok) {
        const errorText = await response.text();

        console.error(
          "ROI API Error:",
          response.status,
          errorText
        );

        throw new Error(
          `Failed to fetch top investment projects (${response.status})`
        );
      }

      const result: TopInvestmentProjectsResponse =
        await response.json();

      return result.data;
    },
  });
}