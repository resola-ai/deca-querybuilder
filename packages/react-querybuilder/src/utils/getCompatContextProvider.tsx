import * as React from 'react';
import { useContext, useMemo } from 'react';
import { QueryBuilderContext } from '../components';
import type { FullField, QueryBuilderContextProps, QueryBuilderContextProvider } from '../types';
import { mergeClassnames } from './mergeClassnames';
import { mergeTranslations } from './mergeTranslations';

export type GetCompatContextProviderProps = Pick<
  QueryBuilderContextProps<FullField, string>,
  'controlClassnames' | 'controlElements' | 'translations'
> & { key: string };

/**
 * Generates a context provider for a compatibility package.
 */
export const getCompatContextProvider = (
  gccpProps: GetCompatContextProviderProps
): QueryBuilderContextProvider => {
  const {
    key,
    controlClassnames: compatClassnames,
    controlElements: compatElements,
    translations: compatTranslations,
  } = gccpProps;

  return props => {
    const rqbContext = useContext(QueryBuilderContext);

    const classnamesObject = useMemo(
      () =>
        compatClassnames
          ? {
              controlClassnames: mergeClassnames(
                rqbContext.controlClassnames,
                props.controlClassnames,
                compatClassnames
              ),
            }
          : {},
      [props.controlClassnames, rqbContext.controlClassnames]
    );

    const newTranslations = useMemo(
      () => mergeTranslations(rqbContext.translations, compatTranslations, props.translations),
      [props.translations, rqbContext.translations]
    );

    const newContextProps = useMemo(
      (): QueryBuilderContextProps<FullField, string> => ({
        ...rqbContext,
        ...classnamesObject,
        controlElements: {
          ...rqbContext.controlElements,
          ...compatElements,
          ...props.controlElements,
        },
        translations: newTranslations,
      }),
      [classnamesObject, newTranslations, props.controlElements, rqbContext]
    );

    return (
      <QueryBuilderContext.Provider value={newContextProps} key={key}>
        {props.children}
      </QueryBuilderContext.Provider>
    );
  };
};
