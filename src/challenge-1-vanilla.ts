// Note: The HTML for this challenge can be found in index.html
import { Person } from "./models";
import {
  clearRows,
  generateRows,
  resetInput,
  setLoading,
} from "./render.utils";
import { PeopleService } from "./services/people";
import { Observer } from "./services/people/people.observer";

export function runVanillaApp(
  rootElement = document.getElementById("vanilla") as HTMLElement,
  characterContainer = document.getElementById("tbody") as HTMLElement,
  multiplyElement = document.getElementById("multiplier") as HTMLInputElement,
  filterElement = document.getElementById("filter") as HTMLInputElement,
  loadingElement = document.getElementById("loader") as HTMLElement
): Observer<Person[]> {
  rootElement.tabIndex = 0;
  return PeopleService.read().subscribe((peeps) => {
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
