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

You need a CSV file and ElasticSearch.

```ts
import { importCsv } from "csv-elasticsearch";
import { Client } from "@elastic/elasticsearch";

(async () => {
  const client = new Client({ node: "http://localhost:9200" });

  const result = await importCsv({
    client,
    index: "my_index",
    filePath: "./data.csv",
  });

  console.log(result);
})();
```
