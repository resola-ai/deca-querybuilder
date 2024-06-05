/* eslint-disable @typescript-eslint/consistent-type-imports */
import BrowserOnly from '@docusaurus/BrowserOnly';
import { useColorMode } from '@docusaurus/theme-common';
import Layout from '@theme/Layout';
import { useEffect, useState } from 'react';
import { Loading } from '../_utils';
import './_styles/demo.scss';
import './_styles/rqb-mantine.scss';

function ReactQueryBuilderDemo_MantineBrowser() {
  const { colorMode } = useColorMode();
  const [{ MantineProvider, QueryBuilderMantine, Demo }, setComponents] = useState<{
    MantineProvider?: typeof import('@mantine/core').MantineProvider;
    QueryBuilderMantine?: typeof import('@react-querybuilder/mantine').QueryBuilderMantine;
    Demo?: typeof import('./_components/Demo').default;
  }>({});

  useEffect(() => {
    let active = true;

    (async () => {
      const comps = await Promise.all([
        (await import('./_components/Demo')).default,
        (await import('@mantine/core')).MantineProvider,
        (await import('@react-querybuilder/mantine')).QueryBuilderMantine,
      ]);
      const [Demo, MantineProvider, QueryBuilderMantine] = comps;

      if (active) {
        setComponents(() => ({
          Demo,
          MantineProvider,
          QueryBuilderMantine,
        }));
      }
    })();

    return () => {
      active = false;
    };
  }, []);

  if (!MantineProvider || !QueryBuilderMantine || !Demo) return <Loading />;

  return (
    <>
      <MantineProvider forceColorScheme={colorMode}>
        <QueryBuilderMantine>
          <Demo variant="mantine" />
        </QueryBuilderMantine>
      </MantineProvider>
    </>
  );
}

export default function ReactQueryBuilderDemo_Mantine() {
  return (
    <Layout description="React Query Builder Mantine Demo">
      <BrowserOnly fallback={<Loading />}>
        {() => <ReactQueryBuilderDemo_MantineBrowser />}
      </BrowserOnly>
    </Layout>
  );
}
