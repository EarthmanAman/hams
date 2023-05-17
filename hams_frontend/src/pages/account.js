
import Layout from '@/components/layout'
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import { connect } from 'react-redux';
import { appointmentsAPI } from '@/redux/splices/appointmentsSplice';
import { api_stub_put } from '@/api/_stub';
import React from 'react';

class  Account extends React.Component {
    state = {
        username: null,
        email: null,
        first_name: null,
        last_name: null,
        phone_no: null,
        license_no: null,
        password: null,
        confirm_password: null,
        null_error:false,
        new_pass:null,
        old_pass: null,
        confirm_new_pass: null,
        unmatched: false,
        short: false,
        pass_success: false
    }


    handlePasswordChange =async() => {
        const {old_pass, new_pass, confirm_new_pass} = this.state
        if(new_pass === confirm_new_pass){
            if (new_pass.length < 6){
                this.setState({short:true})
            }else {
                let context = {
                    old_password:old_pass,
                    new_password:new_pass,
                }
                await api_stub_put(`/accounts/change_password/${this.props.user_appointments.user_appointments.user_id}/`, context)
                this.setState({pass_success:true})
            }
        }else {
            this.setState({unmatched:true})
        }
    }
    handleUpdate = async() => {
        let {username, email, first_name, last_name, phone_no} = this.state
        
        if(username == null || email == null || first_name == null || last_name == null || phone_no == null){
            this.setState({null_error: true})
        }else{
            const context = {
                username: username,
                email: email,
                first_name: first_name,
                last_name: last_name,
                phone_no: phone_no,
                // license_no: license_no,
            }

            await api_stub_put(`/accounts/update/${this.props.user_appointments.user_appointments.user_id}/`, context)
            const r = await this.props.appointmentsAPI(this.props.user_appointments.user_appointments.id)
            
        }
    }
    
    componentDidMount =() => {
        const user = this.props.user_appointments.user_appointments
        this.setState({
            username: user.username,
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
            phone_no: user.phone_no,
            license_no: (user.doctor != null || user.doctor != undefined) ? user.doctor.license_no : null
        })
    }
    render(){
        
        const {username, first_name, last_name, email, phone_no, license_no} = this.state
        
        return (
            <Layout>
                <div className='my-5 px-5 flex space-x-4'>

                    <div className='flex-1 bg-[#ffffff] p-5'>
                        <div className='flex justify-between items-center mb-5'>
                            <div>
                            <h4>Your Account Information</h4>
                            {/* <p>Your upcoming appointments</p> */}
                            </div>
                            
                            
                        </div>

                        <div>
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                                        >
                                            INFO
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                                        >
                                            VALUE
                                        </th>
                                        
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-gray-200">
                                    <tr>
                                        
                                        <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                                            First name
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                            {first_name}
                                        </td>
                                        
                                    </tr>

                                    <tr>
                                        
                                        <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                                            Last name
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                            {last_name}
                                        </td>
                                        
                                    </tr>

                                    <tr>
                                        
                                        <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                                            Email
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                            {email}
                                        </td>
                                        
                                    </tr>

                                    <tr>
                                        
                                        <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                                            Licence No
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                            {license_no}
                                        </td>
                                        
                                    </tr>
                                    
                                </tbody>
                            </table>
                        </div>
                    </div>
                    
                    <div className='flex-1 bg-[#ffffff] p-5'>
                        <div className='flex justify-between items-center mb-5'>
                            <div>
                            <h4>Update your account information</h4>
                            {/* <p>Your upcoming appointments</p> */}
                            </div>
                            
                            
                        </div>

                        {this.state.null_error === true ? <p className='text-red-600'>Some fields are empty. PLease fill them</p>:null}
                        
                        <div className='flex flex-col space-y-3'>
                            <div className='flex space-x-3'>
                                <div className='flex-1'>
                                    <input placeholder='username' defaultValue={username} className='text-black border-2 rounded-md p-2 w-[100%]' onChange={(text) => this.setState({username: text.target.value})}/>
                                </div>
                                <div className='flex-1'>
                                    <input placeholder='email' defaultValue={email} className='text-black border-2 rounded-md p-2 w-[100%]' onChange={(text) => this.setState({email: text.target.value})}/>
                                </div>
                                
                            </div>
                            <div className='flex space-x-3'>
                                <div className='flex-1'>
                                    <input placeholder='First name' defaultValue={first_name} className='text-black border-2 rounded-md p-2 w-[100%]' onChange={(text) => this.setState({first_name: text.target.value})}/>
                                </div>
                                <div className='flex-1'>
                                    <input placeholder='Last name' defaultValue={last_name} className='text-black border-2 rounded-md p-2 w-[100%]' onChange={(text) => this.setState({last_name: text.target.value})}/>
                                </div>
                                
                            </div>
                            <div className='flex space-x-3'>
                                <div className='flex-1'>
                                    <input placeholder='Phone number' defaultValue={phone_no} className='text-black border-2 rounded-md p-2 w-[100%]' onChange={(text) => this.setState({phone_no: text.target.value})}/>
                                </div>
                                {/* <div className='flex-1'>
                                    <input placeholder='Licence Number' className='text-black border-2 rounded-md p-2 w-[100%]' onChange={(text) => this.setState({license_no: text.target.value})}/>
                                </div> */}
                                
                            </div>
                            {/* <input placeholder='Password' type='password' className='text-black border-2 rounded-md p-2' onChange={(text) => this.setState({password: text.target.value})}/>
                            <input placeholder='Confirm Password' type='password' className='text-black border-2 rounded-md p-2' onChange={(text) => this.setState({confirm_password: text.target.value})}/> */}
                            <button className='bg-green-700 text-black p-4'  onClick={this.handleUpdate}>Update</button>

                        </div>



                        <div className='flex justify-between items-center my-5'>
                            <div>
                            <h4>Change Your Password</h4>
                            {/* <p>Your upcoming appointments</p> */}
                            </div>
                            
                            
                        </div>

                        {this.state.unmatched === true ? <p className='text-red-600'>Passwords do not match</p>:null}
                        {this.state.short === true ? <p className='text-red-600'>Password Must be more than 6 characters</p>:null}
                        {this.state.pass_success == true ? <div className='p-3 bg-green-500'><p>Password Changed successfully</p></div>:null}
                        <div className='flex flex-col space-y-3'>
                            
                            
                                <div>
                                    <input placeholder='Old Password' type='password' className='text-black border-2 rounded-md p-2 w-[100%]' onChange={(text) => this.setState({old_pass: text.target.value})}/>
                                </div>
                                <div>
                                    <input placeholder='New Password' type='password' className='text-black border-2 rounded-md p-2 w-[100%]' onChange={(text) => this.setState({new_pass: text.target.value})}/>
                                </div>

                                <div>
                                    <input placeholder='Confirm New Password' type='password' className='text-black border-2 rounded-md p-2 w-[100%]' onChange={(text) => this.setState({confirm_new_pass: text.target.value})}/>
                                </div>
                              
                            {/* <input placeholder='Password' type='password' className='text-black border-2 rounded-md p-2' onChange={(text) => this.setState({password: text.target.value})}/>
                            <input placeholder='Confirm Password' type='password' className='text-black border-2 rounded-md p-2' onChange={(text) => this.setState({confirm_password: text.target.value})}/> */}
                            <button className='bg-green-700 text-black p-4'  onClick={this.handlePasswordChange}>Change</button>

                        </div>

                        
                    </div>
                    
                </div>
                
            </Layout>
        )
    }
}
 


const mapStateToProps = (state) => ({
    user_appointments: state.user_appointments,
    user: state.user.user
  });
  
  const mapDispatchToProps = {appointmentsAPI};
  
  export default connect(mapStateToProps, mapDispatchToProps)(Account);
