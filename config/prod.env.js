'use strict'
let gitSha = require('child_process').execSync('git rev-parse HEAD').toString().trim()
module.exports = {
	RELEASE_VERSION: `"${gitSha}"`,
	NODE_ENV: '"production"'
}