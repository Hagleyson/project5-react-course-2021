import { useEffect, useState } from "react";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
  const [dummyMeals, setDummyMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        "https://react-http-cf8b9-default-rtdb.firebaseio.com/meals.json"
      );
      const responseData = await response.json();
      const loadMeals = [];
      for (const key in responseData) {
        const data = responseData[key];
        loadMeals.push({
          id: key,
          description: data.description,
          name: data.name,
          price: data.price,
        });
      }
      setDummyMeals(loadMeals);
      setIsLoading(false);
    };
    fetchMeals();
  }, []);

  if (isLoading) {
    return (
      <section className={classes.MealsLoading}>
        <p>Loading...</p>
      </section>
    );
  }
  const mealsList = dummyMeals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));
  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};
export default AvailableMeals;
