import { useEffect, useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, Head } from '@inertiajs/react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import usePWA from '@/Hooks/usePWA';
import { saveDraft, getCachedUser } from '../db';

export default function Authenticated({ user: serverUser, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const [user, setUser] = useState(serverUser);
    const { showInstallButton, handleInstall, dismissInstall, isIOS, browserInfo } = usePWA();

    useEffect(() => {
        if (navigator.onLine) {
            if (serverUser) {
                saveDraft('loggedInUser', serverUser);
                setUser(serverUser);
            }
        } else {
            getCachedUser().then(cached => {
                if (cached) setUser(cached);
            });
        }
    }, [serverUser]);

    return (
        <div className="min-h-screen bg-gray-100">
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="theme-color" content="#000000" />
                <meta name="description" content="Your app description" />
                <link rel="manifest" href="/manifest.json" />
                <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-status-bar-style" content="default" />
                <meta name="apple-mobile-web-app-title" content="Your App Name" />
                
                {/* iOS specific meta tags */}
                <link rel="apple-touch-icon" sizes="180x180" href="/icons/icon-192x192.png" />
                <link rel="apple-touch-startup-image" href="/icons/icon-512x512.png" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="apple-touch-fullscreen" content="yes" />
            </Head>
            <nav className="bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="shrink-0 flex items-center">
                                <Link href="/">
                                    <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />
                                </Link>
                            </div>

                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                <NavLink href={route('dashboard')} active={route().current('dashboard')}>
                                    Dashboard
                                </NavLink>
                                <NavLink href={route('field-records')} active={route().current('field-records')}>
                                    Field Reports
                                </NavLink>
                                <NavLink href={route('return-visits.index')} active={route().current('return-visits.index')}>
                                    Return Visits
                                </NavLink>
                                <NavLink href={route('bible-studies.index')} active={route().current('bible-studies.index')}>
                                    Bible Studies
                                </NavLink>
                                <NavLink href={route('bible-students.index')} active={route().current('bible-students.index')}>
                                    Bible Students
                                </NavLink>
                            </div>
                        </div>

                        <div className="hidden sm:flex sm:items-center sm:ms-6">
                            <div className="ms-3 relative">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                            >
                                                {user?.name}

                                                <svg
                                                    className="ms-2 -me-0.5 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                                        <Dropdown.Link href={route('logout')} method="post" as="button">
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                            >
                                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path
                                        className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
                            Dashboard
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('field-records')} active={route().current('field-records')}>
                            Field Reports
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('return-visits.index')} active={route().current('return-visits.index')}>
                            Return Visits
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('bible-studies.index')} active={route().current('bible-studies.index')}>
                            Bible Studies
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('bible-students.index')} active={route().current('bible-students.index')}>
                            Bible Students
                        </ResponsiveNavLink>
                    </div>

                    <div className="pt-4 pb-1 border-t border-gray-200">
                        <div className="px-4">
                            <div className="font-medium text-base text-gray-800">{user?.name}</div>
                            <div className="font-medium text-sm text-gray-500">{user?.email}</div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route('profile.edit')}>Profile</ResponsiveNavLink>
                            <ResponsiveNavLink method="post" href={route('logout')} as="button">
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>
                </header>
            )}

            <main>{children}</main>
            <ToastContainer position="top-right" autoClose={3000} />
             
            

            {/* PWA Install Button - iOS Compatible */}
            {showInstallButton && (
                <div className="fixed bottom-4 right-4 bg-blue-500 text-white p-4 rounded-lg shadow-lg z-50 max-w-sm">
                    {isIOS ? (
                        <>
                            <div className="flex items-center justify-between mb-2">
                                <p className="text-sm font-semibold">Install App</p>
                                <button 
                                    onClick={dismissInstall}
                                    className="text-white hover:text-gray-200 text-lg leading-none"
                                >
                                    ×
                                </button>
                            </div>
                            {browserInfo.isIOSSafari ? (
                                <div className="text-xs space-y-1">
                                    <p className="mb-2">Add to Home Screen:</p>
                                    <div className="flex items-center space-x-1">
                                        <span>1. Tap</span>
                                        <div className="inline-flex items-center justify-center w-6 h-6 bg-white rounded text-blue-500 text-sm">
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.50-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"/>
                                            </svg>
                                        </div>
                                        <span>Share</span>
                                    </div>
                                    <div>2. Scroll and tap "Add to Home Screen"</div>
                                    <div>3. Tap "Add"</div>
                                </div>
                            ) : (
                                <div className="text-xs space-y-1">
                                    <p className="mb-2">Chrome iOS doesn't support PWA installation.</p>
                                    <p>Please use Safari for the best experience.</p>
                                </div>
                            )}
                        </>
                    ) : (
                        <>
                            <p className="mb-2 text-sm">Install our app for a better experience!</p>
                            <button
                                onClick={handleInstall}
                                className="bg-white text-blue-500 px-4 py-2 rounded font-semibold text-sm w-full"
                            >
                                Install App
                            </button>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}
