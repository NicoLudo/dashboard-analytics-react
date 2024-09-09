import './assets/sass/main.scss';
import Dashboard from './pages/Dashboard';
import Header from './layouts/Header';
import Aside from './layouts/Aside';

const App = () => {
  return (
    <>
      <Header />
      <main className="app-main-container">
        <Dashboard />
      </main>
      <Aside />
    </>
  );
};

export default App;
