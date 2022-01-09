import s from './HomeView.module.css';

import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Lottie from 'react-lottie';
import animationData from 'lotties/home-animation';

import { Button } from 'components/Button/Button';

function HomeView() {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const navigate = useNavigate();

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  const getTextAnimation = () => {
    const text = 'Welcome to your contacts manager';

    return text.split('').map(function (el, idx) {
      const style = { animationDelay: 0.5 + idx / 30 + 's' };

      return (
        <span key={idx} style={style} className={s.letter}>
          {el}
        </span>
      );
    });
  };

  return (
    <div className={s.wrapper}>
      <h2 className={s.text}>{getTextAnimation()}</h2>
      {isLoggedIn && (
        <Button
          type="button"
          styledClass="authBtn"
          iconName="icon-people"
          iconClass="formBtnIcon"
          text="Open my contacts"
          onClick={() => navigate('/contacts')}
        />
      )}
      <Lottie options={defaultOptions} height={420} width={420} />
    </div>
  );
}

export { HomeView };
