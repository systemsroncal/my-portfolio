export const social = [
  { url: "https://wa.me/51989867536", name: "whatsapp" },
  { url: "mailto:systems.roncal@gmail.com", name: "mail" },
  { url: "https://pe.linkedin.com/in/enrique-roncal-rodriguez", name: "linkedin" },
  { url: "https://github.com/systemsroncal/", name: "github" },
  { url: "https://www.instagram.com/roncal.enrique", name: "instagram" },
  { url: "https://facebook.com/roncal.enrique/", name: "facebook" },
] as const satisfies {
  url: string;
  name: "mail" | "whatsapp" | "github" | "instagram" | "linkedin" | "facebook";
}[];
