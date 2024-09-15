import React from 'react';
import { Fragment } from "react";
import { Menu, Transition, Disclosure } from "@headlessui/react";
import Container from "./container";
import cx from 'clsx';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo-mini.png';

const Navbar = (props) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const token = localStorage.getItem('token');
    const leftmenu = [
        {
            label: "Home",
            href: "/"
        },
        {
            label: "About",
            href: "/about"
        },
        {
            label: "Contact",
            href: "/contact"
        }
    ];

    const rightmenu = [
        {
            label: "Archive",
            href: "/archive"
        },
        {
            label: "Login",
            href: "/login",
        },
        {
            label: "Sign Up",
            href: "/signup",
        }
    ];

    const mobilemenu = [...leftmenu, ...rightmenu];
    const DropdownMenu = ({ menu, items, mobile }) => {
        return (
            <Menu
                as="div"
                className={cx("relative text-left", mobile && "w-full")}>
                {({ open }) => (
                    <>
                        <Menu
                            className={cx(
                                "flex items-center gap-x-1 rounded-md px-5 py-2 text-sm font-medium  outline-none transition-all focus:outline-none focus-visible:text-indigo-500 focus-visible:ring-1 dark:focus-visible:bg-gray-800",
                                open
                                    ? "text-blue-500 hover:text-blue-500"
                                    : " text-gray-600 dark:text-gray-400 ",
                                mobile ? "w-full px-4 py-2 " : "inline-block px-4 py-2"
                            )}>
                            <span>{menu.label}</span>

                        </Menu>
                        <Transition
                            as={Fragment}
                            enter="lg:transition lg:ease-out lg:duration-100"
                            enterFrom="lg:transform lg:opacity-0 lg:scale-95"
                            enterTo="lg:transform lg:opacity-100 lg:scale-100"
                            leave="lg:transition lg:ease-in lg:duration-75"
                            leaveFrom="lg:transform lg:opacity-100 lg:scale-100"
                            leaveTo="lg:transform lg:opacity-0 lg:scale-95">
                            <Menu
                                className={cx(
                                    "z-20 origin-top-left rounded-md  focus:outline-none  lg:absolute lg:left-0  lg:w-56",
                                    !mobile && "bg-white shadow-lg  dark:bg-gray-800"
                                )}>
                                <div className={cx(!mobile && "py-3")}>
                                    {items.map((item, index) => (
                                        <Menu as="div" key={`${item.title}${index}`}>
                                            {({ active }) => (
                                                <Link
                                                    href={item?.path ? item.path : "#"}
                                                    className={cx(
                                                        "flex items-center space-x-2 px-5 py-2 text-sm lg:space-x-4",
                                                        active
                                                            ? "text-blue-500"
                                                            : "text-gray-700 hover:text-blue-500 focus:text-blue-500 dark:text-gray-300"
                                                    )}>
                                                    <span> {item.title}</span>
                                                </Link>
                                            )}
                                        </Menu>
                                    ))}
                                </div>
                            </Menu>
                        </Transition>
                    </>
                )}
            </Menu>
        );
    };

    return (
        <Container>
            <nav>
                <Disclosure>
                    {({ open }) => (
                        <>
                            <div className="flex flex-wrap justify-between md:flex-nowrap md:gap-10">
                                <div className="order-1 hidden w-full flex-col items-center justify-start md:order-none md:flex md:w-auto md:flex-1 md:flex-row md:justify-end">
                                    {leftmenu.map((item, index) => (
                                        <Fragment key={`${item.label}${index}`}>
                                            {item.children && item.children.length > 0 ? (
                                                <DropdownMenu
                                                    menu={item}
                                                    key={`${item.label}${index}`}
                                                    items={item.children}
                                                />
                                            ) : (
                                                <Link
                                                    to={item.href}
                                                    key={`${item.label}${index}`}
                                                    className="px-5 py-2 text-sm font-medium text-gray-600 hover:text-blue-500 dark:text-gray-400"
                                                >
                                                    {item.label}
                                                </Link>
                                            )}
                                        </Fragment>
                                    ))}
                                </div>
                                <div className="flex w-full items-center justify-between md:w-auto">

                                    <Link to="/" className="hidden w-28 dark:block">

                                        <img
                                            src={logo}
                                            alt="Logo"
                                            className="w-full h-auto"
                                        />


                                    </Link>
                                    <Disclosure.Button
                                        aria-label="Toggle Menu"
                                        className="ml-auto rounded-md px-2 py-1 text-gray-500 focus:text-blue-500 focus:outline-none dark:text-gray-300 md:hidden ">
                                        <svg
                                            className="h-6 w-6 fill-current"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24">
                                            {open && (
                                                <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                                                />
                                            )}
                                            {!open && (
                                                <path
                                                    fillRule="evenodd"
                                                    d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                                                />
                                            )}
                                        </svg>
                                    </Disclosure.Button>
                                </div>

                                <div className="order-2 hidden w-full flex-col items-center justify-start md:order-none md:flex md:w-auto md:flex-1 md:flex-row">
                                    {rightmenu.map((item, index) => (
                                        <Fragment key={`${item.label}${index}`}>
                                            {item.children && item.children.length > 0 ? (
                                                <DropdownMenu
                                                    menu={item}
                                                    key={`${item.label}${index}`}
                                                    items={item.children}
                                                />
                                            ) : (
                                                <>
                                                    {item.label === "Sign Up" && token ? null : item.label === "Login" && token ? (
                                                        <button
                                                            onClick={() => {
                                                                localStorage.removeItem("token");
                                                                window.location.reload(); // Refresh page or navigate
                                                            }}
                                                            className="px-5 py-2 text-sm font-medium text-gray-600 hover:text-blue-500 dark:text-gray-400"
                                                        >
                                                            <span>Logout</span>
                                                        </button>
                                                    ) : (
                                                        <Link
                                                            to={item.href}
                                                            key={`${item.label}${index}`}
                                                            className="px-5 py-2 text-sm font-medium text-gray-600 hover:text-blue-500 dark:text-gray-400"
                                                            target={item.external ? "_blank" : ""}
                                                            rel={item.external ? "noopener" : ""}
                                                        >
                                                            <span>{item.label}</span>
                                                        </Link>
                                                    )}
                                                </>
                                            )}
                                        </Fragment>
                                    ))}
                                </div>

                            </div>
                            <Disclosure.Panel>
                                <div className="order-2 -ml-4 mt-4 flex w-full flex-col items-center justify-start md:hidden">
                                    {mobilemenu.map((item, index) => (
                                        <Fragment key={`${item.label}${index}`}>
                                            {item.children && item.children.length > 0 ? (
                                                <DropdownMenu
                                                    menu={item}
                                                    key={`${item.label}${index}`}
                                                    items={item.children}
                                                    mobile={true}
                                                />
                                            ) : (
                                                <Link
                                                    href={item.href}
                                                    key={`${item.label}${index}`}
                                                    className="w-full px-5 py-2 text-sm font-medium text-gray-600 hover:text-blue-500 dark:text-gray-400"
                                                    target={item.external ? "_blank" : ""}
                                                    rel={item.external ? "noopener" : ""}>
                                                    {item.label}
                                                </Link>
                                            )}
                                        </Fragment>
                                    ))}
                                </div>
                            </Disclosure.Panel>
                        </>
                    )}
                </Disclosure>
            </nav>
        </Container>
    );
    /* return (
         <nav className="bg-blue-500 p-4 shadow-md">
             <div className="container mx-auto flex justify-between items-center">
                 <div className="text-white text-lg font-bold">
                     <Link to="/" className="hover:text-gray-300">My Blog</Link>
                 </div>
 
                 <div className="space-x-4">
                     <Link to="/" className="text-white hover:text-gray-300">Home</Link>
                     <Link to="/bloglist" className="text-white hover:text-gray-300">Blogs</Link>
                     {token ? (
                         <button
                             onClick={handleLogout}
                             className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700"
                         >
                             Logout
                         </button>
                     ) : (
                         <>
                             <Link to="/login" className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700">
                                 Login
                             </Link>
                             <Link to="/signup" className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600">
                                 Sign Up
                             </Link>
                         </>
                     )}
                 </div>
             </div>
         </nav>
     );*/
};

export default Navbar;
