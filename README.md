# Csv ElasticSearch

[![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blueviolet.svg)](http://unlicense.org/)
[![Version](https://img.shields.io/npm/v/csv-elasticsearch.svg)](https://npmjs.org/package/csv-elasticsearch)
[![CodeQL](https://github.com/rap2hpoutre/csv-elasticsearch/workflows/CodeQL/badge.svg)](https://github.com/rap2hpoutre/csv-elasticsearch-dataset/actions?query=codeql-analysis "Code quality workflow status")
[![Build and release](https://github.com/rap2hpoutre/csv-elasticsearch/actions/workflows/release.yml/badge.svg)](https://github.com/rap2hpoutre/csv-elasticsearch-dataset/actions?query=release)

Import a CSV file into ElasticSearch.

## Installation

```sh
npm i --save csv-elasticsearch
# or
yarn add csv-elasticsearch
```

## Usage

You have to import `importCsv` function, then call it with three params:
 - **client**: elasticsearch client thanks to [@elastic/elasticsearch](https://www.npmjs.com/package/@elastic/elasticsearch)
 - **index**: elasticsearch index name.
 - **filePath**: path to CSV file.

```ts
import { importCsv } from "csv-elasticsearch";
import { Client } from "@elastic/elasticsearch";

(async () => {
  const result = await importCsv({
    client: new Client({ node: "http://localhost:9200" }),
    index: "my_index",
    filePath: "./data.csv",
  });

  console.log(result);
})();
```

Result in console:

```
{
  count: 1000,
  erroredDocuments: []
}
```

Search created documents: http://localhost:9200/my_index/_search?pretty

## Test and build

Run test with [jest](https://jestjs.io/):

```
yarn dev
```

Build with [ncc](https://github.com/vercel/ncc):

```
ncc build src/index.ts
```
