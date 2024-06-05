---
title: Buildless
hide_table_of_contents: true
---

React Query Builder can be used directly in the browser without a build step using ESM. Babel can be used to parse JSX in a `script` tag.

## Basic example

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>React Query Builder ESM</title>
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/react-querybuilder@latest/dist/query-builder.css" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module">
      import React from 'https://cdn.jsdelivr.net/npm/react@18.2.0/+esm';
      import ReactDOM from 'https://cdn.jsdelivr.net/npm/react-dom@18.2.0/+esm';
      import { QueryBuilder } from 'https://cdn.jsdelivr.net/npm/react-querybuilder@latest/+esm';
      // Make the imports available to the Babel script below
      window.React = React;
      window.ReactDOM = ReactDOM;
      window.QueryBuilder = QueryBuilder;
    </script>
    <script crossorigin src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
    <script type="text/babel">
      const fields = [
        {
          name: 'firstName',
          label: 'First Name',
          placeholder: 'Enter first name',
        },
        {
          name: 'lastName',
          label: 'Last Name',
          placeholder: 'Enter last name',
        },
      ];

      const defaultQuery = {
        combinator: 'and',
        rules: [
          { field: 'firstName', operator: '=', value: 'Steve' },
          { field: 'lastName', operator: '=', value: 'Vai' },
        ],
      };

      ReactDOM.createRoot(document.getElementById('root')).render(
        <QueryBuilder fields={fields} defaultQuery={defaultQuery} />
      );
    </script>
  </body>
</html>
```

## Drag-and-drop example

To add drag-and-drop capability, import `react-dnd`, `react-dnd-html5-backend`, and `@react-querybuilder/dnd`. Nest `<QueryBuilder />` inside `<QueryBuilderDnD />` and spread the `react-dnd*` exports to the `dnd` prop.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>React Query Builder ESM (DnD)</title>
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/react-querybuilder@latest/dist/query-builder.css" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module">
      import React from 'https://cdn.jsdelivr.net/npm/react@18.2.0/+esm';
      import ReactDOM from 'https://cdn.jsdelivr.net/npm/react-dom@18.2.0/+esm';
      import { QueryBuilder } from 'https://cdn.jsdelivr.net/npm/react-querybuilder@latest/+esm';
      // highlight-start
      import * as ReactDnD from 'https://cdn.jsdelivr.net/npm/react-dnd@16.0.0/+esm';
      import * as ReactDndHtml5Backend from 'https://cdn.jsdelivr.net/npm/react-dnd-html5-backend@16.0.0/+esm';
      import { QueryBuilderDnD } from 'https://cdn.jsdelivr.net/npm/@react-querybuilder/dnd@latest/+esm';
      // highlight-end
      // Make the imports available to the Babel script below
      window.React = React;
      window.ReactDOM = ReactDOM;
      window.QueryBuilder = QueryBuilder;
      // highlight-start
      window.ReactDnD = ReactDnD;
      window.ReactDndHtml5Backend = ReactDndHtml5Backend;
      window.QueryBuilderDnD = QueryBuilderDnD;
      // highlight-end
    </script>
    <script crossorigin src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
    <script type="text/babel">
      const fields = [
        {
          name: 'firstName',
          label: 'First Name',
          placeholder: 'Enter first name',
        },
        {
          name: 'lastName',
          label: 'Last Name',
          placeholder: 'Enter last name',
        },
      ];

      const defaultQuery = {
        combinator: 'and',
        rules: [
          { field: 'firstName', operator: '=', value: 'Steve' },
          { field: 'lastName', operator: '=', value: 'Vai' },
        ],
      };

      ReactDOM.createRoot(document.getElementById('root')).render(
        // highlight-start
        <QueryBuilderDnD dnd={{ ...ReactDnD, ...ReactDndHtml5Backend }}>
          // highlight-end
          <QueryBuilder fields={fields} defaultQuery={defaultQuery} />
          // highlight-start
        </QueryBuilderDnD>
        // highlight-end
      );
    </script>
  </body>
</html>
```
