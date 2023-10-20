host     = 'bp7m5fwr2kdlser4h2ql-mongodb.services.clever-cloud.com',
db       = 'bp7m5fwr2kdlser4h2ql',
user     = 'ucm2gm1b08hm7v2fhp2f',
port     = '2616',
password = 'x1I9LhRbN8bMQWOhLl4'

module.exports = {
  database : [`mongodb://${user}:${password}@${host}:${port}/${db}`]
}
