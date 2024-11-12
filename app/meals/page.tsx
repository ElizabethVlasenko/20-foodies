import Link from "next/link";
import MealsGrid from "../_components/meals/meals-grid";

import { Suspense } from "react";
import { getMeals, type MealsData } from "../_lib/meals";
import classes from "./page.module.css";

export const metadata = {
  title: "All Meals",
  description: "Browse the delicious meals shared by our vibrant community.",
};

async function Meals() {
  const meals = (await getMeals()) as MealsData;

  return <MealsGrid meals={meals} />;
}

function Page() {
  return (
    <>
      <header className={classes.header}>
        <h1>
          Delicious meals created{" "}
          <span className={classes.highlight}>by you</span>
        </h1>
        <p>Choose your favorite recipes and cook it yourself </p>
        <p className={classes.cta}>
          <Link href="/meals/share">Share Your Favorite Recipes</Link>
        </p>
      </header>
      <main className={classes.main}>
        <Suspense
          fallback={<p className={classes.loading}>Fetching meals...</p>}
        >
          <Meals />
        </Suspense>
      </main>
    </>
  );
}

export default Page;
