import fs from "node:fs";

import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";
import { FormDataMeal } from "./actions";

const db = sql("meals.db");

export type MealData = {
  id: number;
  slug: string;
  title: string;
  image: string;
  summary: string;
  instructions: string;
  creator: string;
  creator_email: string;
};

export type MealsData = MealData[];

export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  // throw new Error("Loading meals failed");
  const data = db.prepare("SELECT * FROM meals").all(); //.run() for inserting data; .all() used during fetching
  // console.log(data);
  return data;
}

export function getMeal(slug: string) {
  return db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug);
}

export async function saveMeal(meal: FormDataMeal) {
  if (meal.image instanceof File) {
    meal.slug = slugify(meal.title, { lower: true });
    meal.instructions = xss(meal.instructions);

    const extension = meal.image.name.split(".").pop();
    const fileName = `${meal.slug}${Math.random()}.${extension}`;

    const stream = fs.createWriteStream(`public/images/${fileName}`);
    const bufferedImage = await meal.image.arrayBuffer(); //returns Promise

    try {
      stream.write(
        //requires to convert array buffer to buffer
        Buffer.from(bufferedImage)
      );
    } catch (error) {
      if (error) {
        throw new Error("Failed to save image");
      }
    }

    meal.image = `/images/${fileName}`;

    db.prepare(
      `
    INSERT INTO meals (title, summary, slug, instructions, image, creator, creator_email)
    VALUES (@title, @summary, @slug, @instructions, @image, @creator, @creator_email)`
    ).run(meal);
  }
}
