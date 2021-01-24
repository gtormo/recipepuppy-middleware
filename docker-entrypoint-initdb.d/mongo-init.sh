set -e

mongo <<EOF
db = db.getSiblingDB('$MONGO_CONNECTION_DATABASE');

db.createUser({
  user: '$MONGO_CONNECTION_USERNAME',
  pwd:  '$MONGO_CONNECTION_PASSWORD',
  roles: [{
    role: 'readWrite',
    db: '$MONGO_CONNECTION_DATABASE'
  }]
})

db = db.getSiblingDB('recipeppupy_test');

db.createUser({
  user: '$MONGO_CONNECTION_USERNAME',
  pwd:  '$MONGO_CONNECTION_PASSWORD',
  roles: [{
    role: 'readWrite',
    db: 'recipeppupy_test'
  }]
})
EOF