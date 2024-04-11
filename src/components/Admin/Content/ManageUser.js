import ModalCreateUser from './ModalCreateUser';
import './ManageUser.scss';
import TableUser from './TableUser';
import { useEffect, useState } from 'react';
import { getAllUsers } from '../../../services/apiService';
const ManageUser = (props) => {
  const [showModalCreateUser, setSowModalCreateUser] = useState(false);

  const [listUsers, setListUsers] = useState([]);
  //ComponentDidMount
  useEffect(() => {
    fetchListUsers();
  }, []);

  const fetchListUsers = async () => {
    let res = await getAllUsers();
    if (res.EC === 0) {
      setListUsers(res.DT);
    }
  };

  return (
    <div className="manage-user-container">
      <div className="title">Manage User</div>
      <div className="user-content">
        <div className="btn-add-new">
          <button className="btn btn-primary" onClick={() => setSowModalCreateUser(true)}>
            Add new user
          </button>
        </div>
        <div className="table-user-container">
          <TableUser listUsers={listUsers} />
        </div>
        <ModalCreateUser show={showModalCreateUser} setShow={setSowModalCreateUser} fetchListUsers={fetchListUsers} />
      </div>
    </div>
  );
};
export default ManageUser;
