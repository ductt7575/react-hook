import React from 'react';

class DisplayInfo extends React.Component {
    render() {
        //Destructuring Array/Object
        const { age, name } = this.props;
        console.log(this.props);
        return (
            <div>
                <div>My name is {name}</div>
                <div>My age is {age}</div>
            </div>
        );
    }
}

export default DisplayInfo;
