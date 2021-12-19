import { Layout } from "antd";
import { FC } from "react";
import "./App.css";
import AppRouter from "./components/AppRouter";
import Header from "./components/Header";

const App: FC = () => {
  return (
    <Layout>
      <Header />
      <Layout.Content>
        <AppRouter />
      </Layout.Content>
    </Layout>
  );
};

export default App;
