// Note: The HTML for this challenge can be found in index.html
import {
  clearRows,
  generateRows,
  resetInput,
  setLoading,
} from "./render.utils";
import { PeopleService } from "./services/people";

const filterElement = document.getElementById("filter") as HTMLInputElement;
const multiplyElement = document.getElementById(
  "multiplier"
) as HTMLInputElement;
const loadingElement = document.getElementById("loader") as HTMLElement;
const characterContainer = document.getElementById("tbody") as HTMLElement;
const rootElement = document.getElementById("vanilla") as HTMLElement;

// Note: this function is run inside of src/main.tsx
export function runVanillaApp() {
  const sub = PeopleService.read().subscribe((peeps) => {
    sub.unsubscribe();

    generateRows(characterContainer, Number(multiplyElement.value), ...peeps);
    setLoading(loadingElement, false);

    rootElement.addEventListener("keyup", (e: KeyboardEvent) => {
      resetInput(e, filterElement, multiplyElement);
    });

    filterElement.addEventListener("input", (e: Event) => {
      clearRows(characterContainer);
      generateRows(
        characterContainer,
        Number(multiplyElement.value),
        ...PeopleService.filter(filterElement.value, peeps)
      );
    });

    multiplyElement.addEventListener("input", () => {
      clearRows(characterContainer);
      generateRows(
        characterContainer,
        Number(multiplyElement.value),
        ...PeopleService.filter(filterElement.value, peeps)
      );
    });
  });
}
