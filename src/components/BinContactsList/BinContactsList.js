import s from './BinContactsList.module.css';
import { ReactComponent as ReactSprite } from 'images/sprite.svg';

import { useDispatch, useSelector } from 'react-redux';

import { useAddContactMutation } from 'store/contacts/contsctsAPI';
import { deleteFromBin, deleteAllFromBin } from 'store/bin/actions-bin';

import { EmptyMessage } from 'components/EmptyMessage/EmptyMessage';
import { Button } from 'components/Button/Button';
import { toast } from 'react-toastify';

function BinContactListItem({ el }) {
  const [restoreContact] = useAddContactMutation();

  const dispatch = useDispatch();

  const restoreContactHandler = contact => {
    restoreContact({ contact });
    dispatch(deleteFromBin({ id: contact.id }));

    toast.success(
      `You successfully restored "${contact.name.toUpperCase()}" back to conacts!`,
    );
  };

  return (
    <>
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
          styledClass="binItemBtn"
          iconClass="binIcon"
          iconName="icon-restore"
          text="Restore"
          onClick={() => restoreContactHandler(el)}
          disabled={false}
        />
        <Button
          type="button"
          styledClass="deleteForever"
          iconClass="binIcon"
          iconName="icon-delete_forever"
          text="Delete"
          onClick={() => dispatch(deleteFromBin({ id: el.id }))}
          disabled={false}
        />
      </div>
    </>
  );
}

function BinContactsList({ toast }) {
  const contacts = useSelector(state => state.bin);
  const [restoreContact] = useAddContactMutation();

  const dispatch = useDispatch();

  const restoreContactHandler = () => {
    contacts.map(el => restoreContact({ contact: el }));
    dispatch(dispatch(deleteAllFromBin()));
  };

  return (
    <>
      {contacts?.length ? (
        <div>
          <ul className={s.listControls}>
            <li className={s.listControlsItem}>
              <Button
                type="button"
                styledClass="binItemBtn"
                iconClass="binIcon"
                iconName="icon-restore"
                text="Restore All"
                onClick={restoreContactHandler}
                disabled={false}
              />
            </li>
            <li className={s.controlsItem}>
              <Button
                type="button"
                styledClass="deleteForever"
                iconClass="binIcon"
                iconName="icon-delete_forever"
                text="Delete All"
                onClick={() => dispatch(deleteAllFromBin())}
                disabled={false}
              />
            </li>
          </ul>
          <ul className={s.list}>
            {contacts.map(el => (
              <li key={el.id} className={s.item}>
                <BinContactListItem el={el} toast={toast} />
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <EmptyMessage message="You don't have any contacts in the trash" />
      )}
      <ReactSprite />
    </>
  );
}

export default BinContactsList;
