import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { LogIn, UserPlus, X } from 'lucide-react';

interface RegistrationFormData {
  name: string;
  email: string;
  employeeId: string;
  iqamaNumber: string;
  jobTitle: string;
  password: string;
  confirmPassword: string;
}

const initialRegistrationData: RegistrationFormData = {
  name: '',
  email: '',
  employeeId: '',
  iqamaNumber: '',
  jobTitle: '',
  password: '',
  confirmPassword: ''
};

export function Login() {
  const navigate = useNavigate();
  const { login, registerUser } = useAuthStore();
  const [showRegistration, setShowRegistration] = useState(false);
  const [formData, setFormData] = useState<RegistrationFormData>(initialRegistrationData);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(loginData.email, loginData.password);
    if (success) {
      navigate('/', { replace: true });
    } else {
      setError('Invalid credentials or user not approved');
    }
  };

  const handleRegistration = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    registerUser({
      email: formData.email,
      name: formData.name,
      role: 'user'
    });

    setShowRegistration(false);
    setFormData(initialRegistrationData);
    setError('Registration successful. Please wait for admin approval.');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLoginInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  return (
    <div className="min-h-screen flex flex-col justify-center bg-gray-50 px-8">
      <div className="w-full max-w-md mx-auto">
        <div className="flex flex-col items-center py-12">
          <img
            src="https://e.top4top.io/p_3231azaak1.png"
            alt="Shiba Al Jazira Contracting Company"
            className="h-32 w-auto object-contain"
          />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900 text-center">
            شركة شبه الجزيرة للمقاولات
          </h2>
          <p className="mt-2 text-base text-gray-600 text-center">
            المنطقة الشمالية
          </p>
          <h3 className="mt-4 text-xl font-bold text-gray-900 text-center">
            تسجيل الدخول
          </h3>
        </div>

        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm" role="alert">
            <span className="block">{error}</span>
          </div>
        )}

        <div className="bg-white py-8 px-10 shadow rounded-lg">
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                البريد الإلكتروني
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={loginData.email}
                  onChange={handleLoginInputChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                  placeholder="أدخل البريد الإلكتروني"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                كلمة المرور
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={loginData.password}
                  onChange={handleLoginInputChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                  placeholder="أدخل كلمة المرور"
                />
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <LogIn className="h-5 w-5 ml-2" />
                تسجيل الدخول
              </button>
              <button
                type="button"
                onClick={() => setShowRegistration(true)}
                className="w-full flex justify-center py-2 px-4 border border-blue-600 rounded-md shadow-sm text-sm font-medium text-blue-600 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <UserPlus className="h-5 w-5 ml-2" />
                تسجيل مستخدم جديد
              </button>
            </div>
          </form>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          تم التطوير عن طريق مهندس تامر الجوهري
        </div>
      </div>

      {/* Registration Modal */}
      {showRegistration && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-md">
            <div className="bg-white px-6 py-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">تسجيل حساب جديد</h3>
                <button
                  onClick={() => setShowRegistration(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>

            <div className="px-6 py-4">
              <form onSubmit={handleRegistration} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    الاسم الكامل
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="reg-email" className="block text-sm font-medium text-gray-700">
                    البريد الإلكتروني
                  </label>
                  <input
                    type="email"
                    id="reg-email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="employeeId" className="block text-sm font-medium text-gray-700">
                    الرقم الوظيفي
                  </label>
                  <input
                    type="text"
                    id="employeeId"
                    name="employeeId"
                    required
                    value={formData.employeeId}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="iqamaNumber" className="block text-sm font-medium text-gray-700">
                    رقم الإقامة
                  </label>
                  <input
                    type="text"
                    id="iqamaNumber"
                    name="iqamaNumber"
                    required
                    value={formData.iqamaNumber}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700">
                    المسمى الوظيفي
                  </label>
                  <input
                    type="text"
                    id="jobTitle"
                    name="jobTitle"
                    required
                    value={formData.jobTitle}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="reg-password" className="block text-sm font-medium text-gray-700">
                    كلمة المرور
                  </label>
                  <input
                    type="password"
                    id="reg-password"
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                    تأكيد كلمة المرور
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    required
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                  />
                </div>

                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowRegistration(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    إلغاء
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                  >
                    تسجيل
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}