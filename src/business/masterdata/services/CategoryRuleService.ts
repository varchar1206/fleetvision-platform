import type { BusinessCategoryRule } from "../models/BusinessCategoryRule";

const categoryRules: BusinessCategoryRule[] = [
  {
    id: "cat-groc",
    code: "GROC",
    name: "Grocery",
    commodity: "Grocery",
    temperature: "Ambient",
    commitmentTime: "06:00",
    defaultBolNotes: "Standard grocery delivery.",
    specialInstructions: "Verify appointment time before dispatch.",
    isActive: true,
  },
  {
    id: "cat-ff",
    code: "FF",
    name: "Fresh",
    commodity: "Fresh Food",
    temperature: "34°F",
    commitmentTime: "05:00",
    defaultBolNotes: "Fresh product delivery.",
    specialInstructions: "Maintain refrigerated temperature.",
    isActive: true,
  },
  {
    id: "cat-prod",
    code: "PROD",
    name: "Produce",
    commodity: "Produce",
    temperature: "38°F",
    commitmentTime: "04:30",
    defaultBolNotes: "Produce delivery.",
    specialInstructions: "Inspect temperature before departure.",
    isActive: true,
  },
];

export function listActiveCategoryRules(): BusinessCategoryRule[] {
  return categoryRules.filter((category) => category.isActive);
}

export function getCategoryRuleById(id: string): BusinessCategoryRule | undefined {
  return categoryRules.find((category) => category.id === id);
}
