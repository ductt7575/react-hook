import React from 'react';

class MyComponent extends React.Component {
    state = {
        name: 'Trong Duc',
        address: 'Quận 8',
        age: 20,
    };

    //JSX: cho phép viết js bên trong code html
    render() {
        return (
            <div>
                My name is {this.state.name} I'm {this.state.age} and I'm from {this.state.address}
            </div>
        );
    }
}

export default MyComponent;
