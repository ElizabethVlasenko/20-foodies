import Link from "next/link";
import MealsGrid from "../_components/meals/meals-grid";

import classes from "./page.module.css";

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
        <MealsGrid meals={[]} />
      </main>
    </>
  );
}

export default Page;
