import { useRef, useState } from "react";
import Input from "../../UI/Input";
import classes from "./MealItemForm.module.css";

const MealItemForm = (props) => {
  const [formIsValid, setFormIsValid] = useState(true);
  const inputAmountRef = useRef();
  const submitHandler = (event) => {
    event.preventDefault();
    const enteredAmount = +inputAmountRef.current.value;
    if (
      enteredAmount.trim().length === 0 ||
      enteredAmount < 1 ||
      enteredAmount > 5
    ) {
      setFormIsValid(false);
      return;
    }
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={inputAmountRef}
        label="Amount"
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
      {!formIsValid ? <p>Provided inputs are not correct! Try again</p> : null}
    </form>
  );
};

export default MealItemForm;
