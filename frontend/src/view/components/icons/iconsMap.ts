import { Clothes } from "././categories/expense/Clothes";
import { Education } from "././categories/expense/Education";
import { Expense } from "././categories/expense/Expense";
import { Food } from "././categories/expense/Food";
import { Fun } from "././categories/expense/Fun";
import { Grocery } from "././categories/expense/Grocery";
import { Home } from "././categories/expense/Home";
import { Transport } from "././categories/expense/Transport";
import { Travel } from "././categories/expense/Travel";
import { Income } from "./categories/income/Income";

export const iconsMap = {
  income: {
    default: Income,
  },
  expense: {
    default: Expense,
    food: Food,
    fun: Fun,
    grocery: Grocery,
    home: Home,
    education: Education,
    clothes: Clothes,
    transport: Transport,
    travel: Travel,
  },
};
