import React from "react";
import { Person } from "./models";
import { PeopleService } from "./services/people";

export const generateRows = (
  root: HTMLElement | null,
  multiplier?: number,
  ...people: Person[]
): void => {
  if (!root) {
    return;
  }

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

    root.appendChild(row);
  });
};

export const clearRows = (root: HTMLElement | null): void => {
  while (root && root.firstChild) {
    root.removeChild(root.firstChild);
  }
};

export const setLoading = (
  loadingElement: HTMLElement | null,
  loading?: boolean
): void => {
  if (loadingElement) {
    loadingElement.style.display = loading ? "" : "none";
  }
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
