type CategoryColourMap = {
  [category: string]: string;
};

const colourMap: CategoryColourMap = {
  Nextjs: "#FF5733",
  React: "#44BFC1",
  "Ruby on Rails": "#A05EE6",
  "Prisma ORM": "#F8D800",
  Fullstack: "#3CB371",
  Typescript: "#007ACC",
  Frontend: "#FFA500",
  Backend: "#FF6347",
};

function getCategoryColour(category: string): string {
  return colourMap[category] || "#000000"; // Default to black if no colour found
}

function getAllCategoryColours(): CategoryColourMap {
  return colourMap;
}

export { getAllCategoryColours };
export { getCategoryColour };
