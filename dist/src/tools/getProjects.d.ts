export declare const getProjects: {
    name: string;
    description: string;
    execute: () => Promise<{
        projects: {
            name: string;
            description: string;
            tech: string[];
            features: string[];
            achievements: string;
        }[];
        hackathons: {
            name: string;
            project: string;
            description: string;
        }[];
        description: string;
    }>;
};
//# sourceMappingURL=getProjects.d.ts.map