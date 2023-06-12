import { Badge, Col, Space, Typography } from "antd";
import { Header } from "antd/es/layout/layout";
import { MailOutlined, BellFilled, MenuOutlined } from "@ant-design/icons";

interface Props {
  drawerVisible: boolean;
  setDrawerVisible: (value: boolean) => void;
}

const CoachHeader: React.FC<Props> = ({ drawerVisible, setDrawerVisible }) => {
  const toggleDrawer = () => {
    setDrawerVisible(!drawerVisible);
  };

  return (
    <div>
      <Header
        style={{
          height: "60px",
          backgroundColor: "rgba(255,255,255,0.25)",
          borderBottom: "1px solid rgba(0,0,0,0.25)",
          borderTop: "1px solid rgba(0,0,0,0.25)",
          fontSize: "28px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: "bold",
          color: "red",
        }}
      >
        Alpha Lee Fitness
      </Header>
    </div>
  );
};

export default CoachHeader;
