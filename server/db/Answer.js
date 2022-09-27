// Answer-related queries


// Get answers of a question
exports.get_answers = function(conn, qid, callback){


    const qaQuery = "select ansId from qa where qstnId = ?";
    const ansQuery = "select * from answer where aid in (?)";

    conn.query(qaQuery, [qid], function(error, results, fields){
        if(error){
            console.log('failed finding aids')
            throw(error);
        }

        let aids = results.map(function(result){
            return result.ansId;
        })

        if(aids.length == 0){
            callback([])
            return
        }

        conn.query(ansQuery, [aids], function(error, results, fields){
            if(error){
                throw(error);
            }
            callback(results);
        })

        
    })

}





// Insert a answer

exports.add_new_ans_to_qstn =  function(conn, qid, text, ans_by, ans_date_time, callback, callback2) {

    let a = {
        text: text,
        ans_by: ans_by
    };
    if(ans_date_time) a.ans_date_time = ans_date_time;
    conn.query('insert into answer set ?', a, function(error, results, fields) {
        if(error) {
            return conn.rollback(function(error) {
              console.log('failed to create new answer');
              throw error;
            });
        }
        else{

            conn.query('select max(aid) as id_count from Answer', function(error, results, fields){
                if(error){
                    throw(error);
                }
                else{
                    
                    let qa = {
                        qstnId : qid,
                        ansId : results[0].id_count

                    }
                    callback2(results[0].id_count)
                    conn.query('insert into qa set ?', qa, function(error, results, fields) {
                        if(error){
                            throw(error);
                        }

                        conn.query('select * from Question', function(error, results, fields){
                            if(error){
                                throw(error);
                            }
                            callback(results)
                        })
                      })
                }
            })

        }
        
      })
      // add relationship


}


//Upvote

exports.upvote = function(conn, aid, callback){

    let upvoteQuery = "UPDATE Answer SET upvotes = upvotes + 1 WHERE aid = ?";
    let uaQuery = "Select userId from ua where ansId = ?"
    let userQuery = "UPDATE User SET reputation = reputation + 5 WHERE uid = ?";

    conn.query(upvoteQuery, [aid], function(error, results, fields){
        if(error){
            throw(error);
        }
        conn.query(uaQuery, [aid], function(error, results, fields){
            if(error){
                throw(error);
            }
            if(results.length == 0){
                return
            }
            let uid = results[0].userId
            conn.query(userQuery, [uid], function(error, results, fields){
                if(error){
                    throw(error)
                }

                callback(results);

            })
        })
    })
  }


  //Downvote

  exports.downvote = function(conn, aid, callback){
      let downvoteQuery = "UPDATE Answer SET downvotes = downvotes + 1 WHERE aid = ?";
      let uaQuery = "Select userId from ua where ansId = ?"
      let userQuery = "UPDATE User SET reputation = reputation - 10 WHERE uid = ?";

      conn.query(downvoteQuery, [aid], function(error, results, fields){
          if(error){
              throw(error);
          }
          conn.query(uaQuery, [aid], function(error, results, fields){
            if(error){
                throw(error);
            }
            if(results.length == 0){
                return
            }
            let uid = results[0].userId
            conn.query(userQuery, [uid], function(error, results, fields){
                if(error){
                    throw(error)
                }
                callback(results);

            })
        })
      })
  }


  //Get user answers

  exports.get_user_answers = function(conn, uid, callback){
    const uaQuery = 'select ansId from ua where userId = ?';
    const AsQuery = 'select * from Answer where aid in (?)';

    conn.query(uaQuery, [uid], function(error, results, fields){
        if(error){
            console.log('failed finding qids');
            throw(error);
        }
        
        let aids = results.map(function(result){
            return result.ansId;
        })

        if(aids.length == 0){
            callback([])
            return
        }

        conn.query(AsQuery,[aids], function(error, results, fields){
            if(error){
                throw(error);
            }

            callback(results);
        })

    });
  }

  //Delete answer

  exports.delete_answer = function(conn, aid, callback){

    const A = "Delete from answer where aid = ?";
    const ua = "Delete from ua where ansId = ?";
    const qa = "Delete from qa where ansId = ?";
    const ac = "Delete from ac where ansId = ?";


    conn.query(A, [aid], function(err, res, fields){
        if(err){
            throw(err)
        }
        conn.query(ua, [aid], function(err, res, fields){
            if(err){
                throw(err)
            }
            conn.query(qa, [aid], function(err, res, fields){
                if(err){
                    throw(err)
                }
                conn.query("select cmtId from ac where ansId = ?", [aid], function(err, results, fields){
                    if(err){
                        throw(err)
                    }
                    let cids = results.map(function(result){
                        return result.cmtId
                    })
                    if(cids.length != 0){
                    conn.query("Delete from comment where cid in (?)", cids, function(err, res, fields){
                        if(err){
                            throw(err)
                        }
                    })
                    }
                    conn.query(ac, [aid], function(err, res, fields){
                        if(err){
                            throw(err)
                        }
                        callback(res);
                    })
                })
            })
        })
    })

     
  }


  //Save answer

  exports.save_answer = function(conn, aid, text,callback){

    const update_Query = "UPDATE Answer SET text = ? WHERE aid = ?"

    conn.query(update_Query, [text,aid], function(err, results, fields){
        if(err){
            throw(err)
        }
        callback(results)
    })
  }
  