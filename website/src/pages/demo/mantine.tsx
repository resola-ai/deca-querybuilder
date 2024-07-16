/* eslint-disable @typescript-eslint/consistent-type-imports */
import BrowserOnly from '@docusaurus/BrowserOnly';
import { useColorMode } from '@docusaurus/theme-common';
import { MantineProvider } from '@mantine/core';
import { QueryBuilderMantine } from '@react-querybuilder/mantine';
import Layout from '@theme/Layout';
import { useEffect, useState } from 'react';
import { Loading } from '../_utils';
import './_styles/demo.scss';
import './_styles/rqb-mantine.scss';

function ReactQueryBuilderDemo_MantineBrowser() {
  const { colorMode } = useColorMode();
  const [{ Demo }, setComponents] = useState<{
    Demo?: typeof import('./_components/Demo').default;
  }>({});

  useEffect(() => {
    let active = true;

    (async () => {
      const comps = await Promise.all([(await import('./_components/Demo')).default]);
      const [Demo] = comps;

      if (active) {
        setComponents(() => ({ Demo }));
      }
    })();

    return () => {
      active = false;
    };
  }, []);

  if (!Demo) return <Loading />;

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
