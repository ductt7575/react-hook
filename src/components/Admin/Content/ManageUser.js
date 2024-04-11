import ModalCreateUser from './ModalCreateUser';
import './ManageUser.scss';
import { useState } from 'react';
const ManageUser = (props) => {
  const [showModalCreateUser, setSowModalCreateUser] = useState(false);
  return (
    <div className="manage-user-container">
      <div className="title">Manage User</div>
      <div className="user-content">
        <div className="btn-add-new">
          <button className="btn btn-primary" onClick={() => setSowModalCreateUser(true)}>
            Add new user
          </button>
        </div>
        <div className="table-user-container">Table user</div>
        <ModalCreateUser show={showModalCreateUser} setShow={setSowModalCreateUser} />
      </div>
    </div>
  );
};
export default ManageUser;
