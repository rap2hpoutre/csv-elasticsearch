import { importCsv } from "./index";
import { Client } from "@elastic/elasticsearch";
import * as fs from "fs";

test("importCsv", async () => {
  fs.writeFileSync(
    "./test.csv",
    `id,name,age\n1,John,25\n2,Jane,24\n3,Jack,23`
  );
  const client = new Client({ node: "http://localhost:9200" });
  const index = "drop-this-index";
  const filePath = "./test.csv";
  const result = await importCsv({ client, index, filePath });
  expect(result.count).toBe(3);
  expect(result.erroredDocuments).toEqual([]);
});
