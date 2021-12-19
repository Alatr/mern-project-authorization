import "antd/dist/antd.css";
import { render } from "react-dom";
import init from "./init";

const run = async () => {
  const vdom = await init();
  render(vdom, document.getElementById("root"));
};

run();
