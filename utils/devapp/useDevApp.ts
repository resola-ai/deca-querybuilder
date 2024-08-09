import queryString from 'query-string';
import { useCallback, useMemo, useReducer, useState } from 'react';
import type { FormatQueryOptions, RuleGroupType, RuleGroupTypeIC } from 'react-querybuilder';
import { defaultValidator, standardClassnames } from 'react-querybuilder';
import * as RQButils from '@rqb-utils';
import {
  defaultOptions,
  emptyQuery,
  emptyQueryIC,
  fields,
  formatMap,
  initialQuery,
  initialQueryIC,
} from './constants';
import type { CommonRQBProps } from './types';
import { generatePermalinkHash, getFormatQueryString, optionsReducer } from './utils';

Object.defineProperty(globalThis, 'RQButils', { value: RQButils });

const getOptionsFromHash = () =>
  Object.fromEntries(
    Object.entries(queryString.parse(location.hash)).map(([opt, val]) => [opt, val === 'true'])
  );

// Initialize options from URL hash
const initialOptionsFromHash = getOptionsFromHash();

export const useDevApp = () => {
  const [query, setQuery] = useState(initialQuery);
  const [queryIC, setQueryIC] = useState(initialQueryIC);
  const [optVals, updateOptions] = useReducer(optionsReducer, {
    ...defaultOptions,
    ...initialOptionsFromHash,
  });

  const commonRQBProps = useMemo((): CommonRQBProps => {
    const { independentCombinators: _ic, ...opts } = optVals;
    return {
      ...opts,
      fields,
      validator: opts.validateQuery ? defaultValidator : undefined,
      controlClassnames: { queryBuilder: opts.showBranches ? standardClassnames.branches : '' },
    };
  }, [optVals]);

  const formatQueryResults = formatMap.map(([format]) => {
    const formatQueryOptions: FormatQueryOptions = {
      format,
      fields: optVals.validateQuery ? fields : undefined,
      parseNumbers: optVals.parseNumbers,
    };
    const q = optVals.independentCombinators ? queryIC : query;
    return [format, getFormatQueryString(q, formatQueryOptions)] as const;
  });

  const actions = useMemo(
    () =>
      [
        [
          'Default options',
          () => {
            history.pushState(
              null,
              '',
              generatePermalinkHash(optionsReducer(optVals, { type: 'reset' }))
            );
            updateOptions({ type: 'reset' });
          },
        ],
        [
          'All options',
          () => {
            history.pushState(
              null,
              '',
              generatePermalinkHash(optionsReducer(optVals, { type: 'all' }))
            );
            updateOptions({ type: 'all' });
          },
        ],
        [
          'Clear query',
          () => {
            setQuery(emptyQuery);
            setQueryIC(emptyQueryIC);
          },
        ],
        [
          'Default query',
          () => {
            setQuery(initialQuery);
            setQueryIC(initialQueryIC);
          },
        ],
      ] as const,
    [optVals]
  );

  const onQueryChange = useCallback((q: RuleGroupType) => setQuery(q), []);
  const onQueryChangeIC = useCallback((q: RuleGroupTypeIC) => setQueryIC(q), []);

  return {
    actions,
    commonRQBProps,
    formatQueryResults,
    onQueryChange,
    onQueryChangeIC,
    optVals,
    query,
    queryIC,
    updateOptions,
  };
};
