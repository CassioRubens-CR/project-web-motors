import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";
import './Layout.scss';

export function Layout({ children }) {

  return (
    <div className="layout">
      <div className="container">
        <Header />
        <main>
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
}
