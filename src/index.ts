import { MatchReader } from "./MatchReader";
import { Summary } from "./Summary";

// const csvFileReader = new CsvFileReader("football.csv");
const matchReader = MatchReader.fromCsv("football.csv");
matchReader.load();

// const summary = new Summary(new WinsAnalysis("Man United"), new HtmlReport());

// summary.buildAndPrintReport(matchReader.matches);

const summary = Summary.winsAnalysisWithHtmlReport("Man United");

summary.buildAndPrintReport(matchReader.matches);
