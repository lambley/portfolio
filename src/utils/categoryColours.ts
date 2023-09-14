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
  GitHub: "#bcbdd8",
  DevOps: "#a516b0",
};

const iconMap: CategoryColourMap = {
  Nextjs: "devicon-nextjs-original",
  React: "devicon-react-original",
  "Ruby on Rails": "devicon-rails-plain",
  "Prisma ORM": "devicon-postgresql-plain",
  Fullstack: "devicon-javascript-plain",
  Typescript: "devicon-typescript-plain",
  Frontend: "devicon-html5-plain",
  Backend: "devicon-nodejs-plain",
  GitHub: "devicon-github-original",
  DevOps: "devicon-docker-plain",
};

function getCategoryColour(category: string): string {
  return colourMap[category] || "#000000"; // Default to black if no colour found
}

function getAllCategoryColours(): CategoryColourMap {
  return colourMap;
}

function getCategoryIcon(category: string): string {
  return iconMap[category] || "devicon-github-original"; // Default to github icon if no icon found
}

export { getAllCategoryColours };
export { getCategoryColour };
export { getCategoryIcon };
