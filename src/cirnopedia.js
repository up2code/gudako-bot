const fetchUrl = require('fetch').fetchUrl
const fs = require('fs-extra')

var url = 'http://fate-go.cirnopedia.info/servant_all.php'

fetchUrl(url,function(e,h,b){
    var content = b.toString()
    var startPos = content.indexOf('<tbody>')
    var endPos = content.indexOf('</tbody>') + '</tbody>'.length
    var tbodyhtml = content.slice(startPos,endPos)

    var idMatched = tbodyhtml.match(/id=".+"/g)
                    .map(function(m){
                        return m.slice(m.indexOf("\"")+1,m.length-1)
                    })
    var nameMatched = tbodyhtml.match(/servant=.+".+</g)
                        .map(function(m){
                            var s = m.replace(/<br>/,' ')
                            return s.slice(s.indexOf('>')+1,s.indexOf('<'))
                        }) 
    var results = idMatched.map(function(m,i){
        return { 
            id: m, 
            name: nameMatched[i],
            alias: [nameMatched[i]],
            url: 'http://fate-go.cirnopedia.info/servant_profile.php?servant=001.5'
        }
    })    

    fs.writeJson('./../res/servants.json', results, function (err) {
        console.log(err)
        console.log('done')
    })          
})