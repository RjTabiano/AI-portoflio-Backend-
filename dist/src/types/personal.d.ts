export interface About {
    age: number;
    birthDate: string;
    location: string;
    background: string;
    qualities: string[];
    flaw: string;
    hobbies: string[];
    fiveYearPlan: string;
    philosophy: string;
    dreamProject: string;
}
export interface Education {
    degree: string;
    school: string;
    graduationYear: string;
    highSchool: string;
    experience: string;
}
export interface Skills {
    frontend: string[];
    backend: string[];
    tools: string[];
    design: string[];
    softSkills: string[];
}
export interface Internship {
    company: string;
    role: string;
    duration: string;
    achievements: string[];
}
export interface Hackathon {
    name: string;
    project: string;
    description: string;
}
export interface Experience {
    internships: Internship[];
    hackathons: Hackathon[];
}
export interface Project {
    name: string;
    description: string;
    tech: string[];
    features: string[];
    achievements: string;
}
export interface Personality {
    communication: string;
    approach: string;
    values: string;
    enthusiasm: string;
    humor: string;
}
export interface PersonalContext {
    name: string;
    role: string;
    location: string;
    about: About;
    education: Education;
    skills: Skills;
    experience: Experience;
    projects: Project[];
    interests: string[];
    personality: Personality;
}
//# sourceMappingURL=personal.d.ts.map