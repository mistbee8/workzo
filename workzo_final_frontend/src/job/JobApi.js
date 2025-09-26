import axios from "axios";

export const fetchjobsTensorSearch = async (query, page = 1, filters = "") => {
  const searchQuery = query || "";
  const userId = "ec5b4e72-b78b-4e95-ac7c-1cabf094525a"; // User ID from the provided parameters

  try {
    const response = await axios.post(
      `https://bckn.tensorsolution.in/api/v1/search?collection_name=${userId}_jobs_data&query_by=company_name,company_profile,job_position,job_location&query_type=keyword&query=${encodeURIComponent(
        searchQuery
      )}&per_page=10&page=${page}&facet_by=company_name,company_profile,job_position,job_location&filter_by=${encodeURIComponent(
        filters || ""
      )}&user_id=${userId}`,
      {},
      {
        headers: {
          Authorization: "Bearer 0V7dEN4BHuAZsN5kVvHzC68UrHzvLoq7",
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Response from Typesense:", response.data);

    const facetCounts = response.data.response.facet_counts || [];
    const jobLocationFacet = facetCounts.find(
      (facet) => facet.field_name === "job_location"
    );
    const jobPositionFacet = facetCounts.find(
      (facet) => facet.field_name === "job_position"
    );

    const facets = {
      job_location: jobLocationFacet?.counts || [],
      job_position: jobPositionFacet?.counts || [],
    };

    const jobDocuments =
      response.data.response.hits?.map((item) => item.document) || [];
    const totalHits = response.data.response.found || 0;
    const totalPages = Math.ceil(totalHits / 10); // Using 10 as per_page from API

    console.log("Job Documents:", response.data.response);

    return {
      jobDocuments,
      facets,
      totalHits,
      totalPages,
      success: true,
    };
  } catch (error) {
    console.error("Error detected while fetching jobs from Typesense", error);
    return {
      jobDocuments: [],
      facets: { job_location: [], job_position: [] },
      totalHits: 0,
      totalPages: 0,
      success: false,
      error: error.message,
    };
  }
};
