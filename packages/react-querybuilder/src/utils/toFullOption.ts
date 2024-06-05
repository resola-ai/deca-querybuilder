import { produce } from 'immer';
import type {
  BaseOption,
  BaseOptionMap,
  FlexibleOption,
  FlexibleOptionList,
  FullOptionList,
  Option,
  ToFullOption,
  ValueOption,
} from '../types';
import { isPojo } from './misc';
import { isFlexibleOptionGroupArray } from './optGroupUtils';

const isOptionWithName = (opt: BaseOption): opt is Option =>
  isPojo(opt) && 'name' in opt && typeof opt.name === 'string';
const isOptionWithValue = (opt: BaseOption): opt is ValueOption =>
  isPojo(opt) && 'value' in opt && typeof opt.value === 'string';

/**
 * Converts an {@link Option} or {@link ValueOption} (i.e., {@link BaseOption})
 * into a {@link FullOption}. Full options are left unchanged.
 */
function toFullOption<Opt extends BaseOption>(
  opt: Opt,
  baseProperties?: Record<string, unknown>
): ToFullOption<Opt> {
  const recipe: (o: Opt) => ToFullOption<Opt> = produce(draft => {
    const idObj: { name?: string; value?: string } = {};
    let needsUpdating = !!baseProperties;

    if (isOptionWithName(draft) && !isOptionWithValue(draft)) {
      idObj.value = draft.name;
      needsUpdating = true;
    } else if (!isOptionWithName(draft) && isOptionWithValue(draft)) {
      idObj.name = draft.value;
      needsUpdating = true;
    }

    if (needsUpdating) {
      return Object.assign({}, baseProperties, draft, idObj);
    }
  });
  return recipe(opt);
}

/**
 * Converts an {@link OptionList} or {@link FlexibleOptionList} into a {@link FullOptionList}.
 * Lists of full options are left unchanged.
 */
function toFullOptionList<Opt extends BaseOption, OptList extends FlexibleOptionList<Opt>>(
  optList: OptList,
  baseProperties?: Record<string, unknown>
): FullOptionList<Opt> {
  if (!Array.isArray(optList)) {
    return [] as unknown as FullOptionList<Opt>;
  }

  const recipe: (ol: FlexibleOptionList<Opt>) => FullOptionList<Opt> = produce(draft => {
    if (isFlexibleOptionGroupArray(draft)) {
      for (const optGroup of draft) {
        optGroup.options.forEach(
          (opt, idx) => (optGroup.options[idx] = toFullOption(opt, baseProperties))
        );
      }
    } else {
      (draft as Opt[]).forEach((opt, idx) => (draft[idx] = toFullOption(opt, baseProperties)));
    }
  });

  return recipe(optList);
}

/**
 * Converts a {@link FlexibleOptionList} into a {@link FullOptionList}.
 * Lists of full options are left unchanged.
 */
function toFullOptionMap<OptMap extends BaseOptionMap>(
  optMap: OptMap,
  baseProperties?: Record<string, unknown>
): OptMap extends BaseOptionMap<infer V, infer K> ? Partial<Record<K, ToFullOption<V>>> : never {
  type FullOptMapType =
    OptMap extends BaseOptionMap<infer VT, infer KT>
      ? Partial<Record<KT, ToFullOption<VT>>>
      : never;

  return Object.fromEntries(
    (Object.entries(optMap) as [string, FlexibleOption][]).map(([k, v]) => [
      k,
      toFullOption(v, baseProperties),
    ])
  ) as FullOptMapType;
}

export { toFullOption, toFullOptionList, toFullOptionMap };
