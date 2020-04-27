import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import { Home, Dashboard } from './containers'
import { CTA } from './components'

/* Tailwind CSS
 * Global Import of TailwindCSS which allows to
 * use it in any component. */
import './index.css'

export const Foo = () => <h1>Foo Page</h1>
export const Bar = () => <h1>Bar Page</h1>

class Index extends React.Component<any, any> {
	render() {
		return (
			<React.Fragment>
				<Router>
					<Switch>
						<Route exact path="/">
							<Dashboard>
								<CTA />
							</Dashboard>
						</Route>
						<Route path="/foo" component={Foo} />
						<Route path="/bar" component={Bar} />
					</Switch>
				</Router>
			</React.Fragment>
		)
	}
}

ReactDOM.render(<Index />, document.getElementById('root'))
