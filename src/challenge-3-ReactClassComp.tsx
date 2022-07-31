import React from "react";
import { Component } from "react";
import { runVanillaApp } from "./challenge-1-vanilla";
import { Person } from "./models";
import { Observer } from "./services/people/people.observer";

class ClassComp extends Component {
  private rowContainer = React.createRef<HTMLTableSectionElement>();

  private loadingElement = React.createRef<HTMLDivElement>();

  private filterInput = React.createRef<HTMLInputElement>();

  private multiplierInput = React.createRef<HTMLInputElement>();

  private rootContainer = React.createRef<HTMLDivElement>();

  private subscription: Observer<Person[]> | undefined;

  componentDidMount() {
    if (
      this.rootContainer.current &&
      this.rowContainer.current &&
      this.multiplierInput.current &&
      this.filterInput.current &&
      this.loadingElement.current
    ) {
      if (this.subscription) {
        this.subscription.unsubscribe();
      }
      this.subscription = runVanillaApp(
        this.rootContainer.current,
        this.rowContainer.current,
        this.multiplierInput.current,
        this.filterInput.current,
        this.loadingElement.current
      );
    }
  }

  componentWillUnmount() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  render() {
    return (
      <div ref={this.rootContainer} id="class-comp">
        <h2>React Class Component</h2>
        Filter: <input
          placeholder="Filter by name"
          ref={this.filterInput}
        />{" "}
        Multiplier:{" "}
        <input
          ref={this.multiplierInput}
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
