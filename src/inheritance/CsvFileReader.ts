import fs from "fs";

export abstract class CsvFileReader<T> {
  data: T[] = [];
  constructor(public filename: string) {}

  //Isolate the custom logic that only works with each csv file
  // ex. footbal.csv
  abstract mapRow(row: string[]): T;

  //This is useable for any CSV file
  read(): void {
    this.data = fs
      .readFileSync(this.filename, {
        encoding: "utf-8",
      })
      .split("\n")
      .map((row: string): string[] => row.split(","))
      .map(this.mapRow);
  }
}
