import Image from "next/image";
import classes from "./page.module.css";
import { getMeal } from "../../_lib/meals";
import { notFound } from "next/navigation";

type PageProps = {
  params: {
    mealId: string;
  };
};

export async function generateMetadata({ params }: PageProps) {
  const meal = await getMeal(params.mealId);

  if (!meal) {
    notFound();
  }

  return {
    title: meal.title,
    description: meal.summary,
  };
}

async function Page({ params }: PageProps) {
  const meal = await getMeal(params.mealId);

  if (!meal) {
    notFound();
  }

  meal.instructions = meal.instructions.replace(/\n/g, "<br />");

  return (
    <>
      <header className={classes.header}>
        <div className={classes.image}>
          <Image fill src={meal.image} alt={meal.title} />
        </div>
        <div className={classes.headerText}>
          <h1>{meal.title}</h1>
          <p className={classes.creator}>
            by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
          </p>
          <p className={classes.summary}>{meal.summary}</p>
        </div>
      </header>
      <main className={classes.header}>
        <p
          className={classes.instructions}
          dangerouslySetInnerHTML={{ __html: meal.instructions }}
        ></p>
      </main>
    </>
  );
}

export default Page;
