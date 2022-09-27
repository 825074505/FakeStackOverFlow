// add user


exports.add_user = function(conn, email, username, password, callback){
    let u = {
        email : email,
        username : username,
        password : password
    }

    conn.query('insert into user set ?', u, function(err, results, fields){
        if(err){
            console.log('cannot create user');
            throw(err);
        }
        callback(results);

    })
}

//Get user via email

exports.get_user_email = function(conn, email, callback){
    const uQuery = "select * from user where email = ?";
    conn.query(uQuery, email, function(err, results, fields){
        if(err){
            throw(err);
        }
        callback(results);
    })
}

//Add a ut relation via uid and tagname
exports.add_user_tag = function(conn, uid, tid){

            
            let ut = {
                userId : uid,
                tagId : tid
            }
            
            conn.query('insert into ut set ?', ut, function(err, results, fields){
                if(err){
                    throw(err);
                }
        
            })
 }




//Add a uq relation

exports.add_user_question = function(conn, uid, qid){
    let uq = {
        userId : uid,
        qstnId : qid
    }
    conn.query("insert into uq set ?", uq, function(err, results, fields){
        if(err){
            throw(err)
        }

    })
}

//Add a ua relation

exports.add_user_answer = function(conn, uid, aid){
    let ua = {
        userId : uid,
        ansId : aid
    }
    conn.query("insert into ua set ?", ua, function(err, results, fields){
        if(err){
            throw(err)
        }
    })
}

//Get questions via user id


//Get answers via user id


//Get tags via user id