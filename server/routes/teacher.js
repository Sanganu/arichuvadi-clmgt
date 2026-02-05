router.get('/api/instructor/all', (req, res) => {
  let list =[]
  Management.aggregate([{$project: {Fullname:{$concat:["$fname"," ","$lname"]}}}])
  .then((allinst) => {
      // list = results
      // console.log("Records fetched for teachers", results);
    //   return Teacher.find({},'fname lname')
    // })
    // .then(function (allinstructors) {
    //   // console.log(allinstructors)
    //   let allinst = list.concat(allinstructors)
      console.log("All Instructors",allinst)
      res.json(allinst);
    })
    .catch((error) => {
          console.log("Error in fetching", error);
          res.json(error);
    });
});
