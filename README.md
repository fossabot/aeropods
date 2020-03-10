# `@araclx/aeropods`
Aeropods is a collection of common boilerplates that aims to simplify your process of building next application based on React.js or Node.js. There are out-of-box configuration for Webpack, Docker and Kubernetes.


### Disclaimer
This project uses a `yarn@2` as a package manager, `npm` works well but if you're willing to use a stable version of `yarn` you need to remove `.yarnrc.yml` file, that will prevent some errors that you can see when you'll use `yarn`.

Tempomary we've skipped that dependency due to some issues with Docker which don't have actual solution, so we're leaving a configuration bellow and removing support for `yarn@2` for near time.

```
yarnPath: ./.yarn/releases/berry.js
enableInlineBuilds: true
pnpEnableInlining: true
enableScripts: true
enableGlobalCache: false
nodeLinker: node-modules
```

## How to use?
There are few different ways of using this boilerplate, probably the most deserved one is a enviroment on Docker which supports HMR, because you're avoiding compatibility issues, but local running of this boilerplate is also an option.

### Docker
Currently there are two commands related to Docker:
- `yarn run docker:dev:build`, this step sometimes throws errors but don't care about that and just jump into next command, we're working on fixing that issue.
- `yarn run docker:dev:start`
