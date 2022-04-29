import { useForm } from 'react-hook-form';
import { auth, createUserWithEmailAndPassword } from '../../../firebase';

import { useDispatch } from 'react-redux';
import { login } from '../../features/userSlice';

import s from './style.module.css';

const emailRegex =
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordRegex =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!"#$%&'()*+,-.\/:;<=>?\\@[\]^_`{|}~]).{6,64}$/;

const RegistrForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const dispatch = useDispatch();

  const onSubmit = ({ email, password, name }) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userAuth) => {
        console.log(userAuth);
        dispatch(
          login({
            email: userAuth.user.email,
            uid: userAuth.user.uid,
            displayName: name,
          })
        );
      })
      .then(() => {
        alert('Вы успешно зарегались');
        reset();
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <div className={s.main}>
      <h1 className="text-3xl text-slate-800 my-4">Регистрация</h1>
      <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
        <label className={s.title}>
          Имя
          <input
            className={s.field}
            {...register('name', {
              required: 'Поле обязательно для заполнения',
              maxLength: { value: 20, message: 'Имя слишком длинное' },
            })}
            placeholder="Введите имя"
          />
          {errors.name && <span>{errors.name.message}</span>}
        </label>
        <label className={s.title}>
          Эл. адрес
          <input
            className={s.field}
            {...register('email', {
              required: 'Поле обязательно для заполнения',
              pattern: {
                value: emailRegex,
                message: 'Неверный формат email',
              },
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
              pattern: {
                value: passwordRegex,
                message:
                  'Пароль должен содержать не менее 6 символов, включая одну заглавную букву, одну строчную букву, одну цифру и один спецсимвол',
              },
            })}
            placeholder="Минимум 6 символов"
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

export default RegistrForm;
