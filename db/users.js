const records = [
  {id: 1, username: 'jack', token: '123456789', displayName: 'Jack', emails: [{value: 'jack@example.com'}]} ,
  {id: 2, username: 'jill', token: 'abcdefghi', displayName: 'Jill', emails: [{value: 'jill@example.com'}]}
];

exports.findByToken = function (token, cb) {
  process.nextTick(function () {
    for (let i = 0, len = records.length; i < len; i++) {
      const record = records[i];
      if (record.token === token) {
        return cb(null, record);
      }
    }
    return cb(null, null);
  });
};