import ReactPaginate from 'react-paginate';
import { useTranslation } from 'react-i18next';

const TableUserPaginate = (props) => {
  const { listUsers, pageCount, handlePageClick } = props;
  const { t } = useTranslation();

  return (
    <>
      <table className="table table-hover table-bordered">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">{t('username')}</th>
            <th scope="col">Email</th>
            <th scope="col">{t('role')}</th>
            <th>{t('manageUser.table.action')}</th>
          </tr>
        </thead>
        <tbody>
          {listUsers &&
            listUsers.length > 0 &&
            listUsers.map((user, index) => {
              return (
                <tr key={`table-user-${index}`}>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <button className="btn btn-secondary" onClick={() => props.handleClickBtnView(user)}>
                      {t('manageUser.button.detail')}
                    </button>
                    <button className="btn btn-warning mx-3" onClick={() => props.handleClickBtnUpdate(user)}>
                      {t('manageUser.button.update')}
                    </button>
                    <button className="btn btn-danger" onClick={() => props.handleClickBtnDelete(user)}>
                      {t('manageUser.button.delete')}
                    </button>
                  </td>
                </tr>
              );
            })}
          {listUsers && listUsers.length === 0 && (
            <tr>
              <td colSpan={'4'}>{t('table.error')}</td>
            </tr>
          )}
        </tbody>
      </table>
      <ReactPaginate
        nextLabel={t('manageUser.table.next')}
        onPageChange={(event) => handlePageClick(event)}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        previousLabel={t('manageUser.table.prev')}
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
        forcePage={props.currentPage - 1}
      />
    </>
  );
};

export default TableUserPaginate;
