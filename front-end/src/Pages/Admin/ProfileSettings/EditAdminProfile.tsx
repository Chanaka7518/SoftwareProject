import React from 'react';
import { Tabs , Card} from 'antd';
import EditPersonalDetails from './EditPersonalDetails';
import ChangePassword from './ChangePassword';
import EditContactDetails from './EditContactDetails';
const TabPane = Tabs.TabPane;


const EditAdminProfile: React.FC = () => {
  return (
    <div>
      <Card>
            <h1> Edit Profile Information </h1>
            <Tabs defaultActiveKey='1'>
        <TabPane tab="Personal Details" key="personaldetails">
          <EditPersonalDetails/>
        </TabPane>
                <TabPane tab="Change Password" key="changepassword">
                  <ChangePassword/>
                    </TabPane>
                    <TabPane tab="Contact Details" key="managecontact">
                    <EditContactDetails/>
                    </TabPane>
                </Tabs>
                </Card>
    </div>
    
  );
};


export default EditAdminProfile;