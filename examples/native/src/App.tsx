import {
  defaultNativeWebControlElements,
  QueryBuilderNative,
} from '@react-querybuilder/native';
import { extendTheme, NativeBaseProvider } from 'native-base';
import { useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type {
  Field,
  FullOptionList,
  Option,
  RuleGroupType,
} from 'react-querybuilder';
import { formatQuery } from 'react-querybuilder';
import { nativeBaseControlElements } from './components';
import { NativeValueSelectorExample } from './components/NativeValueSelectorExample';

const fields: Field[] = [
  { name: 'firstName', label: 'First Name' },
  { name: 'lastName', label: 'Last Name' },
];

const defaultQuery: RuleGroupType = {
  combinator: 'and',
  rules: [
    { field: 'firstName', operator: 'beginsWith', value: 'Stev' },
    { field: 'lastName', operator: 'in', value: 'Vai, Vaughan' },
  ],
};

type UILib =
  | 'default'
  | 'native-base'
  | 'paper'
  | 'kitten'
  | 'fluentui'
  | 'tamagui';

const uiLibs: FullOptionList<Option<UILib>> = [
  { name: 'default', value: 'default', label: 'Default components' },
  { name: 'native-base', value: 'native-base', label: 'NativeBase' },
  // TODO: add examples these UI libraries
  // { name: 'paper', label: 'React Native Paper' },
  // { name: 'kitten', label: 'Kitten' },
  // { name: 'fluentui', label: 'Fluent UI' },
  // { name: 'tamagui', label: 'Tamagui' },
];

const nativeBaseTheme = extendTheme({
  config: {
    // initialColorMode: 'dark',
  },
});

const LibSelector = ({ libSetter }: { libSetter: (lib: UILib) => void }) => {
  return (
    <NativeValueSelectorExample
      options={uiLibs}
      handleOnChange={v => libSetter(v)}
      path={[]}
      level={0}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      schema={{} as any}
    />
  );
};

export const App = () => {
  const [uiLib, setUIlib] = useState<UILib>('default');
  const [query, setQuery] = useState(defaultQuery);
  const controlElements = useMemo(() => {
    switch (uiLib) {
      case 'native-base':
        return nativeBaseControlElements;
    }
    return {
      ...defaultNativeWebControlElements,
      valueSelector: NativeValueSelectorExample,
    };
  }, [uiLib]);

  return (
    <NativeBaseProvider theme={nativeBaseTheme}>
      <View style={styles.outer}>
        <Text style={styles.outer}>
          React Query Builder React Native Example
        </Text>
        <LibSelector libSetter={setUIlib} />
        <QueryBuilderNative
          fields={fields}
          query={query}
          onQueryChange={setQuery}
          controlElements={controlElements}
        />
        <Text style={styles.code}>{formatQuery(query, 'sql')}</Text>
      </View>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  outer: {
    padding: 10,
  },
  code: {
    fontFamily: 'sans-serif',
  },
});
