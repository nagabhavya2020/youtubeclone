import express from 'express'

import auth from '../middleware/auth.js'
import { postComment,getComment,deleteComment,editComment} from '../controllers/comments.js'
const router= express.Router()


router.post('/post',postComment)
router.get('/get',getComment)
router.delete('/delete/:id',deleteComment)
router.patch('/edit/:id',editComment)

export default router