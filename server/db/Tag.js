// Tag related queries





// Get tags of a question

exports.get_question_tags = function(conn, qid, callback){
    

    const qtQuery = 'select tagId from qt where qstnId = ?';
    const tagQuery = 'select * from Tag where tid in (?)';

    conn.query(qtQuery, [qid], function(error, results, fields){
        if(error){
            console.log('failed finding tids');
            throw(error);
        }
        
        let tids = results.map(function(result){
            return result.tagId;
        })

        if(tids.length == 0){
            callback([])
            return
        }

        conn.query(tagQuery, [tids], function(error, results, fields){
            if(error){
                throw(error);
            }
            callback(results);
        })
    });
}


//Get all tags

exports.get_tags = function(conn, callback){
    

    const allTagQuery = 'select * from tag';
    
    let ret = conn.query(allTagQuery, function(error, results, fields){
        if(error){
            console.log('failed getting all tags');
            throw(error);
        }
        
        callback(results);
        
    });


    return ret;
    
}



//Add a tag

exports.add_new_tag_qstn = function(conn, qid, Name, callback){
    let t = {
        name : Name
    }

    conn.query('select * from Tag where name = ?', [Name], function(error, results, fields){
        if(error){
            throw(error);
        }

        if(results.length == 0){
            conn.query('insert into Tag set ?', t, function(error, results, fields){
                if(error){
                    throw(error);
                }
                else{
        
                    conn.query('select tid from Tag where name = ?',[Name], function(error,results,fields){
                        if(error){
                            throw(error);
                        }
                        else{
                            let qt = {
                                qstnId : qid,
                                tagId : results[0].tid
                            }
                            conn.query('insert into qt set ?', qt, function(error, result, fields){
                                if(error){
                                    throw(error);
                                }
                                callback(qt.tagId)
                            })
                        }
                    })
                }
            })
        }
        else{

            conn.query('select tid from Tag where name = ?',[Name], function(error,results,fields){
                if(error){
                    throw(error);
                }
                else{
                    let qt = {
                        qstnId : qid,
                        tagId : results[0].tid
                    }
                    conn.query('insert into qt set ?', qt, function(error, result, fields){
                        if(error){
                            throw(error);
                        }
                    })
                }
            })
        }
    })

    
}


// Get user tags

exports.get_user_tags = function(conn, uid, callback){
    const utQuery = 'select tagId from ut where userId = ?';
    const TsQuery = 'select * from Tag where tid in (?)';

    conn.query(utQuery, [uid], function(error, results, fields){
        if(error){
            console.log('failed finding qids');
            throw(error);
        }
        
        let tids = results.map(function(result){
            return result.tagId;
        })

        if(tids.length == 0){
            callback([])
            return
        }

        conn.query(TsQuery,[tids], function(error, results, fields){
            if(error){
                throw(error);
            }

            callback(results);
        })

    });
  }


  //Delete Tag

  exports.delete_tag = function(conn, tid, callback){

     let T = "Delete from tag where tid =?";
     let qt = "Delete from qt where tagId = ?";
     let ut = "Delete from ut where tagId = ?";

     conn.query(T, [tid], function(err, res, fields){
         if(err){
             throw(err)
         }
         conn.query(qt, [tid], function(err, res, fields){
             if(err){
                 throw(err)
             }
             conn.query(ut, [tid], function(err, res, fiedls){
                 if(err){
                     throw(err)
                     
                 }
                 callback(res);
             })
         })
     })
  }

  //save tag


  exports.save_tag = function(conn, tid, name,callback){

    const update_Query = "UPDATE Tag SET name = ? WHERE tid = ?"

    conn.query(update_Query, [name,tid], function(err, results, fields){
        if(err){
            throw(err)
        }
        callback(results)
    })
  }
