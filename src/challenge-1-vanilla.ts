// Note: The HTML for this challenge can be found in index.html

import { Person } from "./models";
import { PeopleService } from "./services/people";

const filterElement = document.getElementById("filter") as HTMLInputElement;
const multiplyElement = document.getElementById(
  "multiplier"
) as HTMLInputElement;
const loadingElement = document.getElementById("loader") as HTMLElement;
const characterContainer = document.getElementById("tbody") as HTMLElement;
const rootElement = document.getElementById("vanilla") as HTMLElement;

const generateRows = (
  root: HTMLElement,
  multiplier?: number,
  ...people: Person[]
): void => {
  people.forEach((p) => {
    const row = document.createElement("tr");
    const name = document.createElement("td");
    const height = document.createElement("td");
    const mass = document.createElement("td");
    const power = document.createElement("td");

    name.textContent = p.name;
    height.textContent = p.height?.toString() || "N/A";
    mass.textContent = p.mass?.toString() || "N/A";
    power.textContent = String(
      (p.mass || 1) * (p.height || 1) * (multiplier || 1)
    );

    row.append(name, height, mass, power);

    root?.appendChild(row);
  });
};

const clearRows = (root: HTMLElement): void => {
  while (root.firstChild) {
    root.removeChild(root.firstChild);
  }
};

// Note: this function is run inside of src/main.tsx
export function runVanillaApp() {
  loadingElement.style.display = "";

  PeopleService.read()
    .then((peeps) => {
      generateRows(characterContainer, Number(multiplyElement.value), ...peeps);
      loadingElement.style.display = "none";

      rootElement.addEventListener("keyup", (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          filterElement.value = "";
          multiplyElement.value = "10";

          filterElement.dispatchEvent(new Event("input", { bubbles: true }));
        }
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
    })
    .catch((e) => console.error("wee woo", e));
}
