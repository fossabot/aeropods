import * as React from 'react'
import { Link } from 'react-router-dom'

export class Navbar extends React.Component<any, any> {
	render() {
		return (
			<React.Fragment>
				<nav>
					<Link to="/">Home</Link>
					<Link to="/about"></Link>
					<Link to="/foo">Foo</Link>
					<Link to="/bar">Bar</Link>
				</nav>
			</React.Fragment>
		)
	}
}
