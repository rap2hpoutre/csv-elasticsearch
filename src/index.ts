import { Client } from "@elastic/elasticsearch";
import { parse } from "csv-parse";
import * as fs from "fs";

interface ImportCsvOptions {
  client: Client;
  index: string;
  filePath: string;
}

// the main function takes a csv file and send it to elasticsearch
export async function importCsv(options: ImportCsvOptions) {
  const { client, index, filePath } = options;
  const fileContent = fs.readFileSync(filePath, "utf8");
  const parser = parse(fileContent, {
    columns: true,
    skip_empty_lines: true,
  });
  const records = [];
  for await (const record of parser) {
    records.push(record);
  }

  const body = records.flatMap((doc) => [{ index: { _index: index } }, doc]);

  // Delete index
  try {
    await client.indices.delete({ index });
  } catch (e) {}

  const { body: bulkResponse } = await client.bulk({ refresh: true, body });

  const erroredDocuments = [];
  if (bulkResponse.errors) {
    bulkResponse.items.forEach((action, i) => {
      const operation = Object.keys(action)[0];
      if (action[operation].error) {
        erroredDocuments.push({
          status: action[operation].status,
          error: action[operation].error,
          operation: body[i * 2],
          document: body[i * 2 + 1],
        });
      }
    });
  }

  const { body: countBody } = await client.count({ index });
  return {
    count: countBody.count,
    erroredDocuments,
  };
}
