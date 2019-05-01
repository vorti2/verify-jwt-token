const fs = require('fs');
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
                description: 'Certificate to test if the signature of the JWT is valid'
            },
            {
                name: 'audience',
                alias: 'a',
                type: String,
                typeLabel: '{underline string}',
                description: 'audience to test'
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
        name: 'audience',
        alias: 'a',
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
    const cert = fs.readFileSync(options.cert, 'utf8');
    const token = fs.readFileSync(options.token, 'utf8');
    const verifyOptions = {};
    if (options.audience) {
        verifyOptions.audience = options.audience;
    }
    const decoded = jwt.verify(token, cert, verifyOptions);
    console.log(`JWT decoded and verifyed: ${JSON.stringify(decoded)}`);
    if (verifyOptions.audience) {
        console.log(`  including audience "${verifyOptions.audience}"`);
    }
} catch (err) {
    console.error(err.message);
    const token = fs.readFileSync(options.token, 'utf8');
    var decoded = jwt.decode(token, {complete: true});
    console.log(decoded.header);
    console.log(decoded.payload);
}