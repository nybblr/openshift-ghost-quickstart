// # Ghost Configuration
// Setup your Ghost install for various environments
// Documentation can be found at http://support.ghost.org/config/

var path = require('path'),
    config;
var config;

config = {
  // ### Production
  // When running Ghost in the wild, use the production environment
  // Configure your URL and mail settings here
  production: {
    url: process.env.HOME_URL,
    forceAdminSSL: true,
    mail: {},
    server: {
      // Host to be passed to node's `net.Server#listen()`
      host: process.env.OPENSHIFT_NODEJS_IP,
      // Port to be passed to node's `net.Server#listen()`, for iisnode set this to `process.env.PORT`
      port: process.env.OPENSHIFT_NODEJS_PORT
    },
    paths: {
      contentPath: path.join(__dirname, '/content/'),
      wellKnown: '/tmp/letsencrypt/public_html/.well-known/'
    }
  }
};

if (process.env.OPENSHIFT_MYSQL_DB_HOST) {
  config.production.database = {
    client: 'mysql',
    connection: {
      host     : process.env.OPENSHIFT_MYSQL_DB_HOST,
      port     : process.env.OPENSHIFT_MYSQL_DB_PORT,
      user     : process.env.OPENSHIFT_MYSQL_DB_USERNAME,
      password : process.env.OPENSHIFT_MYSQL_DB_PASSWORD,
      database : process.env.OPENSHIFT_APP_NAME,
      charset  : 'utf8'
    }
  };
} else if (process.env.OPENSHIFT_POSTGRESQL_DB_HOST) {
  config.production.database = {
    client: 'pg',
    connection: {
      host     : process.env.OPENSHIFT_POSTGRESQL_DB_HOST,
      port     : process.env.OPENSHIFT_POSTGRESQL_DB_PORT,
      user     : process.env.OPENSHIFT_POSTGRESQL_DB_USERNAME,
      password : process.env.OPENSHIFT_POSTGRESQL_DB_PASSWORD,
      database : process.env.OPENSHIFT_APP_NAME,
      charset  : 'utf8'
    }
  };
}

config.development = {
  // The url to use when providing links to the site, E.g. in RSS and email.
  url: 'http://my-ghost-blog.com',

  // Example mail config
  // Visit http://support.ghost.org/mail for instructions
  // ```
  //  mail: {
  //      transport: 'SMTP',
  //      options: {
  //          service: 'Mailgun',
  //          auth: {
  //              user: '', // mailgun username
  //              pass: ''  // mailgun password
  //          }
  //      }
  //  },
  // ```

  database: {
    client: 'sqlite3',
    connection: {
      filename: path.join(__dirname, '/content/data/ghost-dev.db')
    },
    debug: false
  },
  server: {
    // Host to be passed to node's `net.Server#listen()`
    host: '127.0.0.1',
    // Port to be passed to node's `net.Server#listen()`, for iisnode set this to `process.env.PORT`
    port: '2368'
  },
  paths: {
    contentPath: path.join(__dirname, '/content/')
  }
};

// Export config
module.exports = config;
