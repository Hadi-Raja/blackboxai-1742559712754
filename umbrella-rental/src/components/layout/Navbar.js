import { Fragment } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon, UserCircleIcon } from '@heroicons/react/24/outline';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = localStorage.getItem('token');

  const publicNavigation = [
    { name: 'Home', href: '/' },
    { name: 'How it Works', href: '/how-it-works' },
  ];

  const privateNavigation = [
    { name: 'Home', href: '/' },
    { name: 'Rent', href: '/rent' },
    { name: 'Locations', href: '/locations' },
    { name: 'How it Works', href: '/how-it-works' },
  ];

  const navigation = isAuthenticated ? privateNavigation : publicNavigation;

  const handleSignOut = () => {
    localStorage.removeItem('token');
    window.location.reload();
    navigate('/login');
  };

  return (
    <Disclosure as="nav" className="bg-white shadow-lg sticky top-0 z-50">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between">
              <div className="flex">
                <div className="flex flex-shrink-0 items-center">
                  <Link 
                    to="/" 
                    className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors duration-200 flex items-center gap-2"
                  >
                    <i className="fas fa-umbrella text-3xl"></i>
                    <span>Coverly</span>
                  </Link>
                </div>
                <div className="hidden sm:ml-8 sm:flex sm:space-x-8">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={classNames(
                        location.pathname === item.href
                          ? 'border-blue-600 text-blue-600 font-semibold'
                          : 'border-transparent text-gray-500 hover:text-blue-600 hover:border-blue-600',
                        'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium transition-colors duration-200'
                      )}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
              
              <div className="hidden sm:ml-6 sm:flex sm:items-center">
                {isAuthenticated ? (
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="flex rounded-full bg-white p-1 text-sm hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200">
                        <UserCircleIcon className="h-8 w-8 text-gray-400 hover:text-blue-600 transition-colors duration-200" aria-hidden="true" />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-lg bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/profile"
                              className={classNames(
                                active ? 'bg-gray-50 text-blue-600' : 'text-gray-700',
                                'block px-4 py-2 text-sm transition-colors duration-200'
                              )}
                            >
                              <i className="fas fa-user mr-2"></i>Your Profile
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/bookings"
                              className={classNames(
                                active ? 'bg-gray-50 text-blue-600' : 'text-gray-700',
                                'block px-4 py-2 text-sm transition-colors duration-200'
                              )}
                            >
                              <i className="fas fa-calendar-alt mr-2"></i>Your Bookings
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={handleSignOut}
                              className={classNames(
                                active ? 'bg-gray-50 text-red-600' : 'text-gray-700',
                                'block w-full text-left px-4 py-2 text-sm transition-colors duration-200'
                              )}
                            >
                              <i className="fas fa-sign-out-alt mr-2"></i>Sign out
                            </button>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                ) : (
                  <div className="flex items-center space-x-4">
                    <Link
                      to="/login"
                      className="text-gray-500 hover:text-blue-600 font-medium text-sm transition-colors duration-200"
                    >
                      Sign in
                    </Link>
                    <Link
                      to="/register"
                      className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                    >
                      Sign up
                    </Link>
                  </div>
                )}
              </div>

              <div className="-mr-2 flex items-center sm:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-50 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-colors duration-200">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as={Link}
                  to={item.href}
                  className={classNames(
                    location.pathname === item.href
                      ? 'bg-blue-50 border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-blue-600 hover:text-blue-600',
                    'block border-l-4 py-2 pl-3 pr-4 text-base font-medium transition-colors duration-200'
                  )}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
            {isAuthenticated ? (
              <div className="border-t border-gray-200 pb-3 pt-4">
                <div className="space-y-1">
                  <Disclosure.Button
                    as={Link}
                    to="/profile"
                    className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-blue-600 transition-colors duration-200"
                  >
                    <i className="fas fa-user mr-2"></i>Your Profile
                  </Disclosure.Button>
                  <Disclosure.Button
                    as={Link}
                    to="/bookings"
                    className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-blue-600 transition-colors duration-200"
                  >
                    <i className="fas fa-calendar-alt mr-2"></i>Your Bookings
                  </Disclosure.Button>
                  <Disclosure.Button
                    as="button"
                    onClick={handleSignOut}
                    className="block w-full text-left px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-red-600 transition-colors duration-200"
                  >
                    <i className="fas fa-sign-out-alt mr-2"></i>Sign out
                  </Disclosure.Button>
                </div>
              </div>
            ) : (
              <div className="border-t border-gray-200 pb-3 pt-4">
                <div className="space-y-1">
                  <Disclosure.Button
                    as={Link}
                    to="/login"
                    className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-blue-600 transition-colors duration-200"
                  >
                    Sign in
                  </Disclosure.Button>
                  <Disclosure.Button
                    as={Link}
                    to="/register"
                    className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-blue-600 transition-colors duration-200"
                  >
                    Sign up
                  </Disclosure.Button>
                </div>
              </div>
            )}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}