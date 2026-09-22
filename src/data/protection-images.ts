import bio from "@/assets/protect-bio.jpg";
import fungicide from "@/assets/protect-fungicide.jpg";
import herbicide from "@/assets/protect-herbicide.jpg";
import insecticide from "@/assets/protect-insecticide.jpg";

/** Generic educational illustration per plant-protection category. */
export const protectionImages: Record<string, string> = {
  Insecticide: insecticide,
  Fungicide: fungicide,
  Herbicide: herbicide,
  "Bio-pesticide": bio,
};

export const protectionImageAlt: Record<string, string> = {
  Insecticide: "Illustration of a ladybird beetle and aphids on a leaf, showing insect pests",
  Fungicide: "Illustration of a leaf with fungal spots viewed through a magnifying glass",
  Herbicide: "Illustration of weeds growing between crop rows in a field",
  "Bio-pesticide": "Illustration of neem leaves and soil microbes supporting a healthy seedling",
};
