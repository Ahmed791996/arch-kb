export interface User {
  username: string;
  displayName: string;
  role: string;
  affiliation: string;
  bio: string;
  pathCount: number;
  joined: string;
}

export const users: User[] = [
  {
    username: "ahmedyakout",
    displayName: "Ahmed Yakout",
    role: "Educator & Practitioner",
    affiliation: "SCI-Arc / MTRender",
    bio: "Virtual production and AI visualization. Gaussian splatting, real-time rendering, and computational design workflows.",
    pathCount: 2,
    joined: "2025-01",
  },
  {
    username: "sarahchen",
    displayName: "Sarah Chen",
    role: "Graduate Student",
    affiliation: "SCI-Arc",
    bio: "Exploring AI-driven design pipelines for architectural representation. Focus on ControlNet workflows and generative interiors.",
    pathCount: 2,
    joined: "2025-02",
  },
  {
    username: "marcorivera",
    displayName: "Marco Rivera",
    role: "Practicing Architect",
    affiliation: "Studio MR",
    bio: "10 years in practice. Using NeRF and photogrammetry to document existing conditions without expensive equipment.",
    pathCount: 1,
    joined: "2025-01",
  },
  {
    username: "linapark",
    displayName: "Lina Park",
    role: "Computational Designer",
    affiliation: "Zaha Hadid Architects",
    bio: "Automating visualization pipelines with Python and ComfyUI. Batch rendering, parametric generation, and AI-assisted fabrication.",
    pathCount: 1,
    joined: "2025-03",
  },
];

export const authorToUsername: Record<string, string> = {
  "Ahmed Yakout": "ahmedyakout",
  "Sarah Chen": "sarahchen",
  "Marco Rivera": "marcorivera",
  "Lina Park": "linapark",
};

export function getUserByUsername(username: string): User | undefined {
  return users.find((u) => u.username === username);
}
