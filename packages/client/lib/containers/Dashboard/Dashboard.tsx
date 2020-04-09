import * as React from 'react'
import { Link } from 'react-router-dom'

export class Dashboard extends React.Component<any, any> {
	render() {
		return (
			<React.Fragment>
				<div>
					<nav className="bg-gray-800">
						<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
							<div className="flex items-center justify-between h-16">
								<div className="flex items-center">
									<div className="hidden md:block">
										<div className="ml-10 flex items-baseline">
											<a
												href="#"
												className="px-3 py-2 rounded-md text-sm font-medium text-white bg-gray-900 focus:outline-none focus:text-white focus:bg-gray-700"
											>
												Welcome
											</a>
											<a
												href="#"
												className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
											>
												Team
											</a>
											<a
												href="#"
												className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
											>
												Projects
											</a>
											<a
												href="#"
												className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
											>
												Calendar
											</a>
											<a
												href="#"
												className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
											>
												Reports
											</a>
										</div>
									</div>
								</div>
								<div className="-mr-2 flex md:hidden">
									<button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white">
										<svg
											className="h-6 w-6"
											stroke="currentColor"
											fill="none"
											viewBox="0 0 24 24"
										>
											<path
												className="inline-flex"
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="2"
												d="M4 6h16M4 12h16M4 18h16"
											/>
											<path
												className="hidden"
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
						<div className="hidden md:hidden">
							<div className="px-2 pt-2 pb-3 sm:px-3">
								<a
									href="#"
									className="block px-3 py-2 rounded-md text-base font-medium text-white bg-gray-900 focus:outline-none focus:text-white focus:bg-gray-700"
								>
									Dashboard
								</a>
								<a
									href="#"
									className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
								>
									Team
								</a>
								<a
									href="#"
									className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
								>
									Projects
								</a>
								<a
									href="#"
									className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
								>
									Calendar
								</a>
								<a
									href="#"
									className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
								>
									Reports
								</a>
							</div>
							<div className="pt-4 pb-3 border-t border-gray-700">
								<div className="flex items-center px-5">
									<div className="flex-shrink-0">
										<img
											className="h-10 w-10 rounded-full"
											src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
											alt=""
										/>
									</div>
									<div className="ml-3">
										<div className="text-base font-medium leading-none text-white">
											Tom Cook
										</div>
										<div className="mt-1 text-sm font-medium leading-none text-gray-400">
											tom@example.com
										</div>
									</div>
								</div>
								<div
									className="mt-3 px-2"
									role="menu"
									aria-orientation="vertical"
									aria-labelledby="user-menu"
								>
									<a
										href="#"
										className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
										role="menuitem"
									>
										Your Profile
									</a>
									<a
										href="#"
										className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
										role="menuitem"
									>
										Settings
									</a>
									<a
										href="#"
										className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
										role="menuitem"
									>
										Sign out
									</a>
								</div>
							</div>
						</div>
					</nav>
					<header className="bg-white shadow">
						<div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
							<h1 className="text-3xl font-bold leading-tight text-gray-900">
								@aeropods/client
							</h1>
						</div>
					</header>
					<main>
						<div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
							<div className="px-4 py-6 sm:px-0">
								<div className="border-4 border-dashed border-gray-200 rounded-lg h-96">
									{this.props.children}
								</div>
							</div>
						</div>
					</main>
				</div>
			</React.Fragment>
		)
	}
}