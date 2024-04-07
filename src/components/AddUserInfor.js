import React from 'react';

class AddUserInfor extends React.Component {
    state = {
        name: '',
        major: '',
        age: '',
    };

    handleChange1(event) {
        this.setState({
            name: event.target.value,
        });
    }
    handleChange2(event) {
        this.setState({
            age: event.target.value,
        });
    }
    handleChange3(event) {
        this.setState({
            major: event.target.value,
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.props.handleAddNewUser({
            id: Math.floor(Math.random() * 100 + 1) + '-random',
            age: this.state.age,
            name: this.state.name,
            major: this.state.major,
        });
    }
    render() {
        return (
            <div>
                My name is {this.state.name} <br></br> I'm {this.state.age} <br></br> I am studying in{' '}
                {this.state.major}
                <form onSubmit={(event) => this.handleSubmit(event)}>
                    <input onChange={(event) => this.handleChange1(event)} placeholder="Your name" id="input-form" />
                    <br />
                    <input onChange={(event) => this.handleChange2(event)} placeholder="Your age" id="input-form" />
                    <br />
                    <input onChange={(event) => this.handleChange3(event)} placeholder="Your major" id="input-form" />
                    <br />
                    <button>Add</button>
                </form>
            </div>
        );
    }
}

export default AddUserInfor;
