import ModalCreateUser from './ModalCreateUser';
const ManageUser = (props) => {
  return (
    <div className="user-management-container">
      <div className="title">Manage User</div>
      <div className="users-content">
        <div>
          <button>Add new user</button>
        </div>
        <div>
          Table user <ModalCreateUser />
        </div>
      </div>
    </div>
  );
};
export default ManageUser;
