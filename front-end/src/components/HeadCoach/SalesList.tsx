import { Avatar, Button, List, Popover, message } from "antd";
const data = [
  {
    FName: "Chanaka",
    LName: "Prasanna",
    serviceName: "online coaching",
    price: 2500,
    date: "01/02/2013",
    status: "In Progress",
  },
  {
    FName: "Anuradha",
    LName: "Dharmasiri",
    serviceName: "personal training",
    price: 2500,
    date: "01/02/2013",
    status: "Completed",
  },
  {
    FName: "Chandira",
    LName: "Weerawardhana",
    serviceName: "online coaching",
    price: 2500,
    date: "01/02/2013",
    status: "In Progress",
  },
  {
    FName: "danushi",
    LName: "Jay",
    serviceName: "personal training",
    price: 2500,
    date: "01/02/2013",
    status: "Completed",
  },
];
const SalesList = () => {
  const img1: string = new URL(`../../Pages/profile.png`, import.meta.url).href;
  return (
    <List
      itemLayout="horizontal"
      dataSource={data}
      renderItem={(item, index) => (
        <List.Item>
          <List.Item.Meta
            style={{ display: "flex", alignItems: "center" }}
            avatar={<Avatar src={img1} />}
            title={
              <p className="clientName" style={{ color: "#1890ff" }}>
                <Popover
                  placement="bottom"
                  content={
                    <>
                      <p>
                        {" "}
                        <span className="pg=kg_details">Service</span>-{" "}
                        {item.serviceName}{" "}
                      </p>
                      <p>
                        {" "}
                        <span className="pg=kg_details">Price</span> -{" "}
                        {item.price}{" "}
                      </p>
                      <p>
                        <span className="pg=kg_details">Date</span> -{" "}
                        {item.date}{" "}
                      </p>
                      <p>
                        <span className="pg=kg_details">Status</span>-{" "}
                        {item.status}{" "}
                      </p>
                      <p
                        style={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <Button
                          onClick={() => message.success("Hi")}
                          type="primary"
                          style={{
                            backgroundColor: "blue",
                            borderRadius: "20px",
                            marginTop: "0px",

                            borderColor: "blue",
                            width: "100px",
                          }}
                        >
                          Profile
                        </Button>
                      </p>
                    </>
                  }
                >
                  {item.FName} {item.LName}
                </Popover>
              </p>
            }
          />
        </List.Item>
      )}
    />
  );
};

export default SalesList;
