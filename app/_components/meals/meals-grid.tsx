import { type MealsData } from "../../_lib/meals";
import MealItem from "./meal-item";
import classes from "./meals-grid.module.css";

type MealsGridProps = {
  meals: MealsData;
};

function MealsGrid({ meals }: MealsGridProps) {
  return (
    <ul className={classes.meals}>
      {meals.map((meal) => (
        <li key={meal.id}>
          <MealItem {...meal} />
        </li>
      ))}
    </ul>
  );
}

export default MealsGrid;
