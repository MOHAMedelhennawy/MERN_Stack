
// Logger middleware
export const logger = (req, res, next) => {
    console.log(req.method, req.url);
    next();
};
  
  // Json middleware
export const jsonMiddleware = (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    next();
};
  