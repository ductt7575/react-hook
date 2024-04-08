import React, { useState } from 'react';
import DisplayInfo from './DisplayInfo';
import AddUserInfo from './AddUserInfo';

// class MyComponent extends React.Component {
//     state = {
//         listUsers: [
//             { id: 1, age: 12, name: 'Đức', major: 'IT' },
//             { id: 2, age: 20, name: 'Thịnh', major: 'Marketing' },
//             { id: 3, age: 33, name: 'Ly', major: 'sales' },
//         ],
//     };
//     handleAddNewUser = (userObj) => {
//         this.setState({
//             listUsers: [userObj, ...this.state.listUsers],
//         });
//     };
//     handleDeleteUser = (userId) => {
//         let listUsersClone = [...this.state.listUsers];
//         listUsersClone = listUsersClone.filter((item) => item.id !== userId);
//         this.setState({
//             listUsers: [...listUsersClone],
//         });
//     };
//     //JSX: cho phép viết js bên trong code html
//     render() {
//         return (
//             <div>
//                 <AddUserInfo handleAddNewUser={this.handleAddNewUser}></AddUserInfo>
//                 <br />
//                 <DisplayInfo listUsers={this.state.listUsers} handleDeleteUser={this.handleDeleteUser}></DisplayInfo>
//             </div>
//         );
//     }
// }

const MyComponent = (props) => {
    const [listUsers, setListUsers] = useState([
        { id: 1, age: 12, name: 'Đức', major: 'IT' },
        { id: 2, age: 20, name: 'Thịnh', major: 'Marketing' },
        { id: 3, age: 33, name: 'Ly', major: 'sales' },
    ]);
    const handleAddNewUser = (userObj) => {
        setListUsers([userObj, ...listUsers]);
    };

    const handleDeleteUser = (userId) => {
        let listUsersClone = [...listUsers];
        listUsersClone = listUsersClone.filter((item) => item.id !== userId);
        setListUsers([...listUsersClone]);
    };

    return (
        <div>
            <AddUserInfo handleAddNewUser={handleAddNewUser}></AddUserInfo>
            <br />
            <DisplayInfo listUsers={listUsers} handleDeleteUser={handleDeleteUser}></DisplayInfo>
        </div>
    );
};

export default MyComponent;
