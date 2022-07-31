export class Subject<T> {
  public observers: Observer<T>[] = [];
  public value: T | undefined;

  public next(event: T): void {
    this.observers.forEach((sub) => sub.notify(event));
    this.value = event;
  }

  public subscribe(cb: (arg: T) => void): Observer<T> {
    const obs = new Observer(cb, this, this.observers.length);

    if (this.value) {
      console.log("Found an existing value, notifying new observer.");
      obs.notify(this.value);
    }

    this.observers.push(obs);

    return obs;
  }
}

export class Observer<T> {
  constructor(
    public notify: (arg: T) => void,
    private subject: Subject<T>,
    private index: number
  ) {}

  public unsubscribe(): void {
    this.subject.observers.splice(this.index, 1);
  }
}
