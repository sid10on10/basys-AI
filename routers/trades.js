const { Router } = require("express");
const sqlite = require('sqlite3')
const router = Router()

router.get('/', (req, res)=>{
    let { type, user_id } = req.query
    const db = new sqlite.Database('stocks.db')
    let query = "SELECT * from trades WHERE 1"
    let params = []

    if(user_id){
        query += " AND user_id=?"
        params.push(user_id)
    }

    if(type){
        query += " AND type=?"
        params.push(type)
    }

    db.all(query, params, (err, rows)=>{
        if(err){
            console.log(err)
            res.status(500).json({
                message: 'Something went wrong! Please try again'
            })
        }
        res.status(200).json(rows)
    })
})

router.post('/', (req, res)=>{
    const db = new sqlite.Database('stocks.db')
    const query = "INSERT INTO trades (type, user_id, symbol, shares, price, timestamp) VALUES (?, ?, ?, ?, ?, ?)"

    const { type, user_id, symbol, shares, price, timestamp } = req.body

    db.run(query, [type, user_id, symbol, shares, price, timestamp], function(err){
        if(err){
            console.log(err)
            res.status(500).json({
                message: 'Internal server error'
            })
        }else{
            let lastID = this.lastID
            res.status(201).json({
                id: lastID,
                type,
                user_id,
                symbol,
                shares,
                price,
                timestamp
            })
        }
        
    })
})

router.delete('/:id', (req, res)=>{
    res.status(405).json({
        message: 'Forbidden'
    })
})

router.patch('/:id', (req, res)=>{
    res.status(405).json({
        message: 'Forbidden'
    })
})

router.put('/:id', (req, res)=>{
    res.status(405).json({
        message: 'Forbidden'
    })
})

module.exports = router