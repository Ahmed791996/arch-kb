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
    role: "Developer & Creator",
    affiliation: "MTRender",
    bio: "Building tools and workflows. Blender addons, web development, AI pipelines, and creative coding.",
    pathCount: 6,
    joined: "2025-01",
  },
];

export const authorToUsername: Record<string, string> = {
  "Ahmed Yakout": "ahmedyakout",
};

export function getUserByUsername(username: string): User | undefined {
  return users.find((u) => u.username === username);
}
