import { PaginationResult } from "../../models/pagination.result";
import { Person } from "../../models/person";

export class PeopleService {
  // https://swapi.dev/api/people/?format=json

  public static async read(): Promise<Person[]> {
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

  public static filter(query: string, people: Person[]): Person[] {
    return people.filter((p) =>
      p.name.toLowerCase().startsWith(query.toLowerCase())
    );
  }
}
