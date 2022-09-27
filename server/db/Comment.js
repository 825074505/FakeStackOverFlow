// Get comment from qid


exports.get_question_comments = function(conn, qid, callback){
    const qcQuery = "select cmtId from qc where qstnId = ?";
    const cmtQuery = "select * from Comment where cid in (?)";

    conn.query(qcQuery, [qid], function(error, results, fields){
        if(error){
            console.log('failed finding cids')
            throw(error);
        }

        let cids = results.map(function(result){
            return result.cmtId;
        })

        if(cids.length == 0){
            callback([])
            return
        }

        conn.query(cmtQuery, [cids], function(error, results, fields){
            if(error){
                throw(error);
            }
            callback(results);
        })

        
    })
}



//Get comment from aid

exports.get_answer_comments = function(conn, aid, callback){
    const acQuery = "select cmtId from ac where ansId = ?";
    const cmtQuery = "select * from Comment where cid in (?)";

    conn.query(acQuery, [aid], function(error, results, fields){
        if(error){
            console.log('failed finding cids')
            throw(error);
        }

        let cids = results.map(function(result){
            return result.cmtId;
        })

        if(cids.length == 0){
            callback([])
            return
        }

        conn.query(cmtQuery, [cids], function(error, results, fields){
            if(error){
                throw(error);
            }
            callback(results);
        })

        
    })
}




//Add comment to question


exports.add_question_comment = function(conn, text, username, comment_date_time, qid, callback){
    const cmtQuery = "insert into comment set ?";
    const qcQuery = "insert into qc set ?"
    let cmt = {
        text : text,
        comment_by : username,
        comment_date_time : comment_date_time
    }

    conn.query(cmtQuery, cmt, function(err, results, fields){
        if(err){
            throw(err)
        }
        conn.query('select max(cid) as id_count from comment', function(error, results, fields){
            if(error){
                throw(error);
            }
            
            let qc = {
                qstnId : qid,
                cmtId : results[0].id_count
            }
            conn.query(qcQuery, qc, function(err, results, fields){
                if(err){
                    throw(err)
                }
                callback(results);
            })
        })

    })
}




//Add comment to answer


exports.add_answer_comment = function(conn, text, username, comment_date_time, aid, callback){
    const cmtQuery = "insert into comment set ?";
    const acQuery = "insert into ac set ?"
    let cmt = {
        text : text,
        comment_by : username,
        comment_date_time : comment_date_time
    }

    conn.query(cmtQuery, cmt, function(err, results, fields){
        if(err){
            throw(err)
        }
        conn.query('select max(cid) as id_count from comment', function(error, results, fields){
            if(error){
                throw(error);
            }
            
            let ac = {
                ansId : aid,
                cmtId : results[0].id_count
            }
            conn.query(acQuery, ac, function(err, results, fields){
                if(err){
                    throw(err)
                }
                callback(results);
            })
        })

    })
}