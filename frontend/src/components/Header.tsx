import { UserOutlined } from "@ant-design/icons";
import { Layout, Menu, Row } from "antd";
import { uniqueId } from "lodash";
import { useAuth } from "../services/auth-service";

const Header = () => {
  const { logOut, logIn, loggedIn } = useAuth();
  return (
    <Layout.Header className={"header"}>
      <Row>
        {loggedIn ? (
          <Menu selectable={false} theme="dark" mode={"horizontal"}>
            <Menu.SubMenu
              key={uniqueId()}
              popupOffset={[0, 5]}
              icon={<UserOutlined />}
              title="Dmitriy Lukianov"
            >
              <Menu.Item key={uniqueId()} onClick={logOut}>
                {" "}
                Log out
              </Menu.Item>
            </Menu.SubMenu>
          </Menu>
        ) : (
          <Menu theme="dark" selectable={false}>
            <Menu.Item key={uniqueId()} onClick={logIn}>
              Login
            </Menu.Item>
          </Menu>
        )}
      </Row>
    </Layout.Header>
  );
};

export default Header;
