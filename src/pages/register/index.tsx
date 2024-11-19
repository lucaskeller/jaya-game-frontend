import { useForm } from 'react-hook-form';
import { FormData } from './types';
import { useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { useGameContext } from '../../context/GameContext';
import mixpanel from 'mixpanel-browser';

const Register = () => {
  const [loading, setLoading] = useState(false);

  const { setCurrentUser } = useGameContext();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      mixpanel.track('User logged in');
      mixpanel.identify(data.email)

      const response = await axiosInstance.post('/game-users', {
        email: data.email,
      });

      setCurrentUser(response.data.data);

      navigate(`/game`);

    } catch (err) {
      console.error('Erro ao criar usuário:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Welcome to the game! =)</h1>
        </div>
      </header>
      <main>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            Let's play, insert your email to start.
            <div className="mt-2">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600 sm:max-w-md">
                <input
                  id="email"
                  type="email"
                  {...register('email', {
                    required: 'E-mail is mandatory.',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Invalid e-mail format.',
                    },
                  })}
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm/6"
                  disabled={loading}
                />
              </div>
            </div>
            {errors.email?.message && typeof errors.email.message === 'string' && <p className='text-red-600'>{errors.email.message}</p>}
            <div className="mt-2">
            <button
              type="submit"
              disabled={loading}
              className="relative inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300"
            >
              {loading ? (
                "Sending..."
              ) : (
                "Submit"
              )}
            </button>
            </div>
          </div>
        </form>
      </main>
    </>
  )
}

export default Register