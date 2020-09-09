const express = require("express");
const router = express.Router();
const Posts = require("./data/db.js");



router.get("/", (req, res) => {
    Posts.find(req.query)
    .then(posts => {
        res.status(200).json({query: req.query, data: posts});
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ error: "Post cannot be retrieved." });
    });
});

router.get("/:id", (req, res) => {
    const id = req.params.id
    Posts.findById(id)
    .then(post => {
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({ message: "There is no post with the given ID." });
        }
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ error: "Post could not be retrieved." });
    });
});

router.get("/:id/comments", (req, res) => {
    const id = req.params.id;
    Posts.findCommentById(id)
    .then(comment => {
        if(comment) {
            res.status(200).json(comment);
        } else {
            res.status(404).json({ message: "There is no post with the given ID." })
        }
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ error: "The comment could not be retrieved." })
    })
});

router.post("/", (req, res) => {
    Posts.insert(req.body)
    .then(post => {
        res.status(201).json(post);
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({message: "Error while saving post to the database"});
    });
});

router.post('/:id/comments', (req, res) => {
    Posts.insertComment(req.body)
    .then(post => {
        res.status(201).json(post);
    })
    .catch( error => {
        console.log("New post error", error);
        res.status(500).json({ errorMessage: "Please provide correct key-value pairs for the comment" });
    });
});


router.put("/:id", (req, res) => {
    const id = req.params.id;
    const changes = req.body;
    Posts.update(id, changes)
    .then(post => {
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({ message: "There is no post with the given ID" })
        }
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ errorMessage: "Please provide title and contents for the post." })
    })
})


router.delete("/:id", (req, res) => {
    const id = req.params.id;
    Posts.remove(id)
    .then(count => {
        if (count > 0) {
            res.status(200).json({ message: "Post has been successfully deleted"});
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist." });
        }
    })
    .catch(error => {
        res.status(500).json({ error: "The post could not be removed" });
    });
});




module.exports = router; 