import { useEffect, useRef, useState } from "react";
import { Person } from "./models";
import {
  clearRows,
  generateRows,
  resetInput,
  toggleLoading,
} from "./render.utils";
import { PeopleService } from "./services/people";

function FunctionalComp() {
  const loadingElement = useRef<HTMLDivElement>(null);
  const [peopleStore, setPeopleStore] = useState<Person[]>([]);

  useEffect(() => {
    PeopleService.read().subscribe((p) => {
      if (loadingElement.current) {
        setPeopleStore(p);
        toggleLoading(loadingElement.current);
      }
    });
  }, [setPeopleStore, loadingElement.current]);

  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    setPeople(peopleStore);
  }, [peopleStore]);

  const rowContainer = useRef<HTMLTableSectionElement>(null);
  const filterInput = useRef<HTMLInputElement>(null);
  const multiplierInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (rowContainer.current) {
      clearRows(rowContainer.current);
      generateRows(
        rowContainer.current,
        Number(multiplierInput.current?.value || 10),
        ...people
      );
    }
  }, [people, rowContainer.current, multiplierInput.current]);

  return (
    <div
      id="functional-comp"
      onKeyUp={(e) => {
        resetInput(e, filterInput.current, multiplierInput.current);
      }}
    >
      <h2>React Functional Component</h2>
      Filter:{" "}
      <input
        ref={filterInput}
        onInput={() =>
          setPeople(
            PeopleService.filter(filterInput.current?.value || "", peopleStore)
          )
        }
        placeholder="Filter by name"
      />{" "}
      Multiplier:{" "}
      <input
        ref={multiplierInput}
        onInput={() => {
          clearRows(rowContainer.current as HTMLElement);
          generateRows(
            rowContainer.current as HTMLElement,
            Number(multiplierInput.current?.value) || 10,
            ...people
          );
        }}
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
