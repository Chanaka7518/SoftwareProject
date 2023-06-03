import { Button, Card, Progress, Space, Table, Typography } from "antd";
import { useState } from "react";
import type { ColumnsType } from "antd/es/table";
import "./styles.css";
import Header from "./Header";
import { useNavigate } from "react-router";

interface DataType {
  key: string;
  name: string;
  email: string;
}

const MySales = () => {
  const [revenue, setRevenue] = useState<number>(1250);
  const [profit, setProfit] = useState<number>(1000);
  const [cost, setCost] = useState<number>(250);
  const navigateTo = useNavigate();
  const data: DataType[] = [
    {
      key: "1",
      name: "John Brown",
      email: "chanaka7518@gmail.com",
    },
    {
      key: "2",
      name: "Joe Black",
      email: "chanaka7518@gmail.com",
    },
    {
      key: "3",
      name: "Jim Green",
      email: "chanaka7518@gmail.com",
    },
    {
      key: "4",
      name: "Jim Red",
      email: "chanaka7518@gmail.com",
    },
  ];

  //columns
  const columns: ColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "30%",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "70%",
    },
  ];
  return (
    <>
      <Header />
      <div
        className="salesContainer"
        style={{ width: "90%", margin: " 10px 5%", backgroundColor: "white" }}
      >
        {/* //sales */}

        <Card className="card_content">
          <Card.Grid
            hoverable={true}
            className="card"
            onClick={() => navigateTo("/mysales/saleslist")}
          >
            <Typography.Title level={4} style={{ marginTop: "0px" }}>
              NUMBER OF SALES
            </Typography.Title>
            <Typography.Title
              style={{ marginBottom: "0px", color: "#cad2c5" }}
              level={4}
            >
              156
            </Typography.Title>
          </Card.Grid>

          {/* revenue */}

          <Card.Grid hoverable={false} className="card">
            <Typography.Title level={4} style={{ marginTop: "0px" }}>
              REVENUE
            </Typography.Title>
            <Typography.Title
              style={{ marginBottom: "0px", color: "#cad2c5" }}
              level={4}
            >
              {revenue}
            </Typography.Title>
          </Card.Grid>

          {/* profit */}

          <Card.Grid hoverable={false} className="card">
            <Typography.Title level={4} style={{ marginTop: "0px" }}>
              PROFIT
            </Typography.Title>
            <Typography.Title
              style={{ marginBottom: "0px", color: "#cad2c5" }}
              level={4}
            >
              <span style={{ color: "#1890ff" }}> ${profit}</span>
            </Typography.Title>

            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button
                type="primary"
                style={{
                  backgroundColor: "blue",
                  borderRadius: "20px",
                  marginTop: "0px",
                  display: "flex",
                  alignItems: "center",
                  borderColor: "blue",
                  width: "100px",
                }}
              >
                <p style={{ color: "white", margin: "0px" }}>Withdraw</p>
              </Button>
            </div>
          </Card.Grid>

          {/* cost */}
          <Card.Grid hoverable={false} className="card">
            <Typography.Title level={4} style={{ marginTop: "0px" }}>
              ALF FEE
            </Typography.Title>
            <Typography.Title
              style={{ marginBottom: "0px", color: "#cad2c5" }}
              level={4}
            >
              <span style={{ color: "red" }}> ${cost}</span>
            </Typography.Title>
          </Card.Grid>
        </Card>
        <div className="secondRow">
          <div className="table">
            <div style={{ width: "100%" }}>Latest orders</div>
            <Table columns={columns} dataSource={data} />
          </div>
        </div>
      </div>
    </>
  );
};

export default MySales;
