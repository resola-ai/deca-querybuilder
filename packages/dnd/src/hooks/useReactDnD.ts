import { useEffect, useState } from 'react';
import { messages } from 'react-querybuilder';
import type { UseReactDnD } from '../types';

let didWarnEnabledDndWithoutReactDnD = false;

export const useReactDnD = (dndParam?: UseReactDnD) => {
  const [dnd, setDnd] = useState<UseReactDnD | null>(dndParam ?? null);

  useEffect(() => {
    let didCancel = false;

    const getDnD = async () => {
      const [reactDnD, reactDnDHTML5Be] = await Promise.all([
        import('react-dnd').catch(() => null),
        import('react-dnd-html5-backend').catch(() => null),
      ]);

      // istanbul ignore else
      if (!didCancel) {
        if (reactDnD && reactDnDHTML5Be) {
          setDnd(() => ({ ...reactDnD, ...reactDnDHTML5Be }));
        } else {
          // istanbul ignore else
          if (process.env.NODE_ENV !== 'production' && !didWarnEnabledDndWithoutReactDnD) {
            console.error(messages.errorEnabledDndWithoutReactDnD);
            didWarnEnabledDndWithoutReactDnD = true;
          }
        }
      }
    };

    if (!dnd) {
      getDnD();
    }

    return () => {
      didCancel = true;
    };
  }, [dnd]);

  return dnd;
};
