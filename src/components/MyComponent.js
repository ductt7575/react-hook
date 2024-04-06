import React from 'react';
import UserInfor from './UserInfor';

class MyComponent extends React.Component {
    //JSX: cho phép viết js bên trong code html
    render() {
        return (
            <div>
                <UserInfor></UserInfor>
            </div>
        );
    }
}

export default MyComponent;
