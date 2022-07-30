import React from "react";
import { Person } from "./models";
import { PeopleService } from "./services/people";

export const generateRows = (
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

export const clearRows = (root: HTMLElement): void => {
  while (root.firstChild) {
    root.removeChild(root.firstChild);
  }
};

export const toggleLoading = (loadingElement: HTMLElement): void => {
  const currentState = loadingElement.style.display;
  loadingElement.style.display = currentState === "none" ? "" : "none";
};

export const resetInput = (
  event: KeyboardEvent | React.KeyboardEvent<HTMLDivElement>,
  filter: HTMLInputElement | null,
  mult: HTMLInputElement | null
) => {
  if (filter && mult && event.key === "Escape") {
    filter.value = "";
    mult.value = "10";

    filter.dispatchEvent(new Event("input", { bubbles: true }));
  }
};
