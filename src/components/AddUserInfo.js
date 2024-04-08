import React, { useState } from 'react';

// class AddUserInfo extends React.Component {
//     state = {
//         name: '',
//         major: '',
//         age: '',
//     };

//     handleChange1(event) {
//         this.setState({
//             name: event.target.value,
//         });
//     }
//     handleChange2(event) {
//         this.setState({
//             age: event.target.value,
//         });
//     }
//     handleChange3(event) {
//         this.setState({
//             major: event.target.value,
//         });
//     }

//     handleSubmit(event) {
//         event.preventDefault();

//         this.props.handleAddNewUser({
//             id: Math.floor(Math.random() * 100 + 1) + '-random',
//             age: this.state.age,
//             name: this.state.name,
//             major: this.state.major,
//         });
//     }
//     render() {
//         return (
//             <>
//                 My name is {this.state.name} <br></br> I'm {this.state.age} <br></br> I am studying in{' '}
//                 {this.state.major}
//                 <form onSubmit={(event) => this.handleSubmit(event)}>
//                     <input onChange={(event) => this.handleChange1(event)} placeholder="Your name" id="input-form" />
//                     <br />
//                     <input onChange={(event) => this.handleChange2(event)} placeholder="Your age" id="input-form" />
//                     <br />
//                     <input onChange={(event) => this.handleChange3(event)} placeholder="Your major" id="input-form" />
//                     <br />
//                     <button>Add</button>
//                 </form>
//             </>
//         );
//     }
// }

const AddUserInfo = (props) => {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [major, setMajor] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        props.handleAddNewUser({
            id: Math.floor(Math.random() * 100 + 1) + '-random',
            age: age,
            name: name,
            major: major,
        });
    };
    return (
        <>
            My name is {name} <br></br> I'm {age} <br></br> I am studying in {major}
            <form onSubmit={(event) => handleSubmit(event)}>
                <input onChange={(event) => setName(event.target.value)} placeholder="Your name" id="input-form" />
                <br />
                <input onChange={(event) => setAge(event.target.value)} placeholder="Your age" id="input-form" />
                <br />
                <input onChange={(event) => setMajor(event.target.value)} placeholder="Your major" id="input-form" />
                <br />
                <button>Add</button>
            </form>
        </>
    );
};

export default AddUserInfo;
