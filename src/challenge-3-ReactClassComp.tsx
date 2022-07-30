import React from "react";
import { Component } from "react";
import { Person } from "./models";
import {
  clearRows,
  generateRows,
  resetInput,
  setLoading,
} from "./render.utils";
import { PeopleService } from "./services/people";

class ClassComp extends Component<
  undefined,
  { peopleStore: Person[]; people: Person[] }
> {
  private rowContainer = React.createRef<HTMLTableSectionElement>();

  private loadingElement = React.createRef<HTMLDivElement>();

  private filterInput = React.createRef<HTMLInputElement>();

  private multiplierInput = React.createRef<HTMLInputElement>();

  componentDidMount() {
    console.log("Did mount.");
    setLoading(this.loadingElement.current, true);
    this.collectPeople();
  }

  componentDidUpdate() {
    setLoading(this.loadingElement.current, false);
    console.log("Did update", this.rowContainer.current);
    clearRows(this.rowContainer.current);
    generateRows(
      this.rowContainer.current,
      Number(this.multiplierInput.current?.value) || 10,
      ...this.state.people
    );
  }

  collectPeople() {
    PeopleService.read().subscribe((p) => {
      this.setState((s) => {
        return { peopleStore: p, people: p };
      });
    });
  }

  render() {
    return (
      <div
        id="class-comp"
        onKeyDown={(e) => {
          resetInput(e, this.filterInput.current, this.multiplierInput.current);
        }}
      >
        <h2>React Class Component</h2>
        Filter:{" "}
        <input
          placeholder="Filter by name"
          ref={this.filterInput}
          onInput={() => {
            this.setState((s) => {
              return {
                peopleStore: s.peopleStore,
                people: PeopleService.filter(
                  this.filterInput.current?.value || "",
                  s.peopleStore
                ),
              };
            });
          }}
        />{" "}
        Multiplier:{" "}
        <input
          ref={this.multiplierInput}
          onInput={() => {
            this.forceUpdate();
          }}
          placeholder="Multiplier"
          type="number"
          min="1"
          max="20"
          defaultValue="10"
        />{" "}
        Press "Escape" to reset fields
        <div ref={this.loadingElement} className="loader">
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
          <tbody ref={this.rowContainer}></tbody>
        </table>
      </div>
    );
  }
}

export default ClassComp;
