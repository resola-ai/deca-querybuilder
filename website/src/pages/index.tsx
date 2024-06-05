import Link from '@docusaurus/Link';
import { useColorMode } from '@docusaurus/theme-common';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { QueryBuilderDnD } from '@react-querybuilder/dnd';
import CodeBlock from '@theme/CodeBlock';
import Layout from '@theme/Layout';
import clsx from 'clsx';
import { forwardRef, StrictMode, useEffect, useMemo, useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import * as ReactDnD from 'react-dnd';
import * as ReactDndHtml5Backend from 'react-dnd-html5-backend';
import type {
  ExportFormat,
  RuleGroupType,
  RuleType,
  ValueEditorProps,
  ValueProcessorByRule,
} from 'react-querybuilder';
import {
  defaultOperators,
  defaultValueProcessorByRule,
  QueryBuilder,
  QueryBuilderContext,
} from 'react-querybuilder';
import Select from 'react-select';
import Slider from 'react-slider';
import '../css/index.scss';
import { formatMap, initialQuery } from './demo/_constants';
import { fields } from './demo/_constants/fields';
import { musicalInstruments } from './demo/_constants/musicalInstruments';
import { getFormatQueryString, getExportDisplayLanguage } from './demo/_constants/utils';
import styles from './index.module.css';

const datePickerFields = fields.filter(f => f.name === 'birthdate');
const initialDatePickerQuery: RuleGroupType = {
  combinator: 'and',
  rules: [{ field: 'birthdate', operator: '=', value: new Date() }],
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DateButton = forwardRef<HTMLButtonElement>(({ value, onClick }: any, ref) => (
  <button onClick={onClick} ref={ref}>
    {value} 📅
  </button>
));
const ExtendedValueEditor_DatePicker = (props: ValueEditorProps) => (
  <DatePicker
    selected={props.value}
    onChange={d => props.handleOnChange(d)}
    customInput={<DateButton />}
    dateFormat="yyyy-MM-dd"
  />
);

const selectFields = fields.filter(f => f.name === 'alsoPlays');
const selectOptions = musicalInstruments.map(og => ({
  ...og,
  options: og.options.map(op => ({ ...op, value: op.name })),
}));
const initialSelectQuery: RuleGroupType = {
  combinator: 'and',
  rules: [
    {
      field: 'alsoPlays',
      operator: 'in',
      value: [
        { value: 'Cowbell', label: 'Cowbell' },
        { value: 'More cowbell', label: 'More cowbell' },
      ],
    },
  ],
};
const ExtendedValueEditor_Select = (props: ValueEditorProps) => {
  const isDarkTheme = useColorMode().colorMode === 'dark';
  const [state, setState] = useState(false);
  const isFirstRender = useRef(true);

  // For some reason simply setting the `key` on the `Select` component
  // doesn't trigger the dark mode styles on initial render if the user
  // already has dark mode selected, so this Effect refreshes the component
  // after a short delay.
  useEffect(() => {
    if (isFirstRender.current) {
      setTimeout(() => setState(true), 1000);
      isFirstRender.current = false;
    }
  }, []);

  return (
    <Select
      key={`${isDarkTheme}-${state}`}
      value={props.value}
      isMulti
      onChange={v => props.handleOnChange(v)}
      options={selectOptions}
      styles={{
        control: base => ({ ...base, borderColor: '#8081a2' }),
        container: base => ({ ...base, width: '100%' }),
        menu: base => ({ ...base, zIndex: 99 }),
      }}
      theme={theme =>
        !isDarkTheme
          ? theme
          : {
              ...theme,
              colors: {
                ...theme.colors,
                // primary: theme.colors.primary, // "#2684FF",
                // primary75: theme.colors.primary75, // "#4C9AFF",
                // primary50: theme.colors.primary50, // "#B2D4FF",
                primary25: '#768cad', // "#DEEBFF",
                danger: theme.colors.dangerLight, // "#DE350B",
                dangerLight: theme.colors.danger, // "#FFBDAD",
                neutral0: '#222222', // "hsl(0, 0%, 100%)",
                // neutral5: theme.colors.neutral5, // "hsl(0, 0%, 95%)",
                neutral10: '#525252', // "hsl(0, 0%, 90%)",
                // neutral20: theme.colors.neutral20, // "hsl(0, 0%, 80%)",
                // neutral30: theme.colors.neutral30, // "hsl(0, 0%, 70%)",
                // neutral40: theme.colors.neutral40, // "hsl(0, 0%, 60%)",
                // neutral50: theme.colors.neutral50, // "hsl(0, 0%, 50%)",
                // neutral60: theme.colors.neutral60, // "hsl(0, 0%, 40%)",
                // neutral70: theme.colors.neutral70, // "hsl(0, 0%, 30%)",
                neutral80: '#ffffff', // "hsl(0, 0%, 20%)",
                // neutral90: theme.colors.neutral90, // "hsl(0, 0%, 10%)",
              },
            }
      }
    />
  );
};

const sliderFields = fields.filter(f => f.name === 'age');
const initialSliderQuery: RuleGroupType = {
  combinator: 'and',
  rules: [{ field: 'age', operator: 'between', value: [20, 60] }],
};
const ExtendedValueEditor_Slider = (props: ValueEditorProps) => (
  <div className="slider-wrapper">
    <Slider
      className="slider"
      value={props.value}
      onChange={v => props.handleOnChange(v)}
      renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
      min={0}
      max={100}
      step={10}
    />
  </div>
);

const LandingPage = () => {
  const { siteConfig } = useDocusaurusContext();
  const [query, setQuery] = useState(initialQuery);
  const [exportFormat, setExportFormat] = useState<ExportFormat>('sql');

  const valueProcessor: ValueProcessorByRule | undefined = useMemo(
    () =>
      exportFormat === 'sql'
        ? (rule: RuleType) =>
            `${
              fields.find(f => f.name === rule.field).inputType === 'date' ? `DATE ` : ''
            }${defaultValueProcessorByRule(rule)}`
        : undefined,
    [exportFormat]
  );

  return (
    <Layout description="The Query Builder Component for React">
      <header className={clsx('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link className="button button--secondary button--lg" to="/docs/intro">
              Get started
            </Link>
            <Link className="button button--secondary button--lg" href="/demo">
              Try it out
            </Link>
          </div>
        </div>
      </header>
      <main className={`${styles.main} homepage-showcase`}>
        <QueryBuilderContext.Provider
          value={{ controlClassnames: { queryBuilder: styles.queryBuilder } }}>
          <div className={styles.featureContainer}>
            <div>
              <h2>Sensible defaults</h2>
              <p>Build complex queries with robust out-of-the-box features.</p>
              <p>
                Check out the <Link href="/demo">demo</Link> to see the code that generated this
                query builder.
              </p>
            </div>
            <div>
              <QueryBuilder fields={fields} query={query} onQueryChange={setQuery} />
            </div>
            <div style={{ gap: '1rem' }}>
              <div>
                <span style={{ fontStyle: 'italic' }}>Convert to ⇒ </span>
                <select
                  value={exportFormat}
                  onChange={e => setExportFormat(e.target.value as ExportFormat)}>
                  {formatMap.map(f => (
                    <option key={f[0]} value={f[0]}>
                      {f[1]}
                    </option>
                  ))}
                </select>
              </div>
              <CodeBlock
                className={`${styles.wsPreWrap} ${styles.scrollVert200}`}
                language={getExportDisplayLanguage(exportFormat)}>
                {getFormatQueryString(query, { format: exportFormat, valueProcessor })}
              </CodeBlock>
            </div>
            <div>
              <h2>Export/import</h2>
              <p>
                Convert to and from SQL, MongoDB, and several other query formats. The code block{' '}
                <span className={styles.leftOrBelow}></span> reflects the query above converted to
                the selected format.
              </p>
              <div className={styles.linkList}>
                <Link href="/docs/utils/export">Export documentation</Link>
                <Link href="/docs/utils/import">Import documentation</Link>
              </div>
            </div>
            <div>
              <h2>Extensible</h2>
              <p>
                Provide <Link href="/docs/tips/custom-with-fallback">custom components</Link> for
                maximum flexibility, or use one of the official{' '}
                <Link href="/docs/compat">compatibility packages</Link> for libraries like MUI,
                Bootstrap, and others.
              </p>
              <div className={styles.linkList}>
                <Link href="/docs/components/querybuilder#controlelements">Documentation</Link>
                <Link href="/docs/tips/custom-with-fallback">Tips</Link>
              </div>
            </div>
            <div className="extended-queryBuilder">
              <Link href="https://reactdatepicker.com/" style={{ whiteSpace: 'nowrap' }}>
                <code>react-datepicker</code>
              </Link>
              <QueryBuilder
                fields={datePickerFields}
                defaultQuery={initialDatePickerQuery}
                controlElements={{ valueEditor: ExtendedValueEditor_DatePicker }}
                getOperators={() => defaultOperators.filter(op => op.name === '=')}
              />
              <Link href="https://react-select.com/" style={{ whiteSpace: 'nowrap' }}>
                <code>react-select</code>
              </Link>
              <QueryBuilder
                fields={selectFields}
                defaultQuery={initialSelectQuery}
                controlElements={{ valueEditor: ExtendedValueEditor_Select }}
                getOperators={() => defaultOperators.filter(op => op.name === 'in')}
              />
              <Link href="https://zillow.github.io/react-slider/" style={{ whiteSpace: 'nowrap' }}>
                <code>react-slider</code>
              </Link>
              <QueryBuilder
                fields={sliderFields}
                defaultQuery={initialSliderQuery}
                controlElements={{ valueEditor: ExtendedValueEditor_Slider }}
                getOperators={() => defaultOperators.filter(op => op.name === 'between')}
              />
            </div>
            <div className="custom-styling">
              <QueryBuilderDnD dnd={{ ...ReactDnD, ...ReactDndHtml5Backend }}>
                <QueryBuilder
                  query={query}
                  onQueryChange={setQuery}
                  fields={fields}
                  translations={{ dragHandle: { label: '⇅' } }}
                  controlClassnames={{
                    queryBuilder: ['queryBuilder-branches', 'green-branch-lines'],
                  }}
                />
              </QueryBuilderDnD>
            </div>
            <div>
              <h2>Flexible styling</h2>
              <p>
                Tweak the default styles or come up with your own. All deviations from the default
                styles in the query builder <span className={styles.leftOrBelow}></span>, including
                re-ordering the elements, have been achieved with pure CSS using the standard
                classes assigned by the component.
              </p>
              <div className={styles.linkList}>
                <Link href="/docs/styling/classnames">Documentation</Link>
                <Link href="/docs/styling/overview">Tips</Link>
              </div>
            </div>
          </div>
        </QueryBuilderContext.Provider>
      </main>
    </Layout>
  );
};

export default () => (
  <StrictMode>
    <LandingPage />
  </StrictMode>
);
