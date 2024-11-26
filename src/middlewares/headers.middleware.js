//Headers Middleware
export const HeaderMiddleware = (req, res, next) => {
    res.set('Access-Control-Allow-Origin', 'https://arsogam.netlify.app');
    res.set('Content-Type', 'multipart/form-data')    
    next()
}