db = db.getSiblingDB('dotzip_nestjs');
db.createUser({
    user: 'root',
    pwd: 'root',
    roles: [{ role: 'readWrite', db: 'dotzip_nestjs' }]
});

// 데이터 삽입으로 데이터베이스 생성
db.initCollection.insertOne({ initKey: 'initValue' });
