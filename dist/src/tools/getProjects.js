export const getProjects = {
    name: 'getProjects',
    description: 'This tool shows my projects and achievements.',
    execute: async () => {
        return {
            projects: [
                {
                    name: "synto.fun",
                    description: "AI interface to simplify Web3 operations",
                    tech: ["AI", "Web3", "Blockchain"],
                    features: ["Web3 operations simplification", "AI-powered interface"],
                    achievements: "Won hackathons at ETH Oxford and Paris Blockchain Week"
                }
            ],
            hackathons: [
                {
                    name: "ETH Oxford",
                    project: "synto.fun",
                    description: "AI interface to simplify Web3 operations"
                },
                {
                    name: "Paris Blockchain Week",
                    project: "synto.fun",
                    description: "AI interface to simplify Web3 operations"
                }
            ],
            description: "Won 3 startup hackathons, including ETH Oxford and Paris Blockchain Week, with projects like synto.fun — an AI interface to simplify Web3 operations."
        };
    },
};
//# sourceMappingURL=getProjects.js.map