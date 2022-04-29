import { useForm } from 'react-hook-form';
import { auth, signInWithEmailAndPassword } from '../../../firebase';

import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../features/userSlice';

import s from './style.module.css';
import { getDatabase, ref, set } from 'firebase/database';

const imageUrl =
  'https://cdn.dribbble.com/users/28141/screenshots/18130221/protect.png?compress=1&resize=320x240&vertical=top';

function writeUserData(userId, name, email, imageUrl) {
  const db = getDatabase();
  set(ref(db, 'users/' + userId), {
    email: email,
    profile_picture: imageUrl,
  });
}
const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const dispatch = useDispatch();

  const { name, email, uid } = useSelector(({ user }) => user.user);
  writeUserData(uid, name, email, imageUrl);

  const onSubmit = ({ email, password }) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userAuth) => {
        dispatch(
          login({
            email: userAuth.user.email,
            uid: userAuth.user.uid,
            displayName: userAuth.user.displayName,
          })
        );
      })
      .then(() => {
        alert('Вы вошли');
        reset();
      })
      .catch((err) => alert(err));
  };
  return (
    <div className={s.main}>
      <h1 className="text-3xl text-slate-800 my-4">Регистрация</h1>
      <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
        <label className={s.title}>
          Эл. адрес
          <input
            className={s.field}
            {...register('email', {
              required: 'Поле обязательно для заполнения',
            })}
            placeholder="example@mail.com"
          />
          {errors.email && <span>{errors.email.message}</span>}
        </label>
        <label className={s.title}>
          Пароль
          <input
            className={s.field}
            type="password"
            {...register('password', {
              required: 'Поле обязательно для заполнения',
            })}
            placeholder="Введите пароль"
          />
          {errors.password && <span>{errors.password.message}</span>}
        </label>
        <button className={s.btn} type="submit">
          Зарегестрироваться
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
