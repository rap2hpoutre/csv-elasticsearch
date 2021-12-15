import { importCsv } from "../src/index";
import { Client } from "@elastic/elasticsearch";
import * as fs from "fs";

jest.mock("@elastic/elasticsearch", () => ({
  Client: jest.fn().mockImplementation(() => {
    return {
      bulk: jest.fn().mockImplementation(async ({ body }) => {
        global.ESMOCK_totalItemsCount = body.length / 2;
        return {
          body: {
            errors: 0,
          },
        };
      }),
      count: jest.fn().mockImplementation(async ({ index }) => {
        return {
          body: {
            count: global.ESMOCK_totalItemsCount,
          },
        };
      }),
    };
  }),
}));

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
