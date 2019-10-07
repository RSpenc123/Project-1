const files = [{
    name : 'potato',
    text: 'The potato is a magical food that everyone in the world should induldge in whenever they can!'
    
}];

module.exports = {
    filesPlus(req, res) {
        res.status(200).send(files)
    },

addFiles(req, res){
    const {addOn} = req.body;
    files.push(addOn);
    console.log(files)
    res.status(200).send(files)

},
deleteFile(req,res){
    const {index} = req.params;
    files.splice(index,1);
    res.status(200).send(files)
},

editFile(req,res){
    const {index, newName} = req.body;
    console.log(index)
    files[index].name = newName;
    console.log(files[index].name)
    res.status(200).send(files);
},
editText(req,res){
    const {index, newText} = req.body;
    console.log(index)
    files[index].text = newText;
    console.log(files[index].text)
    res.status(200).send(files);
}

}