import s from './BinContactsList.module.css';
import { ReactComponent as ReactSprite } from 'images/sprite.svg';

import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';

import { useAddContactMutation } from 'store/contacts/contsctsAPI';

import { Loader } from 'components/Loader/Loader';
import { EmptyMessage } from 'components/EmptyMessage/EmptyMessage';
import { Button } from 'components/Button/Button';
import { toast } from 'react-toastify';

function BinContactListItem({ el }) {
  const dispatch = useDispatch();
  // const [deleteContact, { isLoading }] = useDeleteBinContactMutation();
  const [restoreContact] = useAddContactMutation();

  const restoreContactHandler = contact => {
    restoreContact({ contact });
    // deleteContact(contact.id);
    toast.success(
      `You successfully restored "${contact.name.toUpperCase()}" back to conacts!`,
    );
  };

  return (
    <>
      {/* {isLoading ? <Loader size={30} color={'rgba(1, 107, 110, 0.3)'} /> : null} */}
      <svg className={s.icon}>
        <use href="#icon-perm_contact"></use>
      </svg>
      <div className={s.info}>
        <span className={s.name}>{el.name}</span>
        <span className={s.number}>{el.number}</span>
      </div>
      <div className={s.controls}>
        <Button
          type="button"
          styledClass={classNames('btn', 'binItemBtn')}
          iconClass={'binIcon'}
          iconName={'icon-restore'}
          text="Restore"
          onClick={() => restoreContactHandler(el)}
          disabled={false}
        />
        <Button
          type="button"
          styledClass={classNames('btn', 'binItemBtn', 'deleteForever')}
          iconClass={'binIcon'}
          iconName={'icon-delete_forever'}
          text="Delete"
          // onClick={() => deleteContact(el.id)}
          disabled={false}
        />
      </div>
    </>
  );
}

function BinContactsList({ toast }) {
  const contacts = useSelector(state => state.bin);
  // const { data: contacts, isFetching } = [];
  console.log(contacts);
  return (
    <div>
      {contacts?.length ? (
        <ul className={s.list}>
          {contacts.map(el => (
            <li key={el.id} className={s.item}>
              <BinContactListItem el={el} toast={toast} />
            </li>
          ))}
        </ul>
      ) : (
        //  : isFetching ? (
        //   <Loader size={60} color={'rgba(252, 0, 0, 0.3)'} />
        // )
        <EmptyMessage message="You don't have any contacts in the trash" />
      )}
      <ReactSprite />
    </div>
  );
}

export { BinContactsList };
