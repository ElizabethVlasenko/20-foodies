"use server";

import { redirect } from "next/navigation";
import { saveMeal } from "./meals";
import { revalidatePath } from "next/cache";
import { type State } from "../meals/share/page";

function isInvalidText(text: string) {
  return !text || text.trim() === "";
}

export type FormDataMeal = {
  title: string;
  summary: string;
  instructions: string;
  image: File | string;
  creator: string;
  creator_email: string;
  slug?: string;
};

export async function shareMeal(
  previousState: State,
  formData: FormData
): Promise<State> {
  const meal = {
    title: formData.get("title"),
    summary: formData.get("summary"),
    instructions: formData.get("instructions"),
    image: formData.get("image"),
    creator: formData.get("name"),
    creator_email: formData.get("email"),
  } as FormDataMeal;

  if (typeof meal.image === "string") {
    return { message: "Invalid input." };
  }

  if (
    isInvalidText(meal.title) ||
    isInvalidText(meal.summary) ||
    isInvalidText(meal.instructions) ||
    isInvalidText(meal.creator) ||
    isInvalidText(meal.creator_email) ||
    !meal.creator_email.includes("@") ||
    !meal.image ||
    meal.image.size === 0
  ) {
    return {
      message: "Invalid input.",
    };
  }
  await saveMeal(meal);
  revalidatePath("/meals"); //("/meals", "layout") will revalidate nested routs
  redirect("/meals");
}
