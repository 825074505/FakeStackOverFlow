// Question-related Queries

const Connection = require("mysql/lib/Connection");


// Get all questions 

exports.get_questions = function(conn, callback){
    

    const allQsQuery = 'select * from Question';
    
    conn.query(allQsQuery, function(error, results, fields){
        if(error){
            console.log('failed getting all tags');
            throw(error);
        }
        
        callback(results);
        
    });
    
}


// Get questions of a tag

exports.get_tag_questions = function(conn, tid, callback){
    

    const qtQuery = 'select qstnId from qt where tagId = ?';
    const QsQuery = 'select * from Question where qid in (?)';

    conn.query(qtQuery, [tid], function(error, results, fields){
        if(error){
            console.log('failed finding qids');
            throw(error);
        }
        
        let qids = results.map(function(result){
            return result.qstnId;
        })

        if(qids.length == 0){
            callback([])
            return
        }

        conn.query(QsQuery,[qids], function(error, results, fields){
            if(error){
                throw(error);
            }

            callback(results);
        })

    });
}


//Add Questions 

exports.add_Question = function(conn, title, text, asked_by, ask_date_time, views, upvotes, downvotes, summary, callback) {
    let q = {
      title: title,
      text: text,
      asked_by: asked_by,
      summary : summary,
      upvotes : upvotes,
      downvotes: downvotes
    };
    if(ask_date_time) q.ask_date_time = ask_date_time;
    if(views) q.views = views;
    conn.query('insert into question set ?', q, function(error, results, fields) {
      if(error){
          throw(error);
      }
      conn.query('select max(qid) as id_count from question', function(error, results, fields){
          if(error){
              throw(error);
          }
          callback(results[0].id_count);
      })
    })
  }


  //Update view

  exports.update_View = function(conn, qid, callback){
      let update_Query = 'UPDATE Question SET views = views + 1 WHERE qid = ?';

      conn.query(update_Query, [qid], function(error, results, fields){
          if(error){
              throw(error);
          }
          callback(results)


      })
  }



  //Upvote

  exports.upvote = function(conn, qid, callback){

    let upvoteQuery = "UPDATE Question SET upvotes = upvotes + 1 WHERE qid = ?";
    let uqQuery = "Select userId from uq where qstnId = ?"
    let userQuery = "UPDATE User SET reputation = reputation + 5 WHERE uid = ?";

    conn.query(upvoteQuery, [qid], function(error, results, fields){
        if(error){
            throw(error);
        }
        conn.query(uqQuery, [qid], function(error, results, fields){
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

  exports.downvote = function(conn, qid, callback){
      let downvoteQuery = "UPDATE Question SET downvotes = downvotes + 1 WHERE qid = ?";
      let uqQuery = "Select userId from uq where qstnId = ?"
      let userQuery = "UPDATE User SET reputation = reputation - 10 WHERE uid = ?";

      conn.query(downvoteQuery, [qid], function(error, results, fields){
          if(error){
              throw(error);
          }
          conn.query(uqQuery, [qid], function(error, results, fields){
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


  //Get user questions

  exports.get_user_questions = function(conn, uid, callback){

    const uqQuery = 'select qstnId from uq where userId = ?';
    const QsQuery = 'select * from Question where qid in (?)';

    conn.query(uqQuery, [uid], function(error, results, fields){
        if(error){
            console.log('failed finding qids');
            throw(error);
        }
        
        let qids = results.map(function(result){
            return result.qstnId;
        })

        if(qids.length == 0){
            callback([])
            return
        }

        conn.query(QsQuery,[qids], function(error, results, fields){
            if(error){
                throw(error);
            }

            callback(results);
        })

    });
  }



  //Delete Question


  exports.delete_question = function(conn, qid, callback){

    const Q = "Delete from question where qid = ?";
    const uq = "Delete from uq where qstnId = ?";
    const qt = "Delete from qt where qstnId = ?";
    const qa = "Delete from qa where qstnId = ?";
    const qc = "Delete from qc where qstnId = ?";

    conn.query(Q, [qid], function(err, res, fields){
        if(err){
            throw(err)
        }
        conn.query(uq, [qid], function(err, res, fields){
            if(err){
                throw(err)
            }
            conn.query(qt, [qid], function(err, res, fields){
                if(err){{
                    throw(err)
                }}

                conn.query("select ansId from qa where qstnId = ?", [qid], function(err, results, fields){
                    if(err){
                        throw(err)
                    }

                    let aids = results.map(function(result){
                        return result.ansId;
                    })
                    aids.forEach((aid) => {
                        conn.query("select cmtId from ac where ansId = ?", [aid], function(err, result, fields){
                            if(err){
                                throw(err)
                            }

                            let cids = result.map(function(resul){
                                return resul.cmtId
                            })
                            if(cids.length != 0){
                            conn.query("delete from comment where cid in (?)", [cids], function(err, res, fields){
                                if(err){
                                    throw(err)
                                }
                               conn.query("delete from ac where ansId = ?", [aid], function(err, res, fields){
                                   if(err){
                                       throw(err)
                                   }
                               })
                            
                            })
                            }
                        })
                    })
                    if(aids.length == 0){
                        console.log("returning successfully 1")
                        callback([])
                        return
                    }
                    conn.query("delete from answer where aid in (?)",[aids], function(err, re, fields){
                        if(err){
                            throw(err)
                        }
                        conn.query("delete from ua where ansId in (?)", [aids], function(err, rs, fields){
                            if(err){
                                throw(err)
                            }
                        })
                        conn.query(qa, [qid], function(err, r, fields){
                            if(err){
                                throw(err)
                            }
                            conn.query("select cmtId from qc where qstnId = ?", [qid], function(err,results,fields){
                                if(err){
                                    throw(err)
                                }
                                let cids = results.map(function(resul){
                                    return resul.cmtId
                                })
                                if(cids.length != 0){
                                conn.query("delete from comment where cid in (?)", [cids], function(err,rslt, fields){
                                    if(err){
                                        throw(err)
                                    }
                                    conn.query(qc, [qid], function(err, reslt, fields){
                                        if(err){
                                            throw(err)
                                        }

                                    })
                                })
                                }
                                
                                callback(results) 
                                return
                            })
                        })
                    })
                })
            })

        })
    })
  }


  //Save Question

  exports.save_question = function(conn, qid, title, text, summary, callback){

    const update_Query = "UPDATE Question SET title = ?, text = ?, summary = ? WHERE qid = ?"

    conn.query(update_Query, [title, text, summary, qid], function(err, results, fields){
        if(err){
            throw(err)
        }
        callback(results)
    })
  }