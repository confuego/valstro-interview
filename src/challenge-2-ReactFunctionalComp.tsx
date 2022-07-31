import { useEffect, useRef, useState } from "react";
import { runVanillaApp } from "./challenge-1-vanilla";
import { Person } from "./models";
import { Observer } from "./services/people/people.observer";

function FunctionalComp() {
  const rootContainer = useRef<HTMLDivElement>(null);
  const loadingElement = useRef<HTMLDivElement>(null);
  const rowContainer = useRef<HTMLTableSectionElement>(null);
  const filterInput = useRef<HTMLInputElement>(null);
  const multiplierInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let sub: Observer<Person[]> | undefined;
    if (
      rootContainer.current &&
      rowContainer.current &&
      multiplierInput.current &&
      filterInput.current &&
      loadingElement.current
    ) {
      sub = runVanillaApp(
        rootContainer.current,
        rowContainer.current,
        multiplierInput.current,
        filterInput.current,
        loadingElement.current
      );
    }

    return () => {
      sub?.unsubscribe();
    };
  }, [
    rootContainer.current,
    rowContainer.current,
    multiplierInput.current,
    filterInput.current,
    loadingElement.current,
  ]);

  return (
    <div ref={rootContainer} id="functional-comp">
      <h2>React Functional Component</h2>
      Filter: <input ref={filterInput} placeholder="Filter by name" />{" "}
      Multiplier:{" "}
      <input
        ref={multiplierInput}
        placeholder="Multiplier"
        type="number"
        min="1"
        max="20"
        defaultValue="10"
      />{" "}
      Press "Escape" to reset fields
      <div ref={loadingElement} className="loader">
        Loading...
      </div>
      <table width="100%">
        <thead>
          <tr>
            <th>Name</th>
            <th>Height</th>
            <th>Mass</th>
            <th>Power</th>
          </tr>
        </thead>
        <tbody ref={rowContainer}></tbody>
      </table>
    </div>
  );
}

export default FunctionalComp;
