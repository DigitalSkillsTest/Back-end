const convict = require('convict');

const config = convict({
  env: {
    doc: 'The applicaton environment.',
    format: ['production', 'development', 'test', 'demo', 'failover'],
    default: 'development',
    env: 'NODE_ENV',
    arg: 'env',
  },
  cluster: {
    workerCount: {
      doc: 'No of worker Thread',
      format: Number,
      default: 4,
    },
  },
  server: {
    port: {
      doc: 'HTTP port to bind',
      format: 'port',
      default: 80,
      env: 'PORT',
    },
    addressFamily: {
      doc: 'Bind Address Family IPV4/IPV6',
      format: String,
      default: '0.0.0.0',
    },
    enableHttpLogging: {
      doc: 'Enable HTTP Logging',
      format: Boolean,
      default: true,
    },
    enableCompression: {
      doc: 'Enable HTTP compression',
      format: Boolean,
      default: true,
    },
    enableStatic: {
      doc: 'Enable Express static server',
      format: Boolean,
      default: true,
    },
    static: {
      directory: {
        doc: 'Express static server content directory',
        format: String,
        default: 'public',
      },
      options: {
        doc: 'Express static server options',
        format: Object,
        default: { maxAge: 0 },
      },
    },
    security: {
      enableXframe: {
        doc: 'Enable Iframe protection',
        format: Boolean,
        default: true,
      },
      enableHidePoweredBy: {
        doc: 'Hide X powered by Header',
        format: Boolean,
        default: true,
      },
      enableNoCaching: {
        doc: 'Enable No caching',
        format: Boolean,
        default: false,
      },
      enableCSP: {
        doc: 'Enable CSP policy',
        format: Boolean,
        default: false,
      },
      enableHSTS: {
        doc: 'Enable HSTS',
        format: Boolean,
        default: false,
      },
      enableXssFilter: {
        doc: 'Enable XSS filter protection',
        format: Boolean,
        default: true,
      },
      enableForceContentType: {
        doc: 'Enable force content type',
        format: Boolean,
        default: false,
      },
      enableCORS: {
        doc: 'Enable CORS',
        format: Boolean,
        default: true,
      },
    },
    CORS: {
      allowedHosts: {
        doc: 'Allowed Host for CORS',
        format: Array,
        default: [],
      },
      allowedMethods: {
        doc: 'Allowed HTTP Methods for CORS',
        format: String,
        default: 'GET,POST,OPTIONS,DELETE',
      },
      allowedHeaders: {
        doc: 'Allowed HTTP Headers for CORS',
        format: String,
        default: 'accept, x-xsrf-token,content-type,x-access-token,Authorization',
      },
      exposedHeaders: {
        doc: 'Exposed HTTP Headers for CORS',
        format: String,
        default: 'XSRF-TOKEN',
      },
      credentials: {
        doc: 'Allow Access-Control-Allow-Credentials CORS header',
        format: Boolean,
        default: true,
      },
      preflightContinue: {
        doc: 'Pass the CORS preflight response to the next handler',
        format: Boolean,
        default: false,
      },
      optionsSuccessStatus: {
        doc: 'Status code to use for successful OPTIONS requests',
        format: Number,
        default: 200,
      },
    },
    bodyParser: {
      limit: {
        doc: 'maximum request body size',
        format: String,
        default: '2Mb',
      },
    },
  },
  socket: {
    port: {
      doc: 'Socket port to bind',
      format: 'port',
      default: 8080,
      env: 'SPORT',
    },
  },
  database: {
    host: {
      doc: 'connection string for mongoDB',
      format: String,
      default: 'mongodb://127.0.0.1:27017/dstdb',
      // default: 'mongodb://admin:admin123@ds263791.mlab.com:63791/dstdb',
      env: 'DB_HOST',
    },
  },
  jwtOptions: {
    secretOrKey: {
      doc: 'jwt secretOrKey',
      format: String,
      default: 'ashutec2017',
    },
  },
  logger: {
    enableConsoleTransport: {
      doc: 'enable console transport',
      format: Boolean,
      default: true,
    },
    enableFileTransport: {
      doc: 'enable file transport',
      format: Boolean,
      default: false,
    },
    httpLogFormat: {
      doc: 'HTTP log format',
      format: String,
      default: ':remote-addr - :remote-user [:date] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms ":referrer" ":user-agent"',
    },
    httpLogFileName: {
      doc: 'HTTP log File name',
      format: String,
      default: 'http.log',
    },
    logFileName: {
      doc: 'Log File name',
      format: String,
      default: 'logs.log',
    },
    exceptionLogFileName: {
      doc: 'Exception log File name',
      format: String,
      default: 'exceptions.log',
    },
    logFileSize: {
      doc: 'logs File Max File size',
      format: Number,
      default: 5242880,
    },
    path: {
      doc: 'logs file path',
      format: String,
      default: './logs/',
    },
  },
});

config.loadFile(`./config/config-${config.get('env')}.json`);
config.set('logger.httpLogFileName', config.get('logger.path') + config.get('logger.httpLogFileName'));
config.set('logger.logFileName', config.get('logger.path') + config.get('logger.logFileName'));
config.set('logger.exceptionLogFileName', config.get('logger.path') + config.get('logger.exceptionLogFileName'));

// validate
config.validate();

module.exports = config;
