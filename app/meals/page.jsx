import Link from "next/link";
import MealsGrid from "../_components/meals/meals-grid";

import classes from "./page.module.css";
import { getMeals } from "../_lib/meals";
import { Suspense } from "react";
import Loading from "./loading";

async function Meals() {
  const meals = await getMeals();

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
