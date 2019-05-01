const jwt = require('jsonwebtoken');
const commandLineArgs = require('command-line-args');
const commandLineUsage = require('command-line-usage');

const sections = [{
        header: 'Verify JWT Token',
        content: 'Generates something {italic very} important.'
    },
    {
        header: 'Options',
        optionList: [{
                name: 'token',
                typeLabel: '{underline file}',
                alias: 't',
                type: String,
               description: 'JWT Token to verify'
            },
            {
                name: 'cert',
                alias: 'c',
                type: String,
                typeLabel: '{underline file}',
                description: 'Certificate (in .pem format) to test if the signature of the JWT is valid'
            },
            {
                name: 'help',
                alias: 'h',
                type: Boolean,
                description: 'Print this usage guide.'
            }
        ]
    }
];




const optionDefinitions = [{
        name: 'token',
        alias: 't',
        type: String
    },
    {
        name: 'cert',
        alias: 'c',
        type: String
    },
    {
        name: 'help',
        alias: 'h',
        type: Boolean
    },

];

const options = commandLineArgs(optionDefinitions);


if (options.help || !options.token || !options.cert) {
    const usage = commandLineUsage(sections);
    console.log(usage);
    process.exit(0);
}

try {
    const cert = fs.readFileSync(options.cert);
    const token = fs.readFileSync(options.token); 
    const decoded = jwt.verify(token, cert);
    console.log(`JWT decoded and verifyed: ${JSON.stringify(decoded)}`);
} catch (err) {
    console.error(err);
}