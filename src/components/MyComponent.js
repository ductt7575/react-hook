import React from 'react';
import UserInfor from './UserInfor';
import DisplayInfo from './DisplayInfo';

class MyComponent extends React.Component {
    //JSX: cho phép viết js bên trong code html
    render() {
        return (
            <div>
                <UserInfor></UserInfor>
                <br />
                <br />
                <DisplayInfo name="Đức Trọng" age="18"></DisplayInfo>
                <hr />
                <DisplayInfo name="Người lạ ơi" age="38"></DisplayInfo>
            </div>
        );
    }
}

export default MyComponent;
