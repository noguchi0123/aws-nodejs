'use strict';

var AWS = require('aws-sdk');
var dynamodb = new AWS.DynamoDB({region: 'us-east-1'});

module.exports.hello = (event, context, callback) => {
  var rand_id = Math.floor(Math.random()*10000);
    var now = new Date().getTime();
    var fruits = ['apple', 'orange', 'grape', 'peach', 'rice'];
    var fruit = fruits[Math.floor(Math.random()*fruits.length)];
    if(fruit=='apple'){
        price = 100;
    }else{
        price = 300;
    }
    var params = {
    TableName: 'put_json',
    Item: {
        'id':   {"N":   String(rand_id)}, //primary keyが同じだとうわがきされる問題
        'name': {"S":   String(fruit)},
        'price':{"N":   String(price)},
        'time': {"S":   String(now)}
    }
};
    dynamodb.putItem(params, function(err, data){
        if(err){
            console.log(err, err.stack);
        }else{
            console.log(data);
        }
    });
    callback(null, String(price) + fruit );
};
