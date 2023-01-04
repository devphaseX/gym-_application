import '@/styles/index.css';
import { Layout } from '@/components/Layout';
import { Heroes } from './components/heroes';
import { Benefits } from '@/components/benefits';

const App = () => (
  <Layout>
    {({ setSelectPage }) => (
      <>
        <Heroes setSelectPage={setSelectPage} />
        <Benefits setSelectPage={setSelectPage} />
      </>
    )}
  </Layout>
);
export { App };
