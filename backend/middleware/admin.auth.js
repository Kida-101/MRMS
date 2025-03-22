import jwt from 'jsonwebtoken';


const adminAuth = async (req, res, next) => {
  const { token } = req.cookies

  if (!token) {
    return res.json({ success: false, message: "Not Authorized. Login again" })
  }

  try {
    // decode the token
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET)
    if (tokenDecode.id) {
      const { id } = tokenDecode

      req.body.id = id
    } else {
      return res.json({ success: false, message: "Not Authorized. Login Again" })
    }
    next();
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

export default adminAuth;
