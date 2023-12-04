# Using Typescript with Node

Type definition file still required

```
npm install @types/node
```

# Enum

To represent very close values
Just to tell other engineer that these 3 values are tied together

```
enum MatchResult {
  HomeWin = "H",
  AwayWin = "A",
  Draw = "D",
}
```

# Class for reading file good example

```
export class CsvFileReader {
  data: string[][] = [];

  constructor(public filename: string) {}

  read(): void {
    this.data = fs
      .readFileSync(this.filename, {
        encoding: "utf-8",
      })
      .split("\n")
      .map((row: string): string[] => row.split(","));
  }
}
```

# Type Assertion

It's overwriting what TS thinks the value is
In this example the Match result data type was string
But we have an enum of Match Result so we want TS to think that instead of string , it's MatchResult type

```
 row[5] as MatchResult
```

# Defining types

```

type MatchData = [Date, string, string, number, number, MatchResult, string];
export class CsvFileReader {
  data: MatchData[] = [];
  }
```

The reason we have to use [] again after MatchData even tho it's already an Array is the MatchData only defines the structure it's not telling what it is so we need []

# Generics

1. It's like an argument but it's for class def
2. Make code more reuseable
3. You can decide the data type on the fly

Create a class where you will be defining the 'data' in it
when you create a new instance with this class constructor

- TypeofData can be any name. People commonly use <T>

```
class holdAnything <TypeOfData>   {
  constructor(public data : TypeOfData){
  }
}
```

```
const holdNumber = new holdAnything<number>(123);
const holdString = new holdAnything<string>("ABCDE");
```

Note that you can use <T> with anything. Output Property anything

# Second Refactor using Composition

- We will create a class for each csv file type reader
  and have it take in a way of reading the csv file as DataReader
  making CsbFileReader more generic

# Let's break down the 2 refactors

1. Inheritance ( classes that has "IS a" relationship )
   ==> A class is consider to be another class because it's created based on that another class

- We have a main abstract class : CsvFileReader with the core functionality (reaing the csv file)
- Then the children takes the abstract class and extends => to support more speficied task

2. Composition ( classes that has "HAS a" relationship )
   ==> A class that has another object reference

- A class depends on another object to the the stuffs
- This will allow user to swap in out the object based on what they want the class to do

So Inheritance is more like duplicate the Parents and add something this not allow us to swap thing in and out on the fly

Composition is more like I have my object but I'll refer to another object which we can swap in and out

Don't mix composition with multiple Inheritance if there's a copy and paste all of the
obj def in to another it's probally inheritance

# Implements vs Extends

Implements are used when you want a class constructor to meet the implements requirement
Extends you are using the parent class as a based to create a new class

# The key of the last refactor Composition

This is a good way building a class with strong stucture

```
export class Summary {
  constructor(public analyzer: Analyzer, public outputTarget: OutputTarget) {}
  buildAndPrintReport(matches: MatchData[]): void {
    const output = this.analyzer.run(matches);
    this.outputTarget.print(output);
  }
}
```

We have Analyzer , OutputTarget everything set in another files
then the Summary class work as a boss to pick this use that -ish

```
const summary = new Summary(
  new WinsAnalysis("Man United"),
  new HtmlReport()
  );
```

Look how easy we can just swap out new OutputReport to HtmlReport and it still works. Thanks to the structure we've build also both class is following the Output Interface so it's easy to implement this

# Static Method

A way of defining a class argument without using the new keyword
It's like a pre-configure when you know this class MUST have this method or must take in this obj you can set it beforehand

```
export class MatchReader {
  static fromCsv(filename: string): MatchReader {
    return new MatchReader(new CsvFileReader(filename));
  }
}
```

Static method allows us to do something like

```
MatchReader.fromCsv('football.csv')
```

By doing this we will create a new instance of MatchReader
but the handy part is we don't have to do

```
const match = new MatchReader( new CsvFileReader('football.csv') )
```

all the time that make the codes in index.ts a bit cleaner

Before refactoring import in index.ts file

```
import { CsvFileReader } from "./CsvFileReader";
import { MatchReader } from "./MatchReader";
import { WinsAnalysis } from "./analyzers/WinsAnalysis";
import { ConsoleReport } from "./reportTargets/ConsoleReport";
import { Summary } from "./Summary";
import { HtmlReport } from "./reportTargets/HtmlReport";
```

After

```
import { MatchReader } from "./MatchReader";
import { Summary } from "./Summary";
```
