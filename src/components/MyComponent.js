import React from 'react';
import UserInfor from './AddUserInfor';
import DisplayInfo from './DisplayInfo';
import AddUserInfor from './AddUserInfor';

class MyComponent extends React.Component {
    state = {
        listUsers: [
            { id: 1, age: 12, name: 'Đức', major: 'IT' },
            { id: 2, age: 20, name: 'Thịnh', major: 'Marketing' },
            { id: 3, age: 33, name: 'Ly', major: 'sales' },
        ],
    };
    handleAddNewUser = (userObj) => {
        this.setState({
            listUsers: [userObj, ...this.state.listUsers],
        });
    };
    //JSX: cho phép viết js bên trong code html
    render() {
        return (
            <div>
                <AddUserInfor handleAddNewUser={this.handleAddNewUser}></AddUserInfor>
                <br />
                <DisplayInfo listUsers={this.state.listUsers}></DisplayInfo>
            </div>
        );
    }
}

export default MyComponent;
