import { PaginationResult } from "../../models/pagination.result";
import { Person } from "../../models/person";
import { Observer, Subject } from "./people.stalker";

export class PeopleService {
  // https://swapi.dev/api/people/?format=json

  private static peopleStalker = new Subject<Person[]>();

  private static async collectData(): Promise<Person[]> {
    const result: Person[] = [];

    let currentPageQuery: string | undefined =
      "https://swapi.dev/api/people/?format=json";

    while (currentPageQuery) {
      const response = await fetch(currentPageQuery, {
        method: "GET",
      });

      const json = (await response.json()) as PaginationResult<Person>;

      json.results.forEach((res) => {
        result.push({
          name: res.name,
          height: Number(res.height) || undefined,
          mass: Number(res.mass) || undefined,
        });
      });

      currentPageQuery = json.next;
    }

    return result;
  }

  public static read(): Subject<Person[]> {
    // already has subscribers
    if (this.peopleStalker.observers.length) {
      console.log("Already calling people api.");
      return this.peopleStalker;
    }

    console.log("Collecting data from people API");
    this.collectData().then((r) => {
      console.log(
        "Notifying ",
        this.peopleStalker.observers.length,
        " people subscribers."
      );
      this.peopleStalker.next(r);
    });

    return this.peopleStalker;
  }

  public static filter(query: string, people: Person[]): Person[] {
    return people.filter((p) =>
      p.name.toLowerCase().startsWith(query.toLowerCase())
    );
  }
}
