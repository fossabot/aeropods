# `@aeropod/api`

### Warning
We've put a lot of work into Webpack configuration, sadly that was pointless because it's get broken by TypeORM, we'll still look into potential solution but it can take a lof of time to be ready to use, meanwhile we've introduced a `ts-node` and `ts-node-dev` as a building solutions.

```
  "scripts": {
    "build": "wp --config webpack/webpack.prod.js",
    "dev": "wp --silent --config webpack/webpack.dev.js"
  },
```


    cache: {
        type: "ioredis/cluster",
        options: {
            startupNodes: [
                {
                    host: 'localhost',
                    port: 7000,
                },
                {
                    host: 'localhost',
                    port: 7001,
                },
                {
                    host: 'localhost',
                    port: 7002,
                }
            ],
            options: {
                scaleReads: 'all',
                clusterRetryStrategy: function (times) { return null },
                redisOptions: {
                    maxRetriesPerRequest: 1
                }
            }
        }
    }