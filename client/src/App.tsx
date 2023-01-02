import '@/styles/index.css';
import { Layout } from '@/components/Layout';
import { Heroes } from './components/heroes';

const App = () => (
  <Layout>
    {({ setSelectPage }) => (
      <>
        <Heroes setSelectPage={setSelectPage} />
      </>
    )}
  </Layout>
);
export { App };
