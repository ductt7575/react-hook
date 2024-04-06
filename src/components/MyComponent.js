import React from 'react';

class MyComponent extends React.Component {
    state = {
        name: 'Trong Duc',
        address: 'Quận 8',
        age: 20,
    };

    handleChange(event) {
        this.setState({
            name: event.target.value,
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log(this.state);
    }

    //JSX: cho phép viết js bên trong code html
    render() {
        return (
            <div>
                My name is {this.state.name} I'm {this.state.age} and I'm from {this.state.address}
                <form onSubmit={(event) => this.handleSubmit(event)}>
                    <input onChange={(event) => this.handleChange(event)} placeholder="abc" id="input-form" />
                    <button>Click me</button>
                </form>
            </div>
        );
    }
}

export default MyComponent;
