export const social = [
  { url: "mailto:systems.roncal@gmail.com", name: "mail" },
  { url: "https://pe.linkedin.com/in/enrique-roncal-rodriguez", name: "linkedin" },
  { url: "https://github.com/systemsroncal/", name: "github" },
  { url: "https://www.instagram.com/roncal.enrique", name: "instagram" },
  { url: "https://facebook.com/roncal.enrique/", name: "facebook" },
] as const satisfies {
  url: string;
  name: "mail" | "github" | "instagram" | "linkedin" | "facebook";
}[];
