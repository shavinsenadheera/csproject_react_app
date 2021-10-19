class Auth
{
    constructor()
    {
        this.authenticated = false;
    }

    login(cb)
    {
        this.authenticated = true;
        localStorage.setItem('isLogged', true)
        cb();
        window.location.reload();
    }

    logout()
    {
        this.authenticated = false;
        localStorage.clear();
        window.location.reload();
    }

    isAuthenticated()
    {
        return this.authenticated
    }
}

export default new Auth()