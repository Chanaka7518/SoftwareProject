import React from 'react';
import { Tabs , Card} from 'antd';
import ChangePassword from '../ProfileSettings/ChangePassword';
import PersonalDetails from './PersonalDetails';
import ContactDetails from './ContactDetails';
const TabPane = Tabs.TabPane;

const ProfileSettings: React.FC = () => {
    return (
    <div style={{background:'white', height:'603px'}}>
        <Card>
            <h1> Profile Information </h1>
            <Tabs defaultActiveKey='1'>
        <TabPane tab="Personal Details" key="personaldetails">
            <Card style={{marginLeft:10, marginRight:10}} type='inner'>
                <PersonalDetails/>
            </Card>
        </TabPane>
                <TabPane tab="Change Password" key="changepassword">
               <ChangePassword/>
                    </TabPane>
                    <TabPane tab="Contact Details" key="managecontact">
                    <ContactDetails/>
                    </TabPane>
                </Tabs>
                </Card>
              
            </div>

        );
    
    };
export default ProfileSettings;
