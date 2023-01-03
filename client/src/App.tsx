import '@/styles/index.css';
import { Layout } from '@/components/Layout';
import { Heroes } from './components/heroes';
import { Benefit } from '@/components/benefit';

const App = () => (
  <Layout>
    {({ setSelectPage }) => (
      <>
        <Heroes setSelectPage={setSelectPage} />
        <Benefit />
      </>
    )}
  </Layout>
);
export { App };
