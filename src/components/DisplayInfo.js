import React, { useEffect, useState } from 'react';
import './DisplayInfo.scss';
import logo from './../logo.svg';

// class DisplayInfo extends React.Component {
//     render() {
//         console.log('render');

//         //Destructuring Array/Object
//         const { listUsers } = this.props;
//         return (
//             <div className="display-info-container">
//                 {true && (
//                     <>
//                         {listUsers.map((user, index) => {
//                             return (
//                                 <div key={user.id} className={+user.age >= 21 ? 'green' : 'red'}>
//                                     <div>My name is {user.name}</div>
//                                     <div>My age is {user.age}</div>
//                                     <div>I am studying in {user.major}</div>
//                                     <button
//                                         onClick={() => {
//                                             this.props.handleDeleteUser(user.id);
//                                         }}
//                                     >
//                                         Delete
//                                     </button>
//                                     <hr />
//                                 </div>
//                             );
//                         })}
//                     </>
//                 )}
//             </div>
//         );
//     }
// }
// Khi viết function component thì ko viết this
const DisplayInfo = (props) => {
    const { listUsers } = props;

    const [isShowHideListUser, setShowHideListUser] = useState(true);

    const handleShowHideListUser = () => {
        // alert('click me');
        setShowHideListUser(!isShowHideListUser);
    };

    console.log('>>> Render');
    useEffect(() => {
        if (listUsers.length === 0) {
            alert('me');
        }
        console.log('>>>Use effect');
    }, [listUsers]);

    return (
        <div className="display-info-container">
            <div>
                <span onClick={() => handleShowHideListUser()}>
                    {isShowHideListUser === true ? 'Hide list user' : 'Show list user'}
                </span>
            </div>
            {isShowHideListUser && (
                <>
                    {listUsers.map((user, index) => {
                        return (
                            <div key={user.id} className={+user.age >= 21 ? 'green' : 'red'}>
                                <div>My name is {user.name}</div>
                                <div>My age is {user.age}</div>
                                <div>I am studying in {user.major}</div>
                                <button
                                    onClick={(event) => {
                                        props.handleDeleteUser(user.id);
                                    }}
                                >
                                    Delete
                                </button>
                                <hr />
                            </div>
                        );
                    })}
                </>
            )}
        </div>
    );
};
export default DisplayInfo;
