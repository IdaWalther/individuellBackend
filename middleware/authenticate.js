
const authenticate = (req, res, next) => {

    const user = global.currentUser;

    if (user && user.role === 'admin') {
        next();
    } else {
        const error = new Error();
        error.status = 404;
        error.message = "Du har inte behörighet att se denna sida";
        next(error);
    }
};

export default authenticate; 