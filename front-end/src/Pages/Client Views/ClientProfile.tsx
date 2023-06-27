import React, {  useEffect,useState } from "react";
import { Input,Col,Row, Form,  Checkbox,FormItemProps, message } from "antd";
import type { MenuTheme ,} from 'antd/es/menu';
import { useAuthContext } from "../../Hooks/useAuthContext";
import newRequest from "../../Utils/newRequest";

// import "./HeadCoachDashBoard.css";


//AVATAR
const img1: string = new URL(`./profile.png`, import.meta.url).href;


// path prefix

const MyFormItemContext = React.createContext<(string | number)[]>([]);

interface MyFormItemGroupProps {
  prefix: string | number | (string | number)[];
  children: React.ReactNode;
}

function toArr(str: string | number | (string | number)[]): (string | number)[] {
  return Array.isArray(str) ? str : [str];
}

const MyFormItemGroup = ({ prefix, children }: MyFormItemGroupProps) => {
  const prefixPath = React.useContext(MyFormItemContext);
  const concatPath = React.useMemo(() => [...prefixPath, ...toArr(prefix)], [prefixPath, prefix]);

  return <MyFormItemContext.Provider value={concatPath}>{children}</MyFormItemContext.Provider>;
};
const MyFormItem = ({ name, ...props }: FormItemProps) => {
  const prefixPath = React.useContext(MyFormItemContext);
  const concatName = name !== undefined ? [...prefixPath, ...toArr(name)] : undefined;

  return <Form.Item name={concatName} {...props} />;
};
//path prefix end

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};
/* eslint-enable no-template-curly-in-string */

const onFinish = (values: any) => {
  console.log(values);
  
};







const ClientProfile: React.FC = () => {
  const img1: string = new URL(`../profile.png`, import.meta.url).href;
  const { userData } = useAuthContext();
const[userId,setUserId]= useState<string>(userData?._id)
  

  const [fName, setFName] = useState<string>("Chanaka ");
  const [lName, setLName] = useState<string>("Prasanna");
  const [age, setAge] = useState<string>("23");
  const [moNumber, setMoNumber] = useState<string>("0712244215");
  const [email, setEmail] = useState<string>("chanakaprasanna7638@gmail.com");
  const [gender, setGender] = useState<string>("male");
  


  
  const [rating, setRating] = useState<number>(4);

  const [isLoading, setIsloading] = useState<boolean>(false);


  useEffect(() => {
    
    setIsloading(true);
    const fetchData = async () => {
      if(!userId){
        setUserId(userData)
      }
      try {
        const res = await newRequest.get(`/users/client/${userId}`, {});
        console.log(res.data);
        setFName(res.data.firstName);
        setLName(res.data.lastName);
        setAge(res.data.age);
        setMoNumber(res.data.mobileNumber);
       
        setEmail(res.data.email);
        setGender(res.data.gender);

        setIsloading(false);
      } catch (err: any) {
        message.error(err.message);
        setIsloading(false);
      }
    };
    fetchData();
  }, []);

    const [componentDisabled, setComponentDisabled] = useState<boolean>(true);
    const [mode, setMode] = useState<'vertical' | 'inline'>('inline');
    const [theme, setTheme] = useState<MenuTheme>('light');
  
    const changeMode = (value: boolean) => {
      setMode(value ? 'vertical' : 'inline');
    };
  
    const changeTheme = (value: boolean) => {
      setTheme(value ? 'dark' : 'light');
    };
  return (
     
    <div className="container">
   
    <div className=' title'><h1>{fName}{lName}</h1></div>

        {/* <div>
    <img src={prof} alt="prof" />
  </div> */}
  <div className="pro">
  <div className="avatar">
  <Row>
  <Col xs={{ span:9, offset: 10}} >


{/* AVATAR HERE */}
<Row>
<div  className="AVATAR"
                  style={{ width: "60px", height: "60px", borderRadius: "50%" }}
                 
                >
                  <img
                    src={img1}
                    style={{
                      width: "250px",
                      height: "250px",
                      borderRadius: "50%",
                    }}
                  />
                </div>
                </Row>
</Col>

</Row>  
</div>


<div className="avatar">
  
<div className="card">
<div className="incard">
<Row>


<Checkbox
      checked={componentDisabled}
      onChange={(e) => setComponentDisabled(e.target.checked)}
    >
      Edit Profile
    </Checkbox>

</Row>
<Row>

<Col xs={{ span:14, offset:8}} >
<div className="Details">
<Form name="form_item_path"  onFinish={onFinish} labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      layout="vertical"
      
      disabled={componentDisabled}
      style={{ maxWidth: 900 }}

    >
      
    <MyFormItemGroup prefix={['user']}>
      <MyFormItemGroup prefix={['name']}>
        <Form.Item name="firstName" initialValue={fName} label="First Name" style={{ fontSize: '60px' }}>
          <Input />
        </Form.Item>
        <MyFormItem name="lastName" label="Last Name">
          <Input value={"Prasanna"}/>
        </MyFormItem>
      </MyFormItemGroup>

     
      <MyFormItem name="gender" label="gender">
        <Input value={gender}/>
      </MyFormItem>
      
    </MyFormItemGroup>
    <MyFormItemGroup prefix={['name']}>
        <MyFormItem name="Mobile number" label="Mobile number">
          <Input  value={moNumber}/>
        </MyFormItem>
        <MyFormItem name="email" label="email">
          <Input value={email}/>
        </MyFormItem>
      </MyFormItemGroup>
      <MyFormItemGroup prefix={['name']}>
        
      </MyFormItemGroup>
      <MyFormItemGroup prefix={['name']}>
        <MyFormItem name=" Bought Plans " label=" Bought Plans " >
          <Input />
        </MyFormItem>
        <MyFormItem name="" label="">
          <Input />
        </MyFormItem>
      
      </MyFormItemGroup>
   
  </Form>
  
  <div className="h33">
 
  </div>
  <div>
 
  
    </div>

</div>
</Col>
</Row>

</div>

</div>
</div>
</div>




      </div>

      

   
  )
}

export default ClientProfile;