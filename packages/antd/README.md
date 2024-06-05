## @react-querybuilder/antd

Official [react-querybuilder](https://npmjs.com/package/react-querybuilder) components for [Ant Design](https://ant.design/).

To see them in action, check out the [`react-querybuilder` demo](https://react-querybuilder.js.org/demo/antd) or [load the example in CodeSandbox](https://githubbox.com/react-querybuilder/react-querybuilder/tree/main/examples/antd).

**[Full documentation](https://react-querybuilder.js.org/)**

## Installation

```bash
npm i react-querybuilder @react-querybuilder/antd @ant-design/icons antd
# OR yarn add / pnpm add / bun add
```

## Usage

To render Ant Design-compatible components in the query builder, wrap the `<QueryBuilder />` element in `<QueryBuilderAntD />`.

```tsx
import { QueryBuilderAntD } from '@react-querybuilder/antd';
import { QueryBuilder, RuleGroupType } from 'react-querybuilder';

const fields = [
  { name: 'firstName', label: 'First Name' },
  { name: 'lastName', label: 'Last Name' },
];

const App = () => {
  const [query, setQuery] = useState<RuleGroupType>({ combinator: 'and', rules: [] });

  return (
    <QueryBuilderAntD>
      <QueryBuilder fields={fields} query={query} onQueryChange={setQuery} />
    </QueryBuilderAntD>
  );
};
```

## Notes

- You may also want to reduce the width of the value editor component (100% by default) with the following CSS rule:

  ```css
  .queryBuilder .ant-input {
    width: auto;
  }
  ```

- This package exports `antdControlElements` which can be assigned directly to the `controlElements` prop on `<QueryBuilder />` (and also exports each component individually), but wrapping `<QueryBuilder />` in `<QueryBuilderAntD />` is the recommended method.
