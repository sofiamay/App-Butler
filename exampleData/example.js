{
  serverType: 'node-express',
  appName: 'myApp',
  serverSettings: {
    port: 3000,
    expressName: 'app'
  },
  middleware: [
  {
    type: 'REQUIRE',
    url: './config/middleware.js',
    arguments: 'app, express'
    statements: [
    {
      name: 'bodyParser'
    },
    {
      name: 'static-location',
      url: '/../../../client'
    }
    ]
  }
  ]
  routes: [
  {
    type: 'endpoint',
    methods: [
    {
      type: 'GET',
      action: 'doshit.doit'
    }
    ]
  },
  {
    type: 'router',
    url: '/api/pancakes',
    routes: [
    {
      type: 'endpoint',
      methods: [
      {
        type: 'GET',
        action: 'do.it'
      }
      ]
    }
    ]
  }
  ]
}