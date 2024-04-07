import React from 'react';
import './DisplayInfo.scss';

class DisplayInfo extends React.Component {
    state = {
        isShowListUser: true,
    };

    handleShowHide(event) {
        this.setState({
            isShowListUser: !this.state.isShowListUser,
        });
    }

    render() {
        //Destructuring Array/Object
        const { listUsers } = this.props;
        return (
            <div className="display-info-container">
                <div onClick={(event) => this.handleShowHide(event)}>
                    {this.state.isShowListUser === true ? 'Hide user list' : 'Show user list'}
                </div>
                {this.state.isShowListUser && (
                    <div>
                        {listUsers.map((user, index) => {
                            return (
                                <div key={user.id} className={+user.age >= 21 ? 'green' : 'red'}>
                                    <div>My name is {user.name}</div>
                                    <div>My age is {user.age}</div>
                                    <div>I am studying in {user.major}</div>
                                    <hr />
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        );
    }
}

export default DisplayInfo;
