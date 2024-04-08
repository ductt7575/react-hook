import React from 'react';
import './DisplayInfo.scss';
import logo from './../logo.svg';

class DisplayInfo extends React.Component {
    constructor(props) {
        console.log('constructor');
        super(props);
        this.state = {
            isShowListUser: true,
        };
    }

    handleShowHide(event) {
        this.setState({
            isShowListUser: !this.state.isShowListUser,
        });
    }
    componentDidMount() {
        console.log('Did mount');
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('Did update');
    }
    render() {
        console.log('render');

        //Destructuring Array/Object
        const { listUsers } = this.props;
        return (
            <div className="display-info-container">
                <div onClick={(event) => this.handleShowHide(event)}>
                    {this.state.isShowListUser === true ? 'Hide user list' : 'Show user list'}
                </div>
                {this.state.isShowListUser && (
                    <>
                        {listUsers.map((user, index) => {
                            return (
                                <div key={user.id} className={+user.age >= 21 ? 'green' : 'red'}>
                                    <div>My name is {user.name}</div>
                                    <div>My age is {user.age}</div>
                                    <div>I am studying in {user.major}</div>
                                    <button
                                        onClick={() => {
                                            this.props.handleDeleteUser(user.id);
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
    }
}

export default DisplayInfo;
