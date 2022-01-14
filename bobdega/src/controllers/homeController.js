const controller = {
    home : (req,res)=>{
        return res.render(
            'home'
        )
        
    },
    login : (req,res)=>{
        return res.render(
            'login'
        )
        
    },
    signin : (req,res)=>{
        return res.render(
            'signin'
        )
        
    }
}

module.exports = controller